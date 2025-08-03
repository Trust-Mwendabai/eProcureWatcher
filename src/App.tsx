import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ContractorVerification from './components/ContractorVerification';
import AdminPanel from './components/AdminPanel';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      {user ? (
        <>
          <Route path="/dashboard" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="lg:ml-64 p-4 lg:p-8">
                <Dashboard />
              </main>
            </div>
          } />
          <Route path="/verification" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="lg:ml-64 p-4 lg:p-8">
                <ContractorVerification />
              </main>
            </div>
          } />
          <Route path="/admin" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="lg:ml-64 p-4 lg:p-8">
                <AdminPanel />
              </main>
            </div>
          } />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
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