'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  platform: 'meta' | 'trustpilot';
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

interface ReviewsCarouselProps {
  trustpilotBusinessId?: string;
  facebookPageId?: string;
  className?: string;
}

const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({
  trustpilotBusinessId,
  facebookPageId,
  className = ""
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(true);

  // Fetch reviews from APIs
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, these would be actual API calls
        // For now, we'll simulate the API responses
        
        // Simulated delay for API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If we have actual business IDs, we would use them in the API calls
        const hasTrustpilotId = !!trustpilotBusinessId;
        const hasFacebookId = !!facebookPageId;
        
        // Placeholder reviews (in a real implementation, these would come from the APIs)
        const mockReviews: Review[] = [
          {
            id: '1',
            platform: 'trustpilot',
            author: 'Michael S.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            text: 'JoeyMed's weight loss program changed my life! I've lost 30 pounds in 3 months with their medical supervision and personalized plan.',
            date: '2025-03-15',
            verified: true
          },
          {
            id: '2',
            platform: 'meta',
            author: 'Jennifer L.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 5,
            text: 'The customer service is exceptional. They answered all my questions and made the process so easy. Highly recommend their ED treatment.',
            date: '2025-03-02',
            verified: true
          },
          {
            id: '3',
            platform: 'trustpilot',
            author: 'Robert K.',
            avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
            rating: 4,
            text: 'Very professional telehealth service. The doctor was knowledgeable and the medication arrived quickly and discreetly.',
            date: '2025-02-18',
            verified: true
          },
          {
            id: '4',
            platform: 'meta',
            author: 'Sarah M.',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            rating: 5,
            text: 'Their anti-aging treatments have made a noticeable difference in my skin and energy levels. Worth every penny!',
            date: '2025-02-05',
            verified: true
          },
          {
            id: '5',
            platform: 'trustpilot',
            author: 'David W.',
            avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
            rating: 5,
            text: 'The travel health kit was perfect for my trip to South America. Had everything I needed and the online consultation was thorough.',
            date: '2025-01-20',
            verified: true
          }
        ];
        
        setReviews(mockReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [trustpilotBusinessId, facebookPageId]);

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
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
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

  // Platform badge
  const renderPlatformBadge = (platform: 'meta' | 'trustpilot') => {
    if (platform === 'trustpilot') {
      return (
        <div className="flex items-center px-2 py-1 bg-green-50 rounded-md">
          <svg className="w-4 h-4 text-green-600 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.9 8.2H24L16.5 13.2L19.4 21.4L12 16.3L4.6 21.4L7.5 13.2L0 8.2H9.1L12 0Z" />
          </svg>
          <span className="text-xs font-medium text-green-700">Trustpilot</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center px-2 py-1 bg-blue-50 rounded-md">
          <svg className="w-4 h-4 text-blue-600 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="text-xs font-medium text-blue-700">Meta</span>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
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
      <h3 className="text-xl font-bold text-gray-800 mb-6">What Our Customers Say</h3>
      
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
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-lg">
                    {reviews[currentIndex].author.charAt(0)}
                  </span>
                </div>
              )}
              
              <div>
                <div className="flex items-center">
                  <h4 className="font-semibold text-gray-800 mr-2">{reviews[currentIndex].author}</h4>
                  {reviews[currentIndex].verified && (
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
              
              <div className="ml-auto">
                {renderPlatformBadge(reviews[currentIndex].platform)}
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
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
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
    </div>
  );
};

export default ReviewsCarousel;
