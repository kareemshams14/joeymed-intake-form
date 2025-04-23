// src/components/IntakeForm.tsx
import React, { useState } from 'react';

const IntakeForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    isFloridaResident: false,
    isOver18: false,
    name: '',
    email: '',
    phone: '',
    selectedTreatment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const isDisqualified = () => {
    return !formData.isFloridaResident || !formData.isOver18;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">JoeyMed Healthcare Intake</h1>
      
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Qualification</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="isFloridaResident" 
                checked={formData.isFloridaResident}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span>I am a Florida resident</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="isOver18" 
                checked={formData.isOver18}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span>I am 18 years or older</span>
            </label>
          </div>
          
          <button 
            onClick={nextStep}
            disabled={isDisqualified()}
            className={`w-full py-2 rounded-md ${isDisqualified() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Continue
          </button>
          
          {isDisqualified() && (
            <p className="text-red-500 text-sm mt-2">
              You must be a Florida resident and 18 years or older to use this service.
            </p>
          )}
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={prevStep}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            
            <button 
              onClick={nextStep}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Treatment Selection</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Treatment</label>
            <select 
              name="selectedTreatment" 
              value={formData.selectedTreatment}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            >
              <option value="">Select a treatment</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="erectile-dysfunction">Erectile Dysfunction</option>
              <option value="sexual-health">Sexual Health</option>
              <option value="anti-aging">Anti-Aging & Wellness</option>
              <option value="travel-kits">Travel Kits</option>
            </select>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={prevStep}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            
            <button 
              onClick={nextStep}
              disabled={!formData.selectedTreatment}
              className={`py-2 px-4 rounded-md ${!formData.selectedTreatment ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Treatment:</strong> {formData.selectedTreatment}</p>
          </div>
          
          <p className="text-sm text-gray-600">
            Ready to proceed to checkout? Click below to continue to Square for secure payment.
          </p>
          
          <div className="flex justify-between">
            <button 
              onClick={prevStep}
              className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            
            <button 
              onClick={() => alert('Square checkout would be integrated here')}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Step {step} of 4</p>
      </div>
    </div>
  );
};

export default IntakeForm;
