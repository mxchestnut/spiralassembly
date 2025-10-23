
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import CirclePartnerPage from '@/pages/CirclePartnerPage';
import AdminPage from '@/pages/AdminPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import MembersDashboardPage from '@/pages/MembersDashboardPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/circle/:partner" element={<CirclePartnerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        <Route 
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } 
        />

        <Route 
          path="/members-dashboard"
          element={
            <ProtectedRoute>
              <MembersDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
