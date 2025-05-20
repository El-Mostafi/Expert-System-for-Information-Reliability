import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TeamMember from '../components/TeamMember';

const teamMembers = [
  {
    id: 1,
    name: 'El Mostafi Mohamed',
    role: 'Full Stack Developer',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQEmoq9R1BFfUA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718210401544?e=1753315200&v=beta&t=seqFfGhPRwT_ncQA4_-Es8m80CJzEJr-pYjHvm4sxaU',
  },
  {
    id: 2,
    name: 'El Hasnaoui Mohamed',
    role: 'Full Stack Developer',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQHQy1z_XadoSw/profile-displayphoto-shrink_400_400/B4EZZagEZ4HkAg-/0/1745275081284?e=1753315200&v=beta&t=59aCH6EGm3OcxxMyQp36bUQioJQ5xPXatzkR8bk-1hE',
  },
  {
    id: 3,
    name: 'Lamrabet Oussama',
    role: 'Full Stack Developer',
    image: 'https://media.licdn.com/dms/image/v2/D4D35AQF4MFnAgY0Psw/profile-framedphoto-shrink_400_400/B4DZZAMBqaGkAg-/0/1744833616881?e=1748372400&v=beta&t=0JAG2Y-kK726c9ix019hRe0RNwtALKjtFlnzQCYOYp4',
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