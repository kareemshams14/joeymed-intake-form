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
  className = '',
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(true);

  /* ------------------------------------------------------------------ */
  /* 1. Fetch (mock) reviews                                            */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        // simulate API latency
        await new Promise((r) => setTimeout(r, 1000));

        const mockReviews: Review[] = [
          {
            id: '1',
            author: 'Michael S.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            text: "JoeyMed's weight-loss program changed my life! I've lost 30 pounds in 3 months with their medical supervision and personalized plan.",
            date: '2025-03-15',
            verified: true,
          },
          {
            id: '3',
            author: 'Robert K.',
            avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
            rating: 4,
            text: 'Very professional telehealth service. The doctor was knowledgeable and the medication arrived quickly and discreetly.',
            date: '2025-02-18',
            verified: true,
          },
          {
            id: '5',
            author: 'David W.',
            avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
            rating: 5,
            text: 'The travel health kit was perfect for my trip to South America. Had everything I needed and the online consultation was thorough.',
            date: '2025-01-20',
            verified: true,
          },
          {
            id: '6',
            author: 'Lisa M.',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
            rating: 5,
            text: "I was skeptical at first, but JoeyMed's ED treatment has been life-changing. The doctors are professional and the medication works exactly as described.",
            date: '2025-01-05',
            verified: true,
          },
          {
            id: '7',
            author: 'James T.',
            avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
            rating: 5,
            text: 'The anti-aging program has made me feel 10 years younger. My energy levels are up and I’m sleeping better than I have in years.',
            date: '2024-12-12',
            verified: true,
          },
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

  /* ------------------------------------------------------------------ */
  /* 2. Autoplay logic                                                  */
  /* ------------------------------------------------------------------ */
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

  const goToReview = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  /* ------------------------------------------------------------------ */
  /* 3. Helpers                                                         */
  /* ------------------------------------------------------------------ */
  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-[#00b67a]' : 'text-gray-300'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  /* (Trustpilot SVG omitted here for brevity — keep your original) */
  const renderTrustpilotLogo = () => (
    /* ... unchanged SVG ... */
    <div />
  );

  /* ------------------------------------------------------------------ */
  /* 4. UI states & carousel                                            */
  /* ------------------------------------------------------------------ */
  if (loading || error || reviews.length === 0) {
    /* keep your existing loading / error / empty placeholders here */
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
        {renderTrustpilotLogo()}
      </div>

      {/* carousel */}
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
            {/* avatar & meta */}
            {/* ... keep original markup ... */}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* nav buttons & dots */}
      {/* ... keep original markup ... */}
    </div>
  );
};

export default TrustpilotReviews;
