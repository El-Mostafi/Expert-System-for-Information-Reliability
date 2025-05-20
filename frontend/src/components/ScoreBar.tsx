import React from 'react';
import { motion } from 'framer-motion';

interface ScoreBarProps {
  score: number;
  large?: boolean;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, large = false }) => {
  // Get color based on score
  const getColor = () => {
    if (score < 33) return 'bg-red-500';
    if (score < 66) return 'bg-amber-500';
    return 'bg-green-500';
  };
  
  return (
    <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${large ? 'h-5' : 'h-3'}`}>
      <motion.div
        className={`${getColor()} h-full`}
        initial={{ width: '0%' }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {large && (
          <div className="h-full flex items-center justify-end">
            <span className="text-white text-xs font-bold mr-2">{score}%</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ScoreBar;