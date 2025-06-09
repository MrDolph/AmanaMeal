// src/pages/Guest.jsx
import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Guest() {
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    // Navigate to the Generate QR code page or show a form
    navigate('/generate');
  };

  return (
    <div className="min-h-screen my-4 flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Guest Category</h1>
      <p className="mb-8 text-center max-w-md text-gray-600">
        Welcome, Guest! You can generate your meal claim QR code here.
        Please ensure your information is accurate.
      </p>

      <Button variant="success" size="lg" onClick={handleGenerateClick}>
        Generate QR Code
      </Button>
    </div>
  );
}
