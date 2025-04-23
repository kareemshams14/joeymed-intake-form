'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TreatmentInfographicProps {
  treatmentId: string;
  className?: string;
}

const TreatmentInfographic: React.FC<TreatmentInfographicProps> = ({
  treatmentId,
  className = ""
}) => {
  // Define infographic content for each treatment vertical
  const infographics: Record<string, {
    title: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
    benefits: string[];
    imageUrl?: string;
  }> = {
    'weight-loss': {
      title: 'Weight Loss Treatment',
      description: 'Our medically supervised weight loss program helps you achieve sustainable results through personalized treatment plans.',
      stats: [
        { value: '95%', label: 'of patients see results within 4 weeks' },
        { value: '30+', label: 'pounds average weight loss in 6 months' },
        { value: '85%', label: 'report improved energy levels' }
      ],
      benefits: [
        'Personalized medication and dosing',
        'Medical supervision throughout your journey',
        'Nutritional guidance and support',
        'Regular check-ins with healthcare providers'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    'erectile-dysfunction': {
      title: 'Erectile Dysfunction Treatment',
      description: 'Effective, discreet treatment options for erectile dysfunction delivered to your door.',
      stats: [
        { value: '90%', label: 'of patients report improved function' },
        { value: '30', label: 'minutes average onset of action' },
        { value: '4-6', label: 'hours of effectiveness' }
      ],
      benefits: [
        'FDA-approved medications',
        'Discreet packaging and delivery',
        'Ongoing medical support',
        'Personalized treatment plans'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    'sexual-health': {
      title: 'Sexual Health Treatment',
      description: 'Comprehensive sexual health solutions for improved wellness and confidence.',
      stats: [
        { value: '93%', label: 'patient satisfaction rate' },
        { value: '24/7', label: 'access to medical professionals' },
        { value: '100%', label: 'confidential consultations' }
      ],
      benefits: [
        'Holistic approach to sexual health',
        'Treatment for multiple conditions',
        'Regular follow-ups and adjustments',
        'Educational resources and support'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    'anti-aging': {
      title: 'Anti-Aging & Wellness',
      description: 'Rejuvenate your body and mind with our comprehensive anti-aging treatments and wellness programs.',
      stats: [
        { value: '87%', label: 'report improved skin appearance' },
        { value: '75%', label: 'experience increased energy levels' },
        { value: '92%', label: 'would recommend to friends' }
      ],
      benefits: [
        'Hormone optimization therapy',
        'Personalized supplement regimens',
        'Skin rejuvenation treatments',
        'Comprehensive wellness approach'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    'travel-kits': {
      title: 'Travel Health Kits',
      description: 'Be prepared for your adventures with our comprehensive travel health kits tailored to your destination.',
      stats: [
        { value: '100%', label: 'customized to your destination' },
        { value: '24/7', label: 'travel health support' },
        { value: '50+', label: 'countries covered' }
      ],
      benefits: [
        'Destination-specific medications',
        'Emergency antibiotics',
        'Motion sickness prevention',
        'Traveler\'s diarrhea treatment'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  };

  const infographic = infographics[treatmentId] || {
    title: 'Treatment Information',
    description: 'Please select a treatment to see detailed information.',
    stats: [],
    benefits: []
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
    >
      <div className="p-5">
        <h3 className="text-xl font-bold text-blue-600 mb-2">{infographic.title}</h3>
        <p className="text-gray-600 mb-4">{infographic.description}</p>
        
        {infographic.stats.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            {infographic.stats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {infographic.benefits.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Key Benefits</h4>
            <ul className="space-y-1">
              {infographic.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {infographic.imageUrl && (
        <div className="h-40 bg-gray-100 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${infographic.imageUrl})` }}
          ></div>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 border-t border-blue-100">
        <p className="text-sm text-blue-800">
          Consult with our healthcare providers to determine if this treatment is right for you.
        </p>
      </div>
    </motion.div>
  );
};

export default TreatmentInfographic;
