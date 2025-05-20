import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, AlertCircle, BookOpen, Search } from 'lucide-react';
import { evaluateInformation } from '../services/api';

interface FormData {
  informationText: string;
  sourceUrl: string;
  hasAuthor: boolean;
  hasCitations: boolean;
  subjectiveLanguage: boolean;
  hasContradictions: boolean;
}

const EvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    informationText: '',
    sourceUrl: '',
    hasAuthor: false,
    hasCitations: false,
    subjectiveLanguage: false,
    hasContradictions: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const results = await evaluateInformation(formData);
      // Store results in sessionStorage to pass to results page
      sessionStorage.setItem('evaluationResults', JSON.stringify(results));
      navigate('/results');
    } catch (error) {
      console.error('Error evaluating information:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Évaluation de l'Information</h1>
        
        <form onSubmit={handleSubmit} className="card">
          <div className="mb-6">
            <label htmlFor="informationText" className="form-label">
              Information à évaluer
            </label>
            <textarea
              id="informationText"
              name="informationText"
              rows={4}
              required
              value={formData.informationText}
              onChange={handleChange}
              placeholder="Entrez le texte de l'information à évaluer..."
              className="form-input"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="sourceUrl" className="form-label">
              URL de la source (optionnel)
            </label>
            <div className="flex items-center">
              <Compass className="text-slate-400 w-5 h-5 mr-2" />
              <input
                type="url"
                id="sourceUrl"
                name="sourceUrl"
                value={formData.sourceUrl}
                onChange={handleChange}
                placeholder="https://example.com/article"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card bg-slate-50">
              <div className="flex items-start mb-4">
                <BookOpen className="text-blue-500 w-5 h-5 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium">Caractéristiques de la source</h3>
                  <p className="text-sm text-slate-600">Cochez les éléments présents</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasAuthor"
                    name="hasAuthor"
                    checked={formData.hasAuthor}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasAuthor" className="ml-2 text-sm font-medium">
                    Auteur identifiable
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasCitations"
                    name="hasCitations"
                    checked={formData.hasCitations}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasCitations" className="ml-2 text-sm font-medium">
                    Présence de citations/références
                  </label>
                </div>
              </div>
            </div>
            
            <div className="card bg-slate-50">
              <div className="flex items-start mb-4">
                <AlertCircle className="text-red-500 w-5 h-5 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium">Indicateurs de problèmes</h3>
                  <p className="text-sm text-slate-600">Cochez si observés</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="subjectiveLanguage"
                    name="subjectiveLanguage"
                    checked={formData.subjectiveLanguage}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="subjectiveLanguage" className="ml-2 text-sm font-medium">
                    Langage hautement subjectif/émotionnel
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasContradictions"
                    name="hasContradictions"
                    checked={formData.hasContradictions}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasContradictions" className="ml-2 text-sm font-medium">
                    Contradictions internes
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center justify-center mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Évaluation en cours...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Évaluer l'information
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EvaluationPage;