
import React from 'react';
import { motion, useTransform } from 'framer-motion';

const FlyingRaven = ({ scrollPosition }) => {
  const y = useTransform(() => scrollPosition * 3000);
  const x = useTransform(() => Math.sin(scrollPosition * 10) * 100);
  const rotate = useTransform(() => Math.sin(scrollPosition * 8) * 15);

  return (
    <motion.div
      style={{ y, x, rotate }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollPosition > 0.05 ? 0.8 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        alt="A realistic raven flying"
        className="w-32 h-32 object-contain drop-shadow-2xl"
       src="https://images.unsplash.com/photo-1680058951052-890510889052" />
    </motion.div>
  );
};

export default FlyingRaven;
