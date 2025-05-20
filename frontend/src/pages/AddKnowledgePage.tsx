import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, FileText, Calendar, Save, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addInformation } from '../services/api';

// Interface adaptée au nouveau format de données
interface FormData {
  source: string;
  fiabilite: 'fiable' | 'moyenne' | 'non_fiable';
  auteur: string;
  reputation: 'reconnu' | 'inconnu' | 'anonyme';
  references: boolean;
  style: 'neutre' | 'emotionnel' | 'technique'| 'familier' | 'darija';
  info: string;
  citations: number;
  emotion: number;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

const AddKnowledgePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    source: '',
    fiabilite: 'moyenne',
    auteur: '',
    reputation: 'inconnu',
    references: false,
    style: 'neutre',
    info: '',
    citations: 0,
    emotion: 5,
    description: ''
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.info.trim()) {
      newErrors.info = "Le titre de l'information est requis";
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (!formData.source.trim()) {
      newErrors.source = 'La source est requise';
    }

    if (!formData.auteur.trim()) {
      newErrors.auteur = "Le nom de l'auteur est requis";
    }

    if (formData.citations < 0) {
      newErrors.citations = 'Le nombre de citations ne peut pas être négatif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Pour gérer le cas spécial des checkbox (references)
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      // Pour les autres types de champs
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleReset = () => {
    setFormData({
      source: '',
      fiabilite: 'moyenne',
      auteur: '',
      reputation: 'inconnu',
      references: false,
      style: 'neutre',
      info: '',
      citations: 0,
      emotion: 5,
      description: ''
    });
    setMessage(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({
        type: 'error',
        text: 'Veuillez corriger les erreurs dans le formulaire',
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await addInformation(formData);
      
      // Store the evaluation results
      sessionStorage.setItem('evaluationResults', JSON.stringify(result));
      
      setMessage({
        type: 'success',
        text: 'Information ajoutée avec succès. Redirection vers les résultats...',
      });
      
      // Redirect to results page after a short delay
        navigate('/results');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : "Erreur lors de l'ajout de l'information. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Ajouter une Information
        </h1>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Information */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-blue-500" />
              <h2 className="text-xl font-semibold">Information à évaluer</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="info" className="form-label">
                  Titre de l'information
                </label>
                <input
                  type="text"
                  id="info"
                  name="info"
                  value={formData.info}
                  onChange={handleChange}
                  className={`form-input ${errors.info ? 'border-red-500' : ''}`}
                  placeholder="Entrez le titre..."
                />
                {errors.info && (
                  <p className="mt-1 text-sm text-red-600">{errors.info}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-input ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Décrivez l'information..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Source */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-blue-500" />
              <h2 className="text-xl font-semibold">Source</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="source" className="form-label">
                  Source
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className={`form-input ${errors.source ? 'border-red-500' : ''}`}
                  placeholder="exemple.com"
                />
                {errors.source && (
                  <p className="mt-1 text-sm text-red-600">{errors.source}</p>
                )}
              </div>

              <div>
                <label htmlFor="fiabilite" className="form-label">
                  Fiabilité
                </label>
                <select
                  id="fiabilite"
                  name="fiabilite"
                  value={formData.fiabilite}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="fiable">Fiable</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="non_fiable">Non fiable</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Auteur */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-blue-500" />
              <h2 className="text-xl font-semibold">Auteur</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="auteur" className="form-label">
                  Nom de l'auteur
                </label>
                <input
                  type="text"
                  id="auteur"
                  name="auteur"
                  value={formData.auteur}
                  onChange={handleChange}
                  className={`form-input ${errors.auteur ? 'border-red-500' : ''}`}
                  placeholder="Nom de l'auteur..."
                />
                {errors.auteur && (
                  <p className="mt-1 text-sm text-red-600">{errors.auteur}</p>
                )}
              </div>

              <div>
                <label htmlFor="reputation" className="form-label">
                  Réputation
                </label>
                <select
                  id="reputation"
                  name="reputation"
                  value={formData.reputation}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="reconnu">Reconnu</option>
                  <option value="inconnu">Inconnu</option>
                  <option value="anonyme">Anonyme</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="references"
                  name="references"
                  checked={formData.references}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="references" className="form-label">
                  Présence de références
                </label>
              </div>
            </div>
          </div>

          {/* Section 4: Contenu */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-500" />
              <h2 className="text-xl font-semibold">Contenu</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="style" className="form-label">
                  Style d'écriture
                </label>
                <select
                  id="style"
                  name="style"
                  value={formData.style}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="neutre">Neutre</option>
                  <option value="emotionnel">Emotionnel</option>
                  <option value="technique">Technique</option>
                  <option value="familier">Familier</option>
                  <option value="darija">Darija</option>

                </select>
              </div>

              <div>
                <label htmlFor="citations" className="form-label">
                  Nombre de citations
                </label>
                <input
                  type="number"
                  id="citations"
                  name="citations"
                  min="0"
                  value={formData.citations}
                  onChange={handleChange}
                  className={`form-input ${errors.citations ? 'border-red-500' : ''}`}
                />
                {errors.citations && (
                  <p className="mt-1 text-sm text-red-600">{errors.citations}</p>
                )}
              </div>

              <div>
                <label htmlFor="emotion" className="form-label">
                  Niveau de langage émotionnel: {formData.emotion}
                </label>
                <input
                  type="range"
                  id="emotion"
                  name="emotion"
                  min="0"
                  max="10"
                  value={formData.emotion}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'Ajout en cours...' : 'Ajouter l\'information'}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleReset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 rounded-md border border-slate-300 text-slate-700 font-semibold
                hover:bg-slate-50 flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Réinitialiser
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddKnowledgePage;