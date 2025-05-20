import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import ScoreBar from '../components/ScoreBar';
import CriteriaScore from '../components/CriteriaScore';

export interface EvaluationResult {
  informationText: string;
  reliability: 'suspecte' | 'douteuse' | 'crédible';
  globalScore: number;
  criteria: {
    scoreSource: number;
    scoreAuteur: number;
    scoreCitations: number;
    scoreLangage: number;
    scoreContradiction: number;
  };
}

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<EvaluationResult | null>(null);
  
  useEffect(() => {
    const storedResults = sessionStorage.getItem('evaluationResults');
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect if no results are available
      navigate('/evaluation');
    }
  }, [navigate]);
  
  if (!results) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4">Chargement des résultats...</p>
      </div>
    );
  }
  
  const getReliabilityIcon = () => {
    switch (results.reliability) {
      case 'suspecte':
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      case 'douteuse':
        return <Shield className="w-8 h-8 text-amber-500" />;
      case 'crédible':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
    }
  };
  
  const getReliabilityClass = () => {
    switch (results.reliability) {
      case 'suspecte':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'douteuse':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'crédible':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };
  
  const criteriaItems = [
    { key: 'scoreSource', label: 'Fiabilité de la source', score: results.criteria.scoreSource },
    { key: 'scoreAuteur', label: 'Crédibilité de l\'auteur', score: results.criteria.scoreAuteur },
    { key: 'scoreCitations', label: 'Qualité des citations', score: results.criteria.scoreCitations },
    { key: 'scoreLangage', label: 'Objectivité du langage', score: results.criteria.scoreLangage },
    { key: 'scoreContradiction', label: 'Cohérence interne', score: results.criteria.scoreContradiction },
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Résultats de l'Évaluation</h1>
        
        <div className="card mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Information analysée</h2>
            <blockquote className="italic border-l-4 border-slate-300 pl-4 py-2 text-slate-600">
              "{results.informationText}"
            </blockquote>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <div className={`rounded-lg p-4 border ${getReliabilityClass()} flex items-center`}>
                {getReliabilityIcon()}
                <div className="ml-3">
                  <h3 className="font-semibold text-lg">Niveau de fiabilité</h3>
                  <p className="capitalize">{results.reliability}</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="rounded-lg p-4 border border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-lg mb-2">Score global</h3>
                <ScoreBar score={results.globalScore} large />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Évaluation par critère</h3>
            
            <div className="space-y-4">
              {criteriaItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CriteriaScore label={item.label} score={item.score} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
            onClick={() => navigate('/evaluation')}
          >
            Nouvelle évaluation
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;