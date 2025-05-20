import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, FileText, Calendar, Save, RefreshCw } from 'lucide-react';
import axios from 'axios';

interface FormData {
  title: string;
  description: string;
  sourceType: 'fiable' | 'moyenne' | 'non_fiable';
  authorName: string;
  authorReputation: 'Reconnu' | 'Inconnu' | 'Anonyme';
  hasReferences: 'Oui' | 'Non';
  citationCount: number;
  emotionalLevel: number;
  publicationDate: string;
}

const AddKnowledgePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    sourceType: 'moyenne',
    authorName: '',
    authorReputation: 'Inconnu',
    hasReferences: 'Non',
    citationCount: 0,
    emotionalLevel: 5,
    publicationDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      sourceType: 'moyenne',
      authorName: '',
      authorReputation: 'Inconnu',
      hasReferences: 'Non',
      citationCount: 0,
      emotionalLevel: 5,
      publicationDate: '',
    });
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Simulated API call
      await axios.post('/api/add-knowledge', formData);
      setMessage({
        type: 'success',
        text: 'Information ajoutée avec succès à la base de connaissances',
      });
      handleReset();
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erreur lors de l\'ajout de l\'information',
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
                <label htmlFor="title" className="form-label">
                  Titre de l'information
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Entrez le titre..."
                />
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
                  className="form-input"
                  placeholder="Décrivez l'information..."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Source */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-blue-500" />
              <h2 className="text-xl font-semibold">Source</h2>
            </div>

            <div>
              <label htmlFor="sourceType" className="form-label">
                Type de source
              </label>
              <select
                id="sourceType"
                name="sourceType"
                value={formData.sourceType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="fiable">Fiable</option>
                <option value="moyenne">Moyenne</option>
                <option value="non_fiable">Non fiable</option>
              </select>
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
                <label htmlFor="authorName" className="form-label">
                  Nom de l'auteur
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  required
                  value={formData.authorName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Nom de l'auteur..."
                />
              </div>

              <div>
                <label htmlFor="authorReputation" className="form-label">
                  Réputation
                </label>
                <select
                  id="authorReputation"
                  name="authorReputation"
                  value={formData.authorReputation}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Reconnu">Reconnu</option>
                  <option value="Inconnu">Inconnu</option>
                  <option value="Anonyme">Anonyme</option>
                </select>
              </div>

              <div>
                <label htmlFor="hasReferences" className="form-label">
                  Présence de références
                </label>
                <select
                  id="hasReferences"
                  name="hasReferences"
                  value={formData.hasReferences}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
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
                <label htmlFor="citationCount" className="form-label">
                  Nombre de citations
                </label>
                <input
                  type="number"
                  id="citationCount"
                  name="citationCount"
                  min="0"
                  value={formData.citationCount}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="emotionalLevel" className="form-label">
                  Niveau de langage émotionnel: {formData.emotionalLevel}
                </label>
                <input
                  type="range"
                  id="emotionalLevel"
                  name="emotionalLevel"
                  min="0"
                  max="10"
                  value={formData.emotionalLevel}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="publicationDate" className="form-label">
                  Date de publication
                </label>
                <input
                  type="date"
                  id="publicationDate"
                  name="publicationDate"
                  value={formData.publicationDate}
                  onChange={handleChange}
                  className="form-input"
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