import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const subCategories = {
  male: ['atfalkudham', 'ansarullah'],
  female: ['nasirat', 'lagina'],
  guest: [],
};

export default function Category() {
  const { categoryName, subCategoryName } = useParams();
  const navigate = useNavigate();

  const formatName = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const isValidCategory = Object.keys(subCategories).includes(categoryName?.toLowerCase());
  const isValidSubCategory =
    subCategoryName &&
    subCategories[categoryName.toLowerCase()]?.includes(subCategoryName.toLowerCase());

  if (!isValidCategory) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl font-semibold">
        Invalid category: <strong>{categoryName}</strong>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 mb-6 p-6 bg-white rounded shadow">
      {/* Back Button */}
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 italic font-bold m-4">
          ← Back
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        {formatName(categoryName)}{' '}
        {subCategoryName ? `→ ${formatName(subCategoryName)}` : ''}
      </h2>

      {/* Content based on category/subcategory */}
      {!subCategoryName ? (
        <div className="text-center">
          <p>Welcome to the <strong>{formatName(categoryName)}</strong> category page.</p>
          <p className="mt-2 text-gray-600">Select a subcategory or view meal data here.</p>
        </div>
      ) : isValidSubCategory ? (
        <div className="text-center">
          <p>Viewing subcategory: <strong>{formatName(subCategoryName)}</strong></p>
          <p className="mt-2 text-gray-600">Display detailed info or actions for this subcategory here.</p>
        </div>
      ) : (
        <div className="text-center text-red-500">
          Invalid subcategory: <strong>{subCategoryName}</strong>
        </div>
      )}
    </div>
  );
}
