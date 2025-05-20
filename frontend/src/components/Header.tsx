import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-blue-500" />
          <span className="font-bold text-xl hidden sm:inline">Système Expert</span>
        </Link>
        
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link 
                to="/" 
                className={`font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-blue-500'
                }`}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link 
                to="/evaluation" 
                className={`font-medium transition-colors ${
                  location.pathname === '/evaluation' 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-blue-500'
                }`}
              >
                Évaluation
              </Link>
            </li>
            <li>
              <Link 
                to="/add-knowledge" 
                className={`font-medium transition-colors ${
                  location.pathname === '/add-knowledge' 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-blue-500'
                }`}
              >
                Ajouter
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;