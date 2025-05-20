import axios from 'axios';
import { EvaluationResult } from '../pages/ResultsPage';

// This is a mock API function for demonstration purposes
// In a real application, this would connect to your backend
export const evaluateInformation = async (formData: any): Promise<EvaluationResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response based on the input data
  // In a real application, this would be the response from your Prolog-based expert system
  const scoreSource = formData.sourceUrl ? 80 : 30;
  const scoreAuteur = formData.hasAuthor ? 85 : 20;
  const scoreCitations = formData.hasCitations ? 90 : 25;
  const scoreLangage = formData.subjectiveLanguage ? 15 : 75;
  const scoreContradiction = formData.hasContradictions ? 10 : 80;
  
  // Calculate global score (average of all scores)
  const globalScore = Math.round(
    (scoreSource + scoreAuteur + scoreCitations + scoreLangage + scoreContradiction) / 5
  );
  
  // Determine reliability level based on global score
  let reliability: 'suspecte' | 'douteuse' | 'crédible';
  if (globalScore < 40) {
    reliability = 'suspecte';
  } else if (globalScore < 70) {
    reliability = 'douteuse';
  } else {
    reliability = 'crédible';
  }
  
  return {
    informationText: formData.informationText,
    reliability,
    globalScore,
    criteria: {
      scoreSource,
      scoreAuteur,
      scoreCitations,
      scoreLangage,
      scoreContradiction,
    },
  };
};

// When ready to connect to a real backend, use the function below:
/*
export const evaluateInformation = async (formData: any): Promise<EvaluationResult> => {
  try {
    const response = await axios.post('/api/evaluate', formData);
    return response.data;
  } catch (error) {
    console.error('Error evaluating information:', error);
    throw error;
  }
};
*/