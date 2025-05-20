import React from 'react';
import ScoreBar from './ScoreBar';

interface CriteriaScoreProps {
  label: string;
  score: number;
}

const CriteriaScore: React.FC<CriteriaScoreProps> = ({ label, score }) => {
  return (
    <div className="p-3 border border-slate-200 rounded-lg bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-medium">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium whitespace-nowrap">
            {score}%
          </span>
          <div className="w-40 sm:w-48">
            <ScoreBar score={score} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriteriaScore;