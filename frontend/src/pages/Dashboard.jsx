import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
// import Calendar from '../components/Calendar';
// import GoogleCalendarEvents from '../components/GoogleCalendarEvents';


// const sampleEvents = [
//   { date: '2025-06-10', title: 'Staff Meeting' },
//   { date: '2025-06-15', title: 'PTA Day' },
// ];

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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 my-6 bg-white rounded-lg shadow-md relative">
      {/* Logout button top-right if authenticated */}
      {isAuthenticated && (
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-2 rounded shadow hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center"> Dashboard</h2>

      {/* Category buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
        <button
          onClick={() => navigate('/admin')}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 sm:py-3 rounded-md font-semibold w-full sm:w-auto"
        >
          Admin
        </button>

        {['male', 'female', 'guest'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:py-3 rounded-md font-semibold w-full sm:w-auto"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Subcategory display */}
      {showSubCategory && (
        <div className="mb-8 p-4 border rounded bg-gray-50">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
            {showSubCategory.charAt(0).toUpperCase() + showSubCategory.slice(1)} Subcategories
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {subCategories[showSubCategory].map((subcat) => (
              <button
                key={subcat}
                onClick={() =>
                  navigate(`/category/${showSubCategory}/${subcat.toLowerCase().replace(/\s+/g, '')}`)
                }
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
              >
                {subcat}
              </button>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              className="text-red-600 underline text-sm"
              onClick={() => setShowSubCategory(null)}
            >
              Close Subcategories
            </button>
          </div>
        </div>
      )}

      {/* Generate button */}
      {showGenerateButton && (
        <div className="flex justify-center mt-8">
          <Link
            to="/generate"
            className="inline-block text-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold w-full sm:w-auto"
          >
            Generate QR Code
          </Link>
        </div>
      )}
      {/* <GoogleCalendarEvents /> */}
       {/* <div className="p-4 mt-4">
          <h1 className="text-2xl text-center font-bold mb-4">Events Calendar</h1>
          <Calendar events={sampleEvents} />
    </div> */}
    </div>
  );
}
