import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';

const subCategories = {
  male: ['Atfal Kudham', 'Ansarullah'],
  female: ['Nasirat', 'Lagina'],
  guest: [],
};

export default function Dashboard() {
  const { showGenerateButton } = useAdmin();
  const [showSubCategory, setShowSubCategory] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (subCategories[category].length > 0) {
      setShowSubCategory(category);
    } else {
      navigate(`/category/${category}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Logout button top-right if authenticated */}
      {isAuthenticated && (
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center">AmanaMeal Dashboard</h2>

      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => navigate('/admin')}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-md font-semibold"
        >
          Admin
        </button>

        {['male', 'female', 'guest'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-semibold"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {showSubCategory && (
        <div className="mb-8 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {showSubCategory.charAt(0).toUpperCase() + showSubCategory.slice(1)} Subcategories
          </h3>

          <div className="flex justify-center gap-4">
            {subCategories[showSubCategory].map((subcat) => (
              <button
                key={subcat}
                onClick={() =>
                  navigate(`/category/${showSubCategory}/${subcat.toLowerCase().replace(/\s+/g, '')}`)
                }
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
              >
                {subcat}
              </button>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              className="text-red-600 underline"
              onClick={() => setShowSubCategory(null)}
            >
              Close Subcategories
            </button>
          </div>
        </div>
      )}
      
      {showGenerateButton && (
        <div className="flex justify-center mt-8">
            <Link to="/generate" 
              className="inline-block text-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Generate QR Code
            </Link>
        </div>    
      )}
      

    </div>
  );
}
