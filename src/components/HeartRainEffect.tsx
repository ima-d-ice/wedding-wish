import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeartProps {
  id: string | number;
  initialX: number;
  delay: number;
  duration: number;
}

const Heart: React.FC<HeartProps> = ({ id, initialX, delay, duration }) => {
  return (
    <motion.div
      key={id}
      className="absolute text-red-500 text-3xl" // Style for heart emoji, adjust size/color as needed
      style={{ left: `${initialX}%`, top: '-40px' }} // Start above screen
      initial={{ opacity: 1, y: -40, rotate: Math.random() * 60 - 30 }} // Initial slight rotation
      animate={{
        y: '100vh', // Fall to bottom of viewport
        opacity: [1, 1, 0.8, 0], // Stay visible then fade out
        rotate: Math.random() * 90 - 45, // Gentle rotation during fall
      }}
      transition={{
        delay,
        duration,
        ease: 'linear', // Consistent falling speed
        opacity: { times: [0, 0.8, 0.9, 1], duration } // Control fade out timing
      }}
    >
      ❤️
    </motion.div>
  );
};

interface HeartRainEffectProps {
  isRaining: boolean;
  onComplete: () => void;
}

const HeartRainEffect: React.FC<HeartRainEffectProps> = ({ isRaining, onComplete }) => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);
  const numHearts = 30; // Number of hearts to display

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRaining) {
      const newHearts = Array.from({ length: numHearts }).map((_, i) => ({
        id: `heart-${i}-${Date.now()}`, // Unique key
        initialX: Math.random() * 100,    // Random horizontal start position (percentage)
        delay: Math.random() * 1.5,       // Random delay for staggered start (0 to 1.5s)
        duration: 3 + Math.random() * 3,  // Random duration for fall (3s to 6s)
      }));
      setHearts(newHearts);

      // Determine the longest animation to call onComplete
      const maxDuration = newHearts.length > 0 
        ? Math.max(...newHearts.map(h => h.delay + h.duration)) 
        : 0;
      
      timer = setTimeout(() => {
        setHearts([]); // Clear hearts from state
        if (onComplete) {
          onComplete(); // Notify parent component that animation is done
        }
      }, (maxDuration + 0.5) * 1000); // Add a small buffer before clearing
    }

    return () => {
      if (timer) clearTimeout(timer); // Cleanup timer on unmount or if isRaining changes
    };
  }, [isRaining, onComplete]);

  if (!isRaining && hearts.length === 0) {
    return null; // Don't render anything if not raining and no hearts are left
  }

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-[9998] overflow-hidden" // High z-index, below Toaster (often 9999)
      aria-hidden="true"
    >
      {hearts.map(heart => (
        <Heart
          key={heart.id}
          id={heart.id}
          initialX={heart.initialX}
          delay={heart.delay}
          duration={heart.duration}
        />
      ))}
    </div>
  );
};

export default HeartRainEffect;