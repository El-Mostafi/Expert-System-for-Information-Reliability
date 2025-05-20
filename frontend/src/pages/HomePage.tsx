import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TeamMember from '../components/TeamMember';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Marie Dupont',
    role: 'Experte en IA',
    image: 'https://images.pexels.com/photos/3746314/pexels-photo-3746314.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Prof. Thomas Martin',
    role: 'Spécialiste Prolog',
    image: 'https://images.pexels.com/photos/5794945/pexels-photo-5794945.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Ing. Sophie Leclerc',
    role: 'Analyste de Données',
    image: 'https://images.pexels.com/photos/5715529/pexels-photo-5715529.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartEvaluation = () => {
    navigate('/evaluation');
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Système Expert pour l'Évaluation de la Fiabilité des Informations en Ligne
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            via Raisonnement Logique et Programmation en Prolog
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg py-3 px-8"
            onClick={handleStartEvaluation}
          >
            Commencer l'évaluation
          </motion.button>
        </motion.div>
      </section>
      
      <section className="mb-16">
        <h2 className="section-title text-center mb-10">Notre Équipe</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TeamMember member={member} />
            </motion.div>
          ))}
        </div>
      </section>
      
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="section-title mb-6">Comment ça fonctionne</h2>
        <p className="text-slate-600 mb-8">
          Notre système expert utilise des algorithmes basés sur la logique formelle et la programmation en Prolog
          pour analyser la fiabilité des informations en ligne selon plusieurs critères critiques.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          onClick={handleStartEvaluation}
        >
          Commencer l'évaluation
        </motion.button>
      </section>
    </div>
  );
};

export default HomePage;