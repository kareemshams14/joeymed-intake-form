'use client'
import React from "react"
import { motion } from "framer-motion"

/* --------------------------------------------------  theme colours */
const treatmentThemes = {
  'weight-loss': {
    primaryColor: '#10b981', // green
    secondaryColor: 'rgba(16, 185, 129, 0.1)',
    icon: '⚖️',
  },
  'ed-treatment': {
    primaryColor: '#3b82f6', // blue
    secondaryColor: 'rgba(59, 130, 246, 0.1)',
    icon: '💪',
  },
  'sexual-health': {
    primaryColor: '#ec4899', // pink
    secondaryColor: 'rgba(236, 72, 153, 0.1)',
    icon: '❤️',
  },
  longevity: {
    primaryColor: '#8b5cf6', // purple
    secondaryColor: 'rgba(139, 92, 246, 0.1)',
    icon: '⏱️',
  },
} as const

/* --------------------------------------------------  copy & assets */
const treatmentContent = {
  'weight-loss': {
    title: 'Weight Loss Program',
    description:
      'Our medically supervised weight‑loss program helps you achieve sustainable results through personalized treatment plans.',
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    additionalInfo:
      "Free consultation with our healthcare providers is included after purchase. If you're not prescribed the medication, we'll issue a full refund.",
  },
  'ed-treatment': {
    title: 'ED Treatment',
    description:
      'Effective treatment for erectile dysfunction with FDA‑approved medications and ongoing support.',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    additionalInfo:
      "Free consultation with our healthcare providers is included after purchase. If you're not prescribed the medication, we'll issue a full refund.",
  },
  'sexual-health': {
    title: 'Sexual Health',
    description:
      'Comprehensive sexual‑health treatments for improved performance, libido and satisfaction.',
    imageUrl:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    additionalInfo:
      "Free consultation with our healthcare providers is included after purchase. If you're not prescribed the medication, we'll issue a full refund.",
  },
  longevity: {
    title: 'Longevity Treatment',
    description:
      'Advanced anti‑aging and longevity treatments to help you look and feel younger.',
    imageUrl:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    additionalInfo:
      "Free consultation with our healthcare providers is included after purchase. If you're not prescribed the medication, we'll issue a full refund.",
  },
} as const

/* --------------------------------------------------  types */
interface TreatmentInfographicProps {
  treatmentId: keyof typeof treatmentThemes
  stats: Array<{ value: string; label: string }>
  benefits: string[]
}

/* --------------------------------------------------  component */
const TreatmentInfographic: React.FC<TreatmentInfographicProps> = ({
  treatmentId,
  stats,
  benefits,
}) => {
  const theme = treatmentThemes[treatmentId] ?? treatmentThemes['weight-loss']
  const content = treatmentContent[treatmentId] ?? treatmentContent['weight-loss']

  return (
    <div className="treatment-infographic" style={{ borderColor: theme.primaryColor }}>
      {/* header */}
      <div className="infographic-header" style={{ backgroundColor: theme.secondaryColor }}>
        <div className="treatment-icon" style={{ backgroundColor: theme.primaryColor }}>
          <span>{theme.icon}</span>
        </div>
        <h3 style={{ color: theme.primaryColor }}>{content.title}</h3>
      </div>

      {/* body */}
      <div className="infographic-content">
        <p className="treatment-description">{content.description}</p>

        {/* stats */}
        <motion.div
          className="stats-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-inner" style={{ backgroundColor: theme.secondaryColor }}>
                <div className="stat-value" style={{ color: theme.primaryColor }}>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* benefits */}
        <div className="benefits-list">
          <h4>Key Benefits</h4>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              className="benefit-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{benefit}</span>
            </motion.div>
          ))}
        </div>

        {/* note */}
        <div
          className="treatment-info"
          style={{ backgroundColor: theme.secondaryColor, borderColor: theme.primaryColor }}
        >
          <p>{content.additionalInfo}</p>
        </div>
      </div>
    </div>
  )
}

export default TreatmentInfographic
