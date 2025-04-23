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
  className = '',
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(true);

  /* ------------------------------------------------------------------
     1. Fetch reviews  (mocked)
  ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        await new Promise((r) => setTimeout(r, 1000));

        const mockReviews: Review[] = [
          {
            id: '1',
            platform: 'trustpilot',
            author: 'Michael S.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            text: "JoeyMed's weight-loss program changed my life! I've lost 30 pounds in 3 months with their medical supervision and personalized plan.",
            date: '2025-03-15',
            verified: true,
          },
          {
            id: '2',
            platform: 'meta',
            author: 'Jennifer L.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 5,
            text: "The customer service is exceptional. They answered all my questions and made the process so easy. Highly recommend their ED treatment.",
            date: '2025-03-02',
            verified: true,
          },
          {
            id: '3',
            platform: 'trustpilot',
            author: 'Robert K.',
            avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
            rating: 4,
            text: 'Very professional telehealth service. The doctor was knowledgeable and the medication arrived quickly and discreetly.',
            date: '2025-02-18',
            verified: true,
          },
          {
            id: '4',
            platform: 'meta',
            author: 'Sarah M.',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            rating: 5,
            text: 'Their anti-aging treatments have made a noticeable difference in my skin and energy levels. Worth every penny!',
            date: '2025-02-05',
            verified: true,
          },
          {
            id: '5',
            platform: 'trustpilot',
            author: 'David W.',
            avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
            rating: 5,
            text: 'The travel health kit was perfect for my trip to South America. Had everything I needed and the online consultation was thorough.',
            date: '2025-01-20',
            verified: true,
          },
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

  /* ------------------------------------------------------------------
     2. Autoplay logic
  ------------------------------------------------------------------ */
  useEffect(() => {
    if (!autoplay || reviews.length === 0) return;

    const interval = setInterval(
      () => setCurrentIndex((i) => (i + 1) % reviews.length),
      5000
    );
    return () => clearInterval(interval);
  }, [autoplay, reviews.length]);

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  const goToReview = (i: number) => {
    setCurrentIndex(i);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  /* ------------------------------------------------------------------
     3. Helpers (renderStars, renderPlatformBadge)  — unchanged
  ------------------------------------------------------------------ */
  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const renderPlatformBadge = (platform: 'meta' | 'trustpilot') =>
    platform === 'trustpilot' ? (
      <div className="flex items-center px-2 py-1 bg-green-50 rounded-md">
        {/* Trustpilot star */}
        <svg
          className="w-4 h-4 text-green-600 mr-1"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.9 8.2H24L16.5 13.2 19.4 21.4 12 16.3 4.6 21.4 7.5 13.2 0 8.2h9.1L12 0z" />
        </svg>
        <span className="text-xs font-medium text-green-700">Trustpilot</span>
      </div>
    ) : (
      <div className="flex items-center px-2 py-1 bg-blue-50 rounded-md">
        {/* Facebook (Meta) icon */}
        <svg
          className="w-4 h-4 text-blue-600 mr-1"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.855c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="text-xs font-medium text-blue-700">Meta</span>
      </div>
    );

  /* ------------------------------------------------------------------
     4. UI states (loading / error / empty)  — unchanged
  ------------------------------------------------------------------ */

  if (loading) {
    /* skeleton … */
  }
  if (error) {
    /* error UI … */
  }
  if (reviews.length === 0) {
    /* empty state … */
  }

  /* ------------------------------------------------------------------
     5. Carousel
  ------------------------------------------------------------------ */
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        What Our Customers Say
      </h3>

      {/* body of carousel identical to your snippet */}
      {/* … */}
    </div>
  );
};

export default ReviewsCarousel;
