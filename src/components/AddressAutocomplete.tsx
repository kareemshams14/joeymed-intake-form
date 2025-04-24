'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
  initialAddress?: string;
}

interface AddressSuggestion {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onAddressSelect,
  initialAddress = '',
}) => {
  const [inputValue, setInputValue] = useState(initialAddress);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  /* ----------------------------- data -------------------------------- */
  const floridaCities = [
    { city: 'Miami', state: 'FL', zipCodes: ['33101', '33125', '33126', '33127', '33128', '33129', '33130', '33131', '33132', '33133', '33134', '33135'] },
    { city: 'Orlando', state: 'FL', zipCodes: ['32801', '32802', '32803', '32804', '32805', '32806', '32807', '32808', '32809', '32810'] },
    { city: 'Tampa', state: 'FL', zipCodes: ['33601', '33602', '33603', '33604', '33605', '33606', '33607', '33608', '33609', '33610'] },
    { city: 'Jacksonville', state: 'FL', zipCodes: ['32099', '32201', '32202', '32203', '32204', '32205', '32206', '32207', '32208', '32209'] },
    { city: 'Fort Lauderdale', state: 'FL', zipCodes: ['33301', '33302', '33303', '33304', '33305', '33306', '33307', '33308', '33309', '33310'] },
    { city: 'St. Petersburg', state: 'FL', zipCodes: ['33701', '33702', '33703', '33704', '33705', '33706', '33707', '33708', '33709', '33710'] },
    { city: 'Tallahassee', state: 'FL', zipCodes: ['32301', '32302', '32303', '32304', '32305', '32306', '32307', '32308', '32309', '32310'] },
    { city: 'Gainesville', state: 'FL', zipCodes: ['32601', '32602', '32603', '32604', '32605', '32606', '32607', '32608', '32609', '32610'] },
    { city: 'Clearwater', state: 'FL', zipCodes: ['33755', '33756', '33757', '33758', '33759', '33760', '33761', '33762', '33763', '33764'] },
    { city: 'Palm Beach', state: 'FL', zipCodes: ['33401', '33402', '33403', '33404', '33405', '33406', '33407', '33408', '33409', '33410'] },
  ];

  const streetTypes = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd', 'Way', 'Pl', 'Ct', 'Ter'];

  /* -------------------------- utilities ------------------------------ */
  const getRandomStreetName = () => {
    const names = [
      'Oak','Maple','Pine','Cedar','Elm','Main','Park','Lake','Hill','River',
      'Washington','Jefferson','Lincoln','Adams','Madison','Monroe','Jackson',
      'Sunset','Sunrise','Ocean','Beach','Bay','Harbor','Island','Palm',
      'Magnolia','Cypress','Willow','Birch','Aspen',
    ];
    return names[Math.floor(Math.random()*names.length)];
  };

  const generateSuggestions = (value: string): AddressSuggestion[] => {
    if (value.length < 3) return [];
    const lower = value.toLowerCase();
    const out: AddressSuggestion[] = [];
    const hasNum = /\d/.test(value);

    const pushIfMatch = (sug: AddressSuggestion) => {
      if (
        sug.address.toLowerCase().includes(lower) ||
        sug.city.toLowerCase().includes(lower) ||
        sug.zipCode.includes(value)
      ) out.push(sug);
    };

    floridaCities.forEach((c) => {
      for (let i=0;i<3;i++) {
        const num = Math.floor(Math.random()*9000)+1000;
        const street = `${getRandomStreetName()} ${streetTypes[Math.floor(Math.random()*streetTypes.length)]}`;
        const zip = c.zipCodes[Math.floor(Math.random()*c.zipCodes.length)];
        const sug = { address:`${num} ${street}`, city:c.city, state:c.state, zipCode:zip };
        if (hasNum) pushIfMatch(sug);
        else if (c.city.toLowerCase().includes(lower)) pushIfMatch(sug);
      }
    });

    // ensure at least 3 suggestions
    while (out.length<3) {
      const c = floridaCities[Math.floor(Math.random()*floridaCities.length)];
      const num = Math.floor(Math.random()*9000)+1000;
      const street = `${getRandomStreetName()} ${streetTypes[Math.floor(Math.random()*streetTypes.length)]}`;
      const zip = c.zipCodes[Math.floor(Math.random()*c.zipCodes.length)];
      out.push({ address:`${num} ${street}`, city:c.city, state:c.state, zipCode:zip });
    }
    return out.slice(0,5);
  };

  /* --------------------------- events -------------------------------- */
  const onInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const val=e.target.value;
    setInputValue(val);
    if(val.length>=3){
      setLoading(true);
      setTimeout(()=>{
        try{
          setSuggestions(generateSuggestions(val));
          setShowSuggestions(true);
        }catch(err){
          console.error(err);
          setError('Suggestion error');
        }finally{setLoading(false);}
      },300);
    }else{setShowSuggestions(false);setSuggestions([]);}  
  };

  const choose = (s:AddressSuggestion)=>{
    setInputValue(s.address);
    setShowSuggestions(false);
    setSuggestions([]);
    onAddressSelect(s);
  };

  /* outside click */
  useEffect(()=>{
    const handler=(e:MouseEvent)=>{
      if(
        inputRef.current && !inputRef.current.contains(e.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)
      ) setShowSuggestions(false);
    };
    document.addEventListener('mousedown',handler);
    return ()=>document.removeEventListener('mousedown',handler);
  },[]);

  /* --------------------------- render -------------------------------- */
  return (
    <div className="address-autocomplete relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={onInput}
        placeholder="Start typing your address…"
        className="w-full px-3 py-2 border rounded-md"
        onFocus={()=> inputValue.length>=3 && setShowSuggestions(true)}
      />

      {loading && <p className="text-sm text-gray-500 mt-1">Loading…</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      {showSuggestions && suggestions.length>0 && (
        <motion.div
          ref={suggestionsRef}
          className="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1 overflow-hidden"
          initial={{opacity:0, y:-8}}
          animate={{opacity:1, y:0}}
          exit={{opacity:0, y:-8}}
          transition={{duration:0.2}}
        >
          {suggestions.map((s,i)=>(
            <button
              key={i}
              type="button"
              onClick={()=>choose(s)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50"
            >
              <div className="font-medium text-sm">{s.address}</div>
              <div className="text-xs text-gray-500">{s.city}, {s.state} {s.zipCode}</div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
