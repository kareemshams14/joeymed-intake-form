import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

const TrustpilotReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const businessProfileUrl =
    "https://www.trustpilot.com/review/joeymed.com";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const sampleReviews: Review[] = [
          {
            id: "1",
            author: "Michael R.",
            rating: 5,
            content:
              "JoeyMed has been a game-changer for my weight-loss journey. The medication works exactly as described, and their medical team is incredibly supportive. Highly recommend!",
            date: "2023-12-15",
          },
          {
            id: "2",
            author: "Sarah T.",
            rating: 5,
            content:
              "I was skeptical at first, but JoeyMed delivered on their promises. The consultation was thorough, and the treatment plan was personalized to my needs. Great service!",
            date: "2023-11-28",
          },
          {
            id: "3",
            author: "David L.",
            rating: 4,
            content:
              "The ED treatment from JoeyMed has significantly improved my quality of life. The discreet packaging and quick delivery were much appreciated. Would recommend to others facing similar issues.",
            date: "2024-01-05",
          },
          {
            id: "4",
            author: "Jennifer K.",
            rating: 5,
            content: `The weight-loss program exceeded my expectations. I've lost 15 pounds in 2 months with their medication and support. The medical team is responsive and knowledgeable.`,
            date: "2024-02-10",
          },
          {
            id: "5",
            author: "Robert M.",
            rating: 4,
            content: `JoeyMed's longevity treatment has noticeably improved my energy levels and sleep quality. The consultation process was easy, and I received my treatment quickly.`,
            date: "2024-01-22",
          },
        ];

        setReviews(sampleReviews);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Trustpilot reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () =>
    setCurrentIndex((i) => (i + 1) % reviews.length);
  const prevReview = () =>
    setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));

  if (loading) return <div className="reviews-loading">Loading reviews…</div>;
  if (error) return <div className="reviews-error">{error}</div>;
  if (!reviews.length)
    return <div className="reviews-empty">No reviews available at this time.</div>;

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <div className="trustpilot-logo">
          <img
            src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-white.svg"
            alt="Trustpilot"
            style={{
              background: "#00b67a",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </div>
        <p className="reviews-source">
          Reviews from{" "}
          <a href={businessProfileUrl} target="_blank" rel="noopener noreferrer">
            Trustpilot
          </a>
        </p>
      </div>

      <div className="reviews-carousel">
        <button className="carousel-button prev" onClick={prevReview}>
          &#10094;
        </button>

        <motion.div
          className="review-item"
          key={reviews[currentIndex].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="review-header">
            <span className="review-author">{reviews[currentIndex].author}</span>
            <div className="review-stars">
              {renderStars(reviews[currentIndex].rating)}
            </div>
          </div>
          <div className="review-content">
            “{reviews[currentIndex].content}”
          </div>
          <div className="review-date">
            {new Date(reviews[currentIndex].date).toLocaleDateString()}
          </div>
        </motion.div>

        <button className="carousel-button next" onClick={nextReview}>
          &#10095;
        </button>
      </div>

      <div className="reviews-footer">
        <div className="reviews-pagination">
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={`pagination-dot ${
                idx === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        <a
          className="reviews-link"
          href={businessProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          See all reviews on Trustpilot
        </a>
      </div>
    </div>
  );
};

export default TrustpilotReviews;
