'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

interface TrustpilotReviewsProps {
  businessId?: string;
  className?: string;
}

const TrustpilotReviews: React.FC<TrustpilotReviewsProps> = ({
  businessId,
  className = ""
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(true);

  // Fetch reviews from Trustpilot API
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would be an actual API call to Trustpilot
        // For now, we'll simulate the API response
        
        // Simulated delay for API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If we have an actual business ID, we would use it in the API call
        const hasTrustpilotId = !!businessId;
        
        // Placeholder reviews (in a real implementation, these would come from the Trustpilot API)
        const mockReviews: Review[] = [
          {
            id: '1',
            author: 'Michael S.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            text: 'JoeyMed's weight loss program changed my life! I've lost 30 pounds in 3 months with their medical supervision and personalized plan.',
            date: '2025-03-15',
            verified: true
          },
          {
            id: '3',
            author: 'Robert K.',
            avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
            rating: 4,
            text: 'Very professional telehealth service. The doctor was knowledgeable and the medication arrived quickly and discreetly.',
            date: '2025-02-18',
            verified: true
          },
          {
            id: '5',
            author: 'David W.',
            avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
            rating: 5,
            text: 'The travel health kit was perfect for my trip to South America. Had everything I needed and the online consultation was thorough.',
            date: '2025-01-20',
            verified: true
          },
          {
            id: '6',
            author: 'Lisa M.',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
            rating: 5,
            text: 'I was skeptical at first, but JoeyMed's ED treatment has been life-changing. The doctors are professional and the medication works exactly as described.',
            date: '2025-01-05',
            verified: true
          },
          {
            id: '7',
            author: 'James T.',
            avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
            rating: 5,
            text: 'The anti-aging program has made me feel 10 years younger. My energy levels are up and I'm sleeping better than I have in years.',
            date: '2024-12-12',
            verified: true
          }
        ];
        
        setReviews(mockReviews);
      } catch (err) {
        console.error('Error fetching Trustpilot reviews:', err);
        setError('Failed to load Trustpilot reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [businessId]);

  // Auto-rotate reviews
  useEffect(() => {
    if (!autoplay || reviews.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, reviews.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Navigate to specific review
  const goToReview = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-[#00b67a]' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Trustpilot logo
  const renderTrustpilotLogo = () => {
    return (
      <div className="flex items-center">
        <svg className="h-6" viewBox="0 0 126 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.27 12.9H41.31V24.1H38.27V12.9Z" fill="#191919"/>
          <path d="M42.11 20.8C42.11 18.3 43.81 16.5 46.11 16.5C48.41 16.5 50.11 18.3 50.11 20.8C50.11 23.3 48.41 25.1 46.11 25.1C43.81 25.1 42.11 23.2 42.11 20.8ZM47.21 20.8C47.21 19.7 46.71 18.8 45.91 18.8C45.11 18.8 44.61 19.7 44.61 20.8C44.61 21.9 45.11 22.8 45.91 22.8C46.71 22.8 47.21 21.9 47.21 20.8Z" fill="#191919"/>
          <path d="M60.61 24.1L60.51 23.1C60.01 23.8 59.11 24.3 57.91 24.3C55.61 24.3 53.91 22.5 53.91 20C53.91 17.5 55.61 15.7 57.91 15.7C59.01 15.7 59.91 16.1 60.41 16.8V12.5H63.01V24.1H60.61ZM58.61 22.1C59.41 22.1 59.91 21.6 60.31 21V19C59.91 18.4 59.41 17.9 58.61 17.9C57.71 17.9 56.91 18.7 56.91 20C56.91 21.3 57.71 22.1 58.61 22.1Z" fill="#191919"/>
          <path d="M64.11 20.8C64.11 18.3 65.81 16.5 68.11 16.5C70.41 16.5 72.11 18.3 72.11 20.8C72.11 23.3 70.41 25.1 68.11 25.1C65.81 25.1 64.11 23.2 64.11 20.8ZM69.21 20.8C69.21 19.7 68.71 18.8 67.91 18.8C67.11 18.8 66.61 19.7 66.61 20.8C66.61 21.9 67.11 22.8 67.91 22.8C68.71 22.8 69.21 21.9 69.21 20.8Z" fill="#191919"/>
          <path d="M73.01 16.7H75.41L75.51 17.7C76.01 17 76.91 16.5 78.11 16.5C80.41 16.5 82.11 18.3 82.11 20.8C82.11 23.3 80.41 25.1 78.11 25.1C77.01 25.1 76.11 24.7 75.61 24V28.3H73.01V16.7ZM77.41 22.9C78.31 22.9 79.11 22.1 79.11 20.8C79.11 19.5 78.31 18.7 77.41 18.7C76.61 18.7 76.11 19.2 75.71 19.8V21.8C76.11 22.4 76.61 22.9 77.41 22.9Z" fill="#191919"/>
          <path d="M83.01 12.5H85.61V17.8C86.11 17.1 87.01 16.6 88.11 16.6C90.11 16.6 91.31 17.9 91.31 20.1V24.2H88.71V20.5C88.71 19.4 88.21 18.8 87.31 18.8C86.51 18.8 86.01 19.3 85.61 19.9V24.2H83.01V12.5Z" fill="#191919"/>
          <path d="M92.31 20.8C92.31 18.3 94.01 16.5 96.31 16.5C98.61 16.5 100.31 18.3 100.31 20.8C100.31 23.3 98.61 25.1 96.31 25.1C94.01 25.1 92.31 23.2 92.31 20.8ZM97.41 20.8C97.41 19.7 96.91 18.8 96.11 18.8C95.31 18.8 94.81 19.7 94.81 20.8C94.81 21.9 95.31 22.8 96.11 22.8C96.91 22.8 97.41 21.9 97.41 20.8Z" fill="#191919"/>
          <path d="M101.21 16.7H103.61L103.71 17.7C104.21 17 105.11 16.5 106.31 16.5C108.61 16.5 110.31 18.3 110.31 20.8C110.31 23.3 108.61 25.1 106.31 25.1C105.21 25.1 104.31 24.7 103.81 24V28.3H101.21V16.7ZM105.61 22.9C106.51 22.9 107.31 22.1 107.31 20.8C107.31 19.5 106.51 18.7 105.61 18.7C104.81 18.7 104.31 19.2 103.91 19.8V21.8C104.31 22.4 104.81 22.9 105.61 22.9Z" fill="#191919"/>
          <path d="M111.21 16.7H113.61L113.71 17.6C114.11 17 114.91 16.5 115.91 16.5C116.91 16.5 117.61 17 117.91 17.8C118.41 17.1 119.31 16.5 120.41 16.5C122.11 16.5 123.31 17.6 123.31 19.8V24.1H120.71V20.2C120.71 19.2 120.41 18.7 119.71 18.7C119.11 18.7 118.71 19.1 118.41 19.6C118.41 19.7 118.41 19.9 118.41 20V24.1H115.81V20.2C115.81 19.2 115.51 18.7 114.81 18.7C114.21 18.7 113.81 19.1 113.51 19.6V24.1H110.91V16.7H111.21Z" fill="#191919"/>
          <path d="M38.27 6.8H41.31V9.8H38.27V6.8Z" fill="#191919"/>
          <path d="M15.11 0L19.81 9.8H29.41L21.81 15.9L24.11 25.7L15.11 19.6L6.11 25.7L8.41 15.9L0.81 9.8H10.41L15.11 0Z" fill="#00B67A"/>
          <path d="M15.11 19.6L6.11 25.7L8.41 15.9L0.81 9.8H10.41L15.11 0" fill="#005128"/>
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
          {renderTrustpilotLogo()}
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="flex justify-between mt-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
          {renderTrustpilotLogo()}
        </div>
        <div className="text-center text-red-500">
          <svg className="w-12 h-12 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
          {renderTrustpilotLogo()}
        </div>
        <div className="text-center text-gray-500">
          <p>No reviews available at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
        {renderTrustpilotLogo()}
      </div>
      
      <div className="relative h-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <div className="flex items-start mb-4">
              {reviews[currentIndex].avatar ? (
                <img 
                  src={reviews[currentIndex].avatar} 
                  alt={reviews[currentIndex].author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#e6f7f2] flex items-center justify-center mr-4">
                  <span className="text-[#00b67a] font-bold text-lg">
                    {reviews[currentIndex].author.charAt(0)}
                  </span>
                </div>
              )}
              
              <div>
                <div className="flex items-center">
                  <h4 className="font-semibold text-gray-800 mr-2">{reviews[currentIndex].author}</h4>
                  {reviews[currentIndex].verified && (
                    <svg className="w-4 h-4 text-[#00b67a]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  {renderStars(reviews[currentIndex].rating)}
                  <span className="text-sm text-gray-500">
                    {new Date(reviews[currentIndex].date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-gray-700 italic">
              "{reviews[currentIndex].text}"
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={() => goToReview((currentIndex - 1 + reviews.length) % reviews.length)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Previous review"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <div className="flex space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#00b67a]' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={() => goToReview((currentIndex + 1) % reviews.length)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Next review"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <a 
          href={businessId ? `https://www.trustpilot.com/review/${businessId}` : "https://www.trustpilot.com"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-[#00b67a] hover:underline"
        >
          See all our reviews on Trustpilot
        </a>
      </div>
    </div>
  );
};

export default TrustpilotReviews;
