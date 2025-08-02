import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ContractorVerification from './components/ContractorVerification';
import AdminPanel from './components/AdminPanel';
import LandingPage from './components/LandingPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={user ? <><Navbar /><main className="pt-16"><Dashboard /></main></> : <Navigate to="/login" />} />
      <Route
        path="/verification"
        element={user ? <><Navbar /><main className="pt-16"><ContractorVerification /></main></> : <Navigate to="/login" />} />
      <Route
        path="/admin"
        element={user ? <><Navbar /><main className="pt-16"><AdminPanel /></main></> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;