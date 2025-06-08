import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Category from './pages/Category';
import Admin from './pages/AdminPanel';
import Footer from './components/Footer';
import Guest from './pages/Guest';
import Generate from './pages/Generate';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-teal-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">AmanaMeal Dashboard</h1>
      </header>

      <main className="flex-grow p-4">
        <AuthProvider>
          <AdminProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/category/:categoryName/:subCategoryName" element={<Category />} />

              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />

              <Route path="/guest" element={<Guest />} />
              <Route path="/generate" element={<Generate />} />
              {/* Add more routes as needed */}
            </Routes>
          </AdminProvider>
        </AuthProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
