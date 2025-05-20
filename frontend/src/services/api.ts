import axios from 'axios';
import { EvaluationResult } from '../pages/ResultsPage';

const API_BASE_URL = 'http://localhost:3000';

export const evaluateInformation = async (formData: { informationText: string }): Promise<EvaluationResult> => {
  
    const response = await axios.post(`${API_BASE_URL}/analyze`, {
      text: formData.informationText
    });

    const { niveau, scoreSource, scoreAuteur, scoreCitations, scoreLangage, scoreContradiction } = response.data;

    return {
      informationText: formData.informationText,
      reliability: niveau as 'Suspecte' | 'Douteuse' | 'Crédible',
      globalScore: Math.round((scoreSource + scoreAuteur + scoreCitations + scoreLangage + scoreContradiction) / 5),
      criteria: {
        scoreSource,
        scoreAuteur,
        scoreCitations,
        scoreLangage,
        scoreContradiction,
      }
    };
};

export const addInformation = async (formData: {
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
}): Promise<EvaluationResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add-info`, formData);
    
    const { niveau, scoreSource, scoreAuteur, scoreCitations, scoreLangage, scoreContradiction } = response.data.resultat;
    
    return {
      informationText: formData.description,
      reliability: niveau as 'Suspecte' | 'Douteuse' | 'Crédible',
      globalScore: Math.round((scoreSource + scoreAuteur + scoreCitations + scoreLangage + scoreContradiction) / 5),
      criteria: {
        scoreSource,
        scoreAuteur,
        scoreCitations,
        scoreLangage,
        scoreContradiction,
      }
    };
  } catch (error) {
    console.error('Error adding information:', error);
    throw error;
  }
};