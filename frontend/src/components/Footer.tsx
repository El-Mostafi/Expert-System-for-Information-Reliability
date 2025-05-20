import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-slate-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Système Expert pour l'Évaluation</h3>
            <p className="text-sm text-slate-400">Raisonnement Logique et Programmation en Prolog</p>
          </div>
          
          <div className="text-sm">
            &copy; {year} Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;