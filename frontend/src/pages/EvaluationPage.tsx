import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Send, Loader } from "lucide-react";
import { evaluateInformation } from "../services/api";
import axios from "axios";

interface FormData {
  informationText: string;
}

const EvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    informationText: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData({ informationText: value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.informationText.trim()) {
      setError("Veuillez entrer le texte à évaluer");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const results = await evaluateInformation(formData);
      sessionStorage.setItem("evaluationResults", JSON.stringify(results));
      navigate("/results");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        setError(
        "Ces informations ne peuvent pas être évaluées. Veuillez essayer d'utiliser une autre Information."
      );
      } else {
        console.error("Unexpected error:", error);
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <Bot className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-center">
            Assistant d'Évaluation
          </h1>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-start gap-4">
              <Bot className="w-6 h-6 text-blue-500 mt-2" />
              <div className="flex-1">
                <p className="text-lg font-medium mb-4">
                  Bonjour ! Je suis votre assistant d'évaluation. Partagez le
                  texte que vous souhaitez analyser, et je vous aiderai à en
                  évaluer la fiabilité.
                </p>
                <textarea
                  name="informationText"
                  rows={6}
                  value={formData.informationText}
                  onChange={handleChange}
                  className={`form-input bg-white/80 resize-none ${
                    error ? "border-red-500" : "border-blue-200"
                  }`}
                  placeholder="Entrez votre texte ici..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary px-8"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Analyse en cours...
                </div>
              ) : (
                  <div className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    <span>Analyser</span>
                  </div>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EvaluationPage;
