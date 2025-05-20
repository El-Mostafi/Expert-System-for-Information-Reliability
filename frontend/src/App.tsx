import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EvaluationPage from './pages/EvaluationPage';
import ResultsPage from './pages/ResultsPage';
import AddKnowledgePage from './pages/AddKnowledgePage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evaluation" element={<EvaluationPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/add-knowledge" element={<AddKnowledgePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;