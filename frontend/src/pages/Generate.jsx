// src/pages/Generate.jsx
import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import Button from '../components/Button';

const categories = ['Admin', 'Male', 'Female', 'Guest'];
const maleSubCategories = ['Aftal Kudham', 'Ansarullah'];
const femaleSubCategories = ['Nasirat', 'Lagina'];

export default function Generate() {
  const [formData, setFormData] = useState({
    membershipNumber: '',
    name: '',
    category: '',
    subCategory: '',
  });

  const [error, setError] = useState('');
  const [qrData, setQrData] = useState(null);
  const [qrSize, setQrSize] = useState(256);

  const navigate = useNavigate();

  useEffect(() => {
    const updateQrSize = () => {
      const width = window.innerWidth;
      if (width < 640) setQrSize(180);
      else if (width < 768) setQrSize(220);
      else setQrSize(256);
    };

    updateQrSize();
    window.addEventListener('resize', updateQrSize);
    return () => window.removeEventListener('resize', updateQrSize);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear subCategory if category changes and it's no longer valid
    if (name === 'category') {
      setFormData((prev) => ({
        ...prev,
        category: value,
        subCategory: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const { membershipNumber, name, category } = formData;
    if (!membershipNumber.trim() || !name.trim() || !category) {
      setError('Please fill all required fields.');
      return false;
    }
    // Add more validation if needed (e.g., membership number unique check via API)
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build QR code data as JSON string (can be any format your backend expects)
    const qrPayload = {
      membershipNumber: formData.membershipNumber,
      name: formData.name,
      category: formData.category,
      subCategory: formData.subCategory || null,
      issuedAt: new Date().toISOString(),
    };

    setQrData(JSON.stringify(qrPayload));
  };
   
  return (
    <>
    <button
          onClick={() => navigate('/')}
          className="text-blue-600 underline m-4"
        >
          ← Back to Dashboard
      </button>
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6 pt-12">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Generate QR Code</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        noValidate
      >
        <label className="block mb-2 font-semibold text-gray-700" htmlFor="membershipNumber">
          Membership Number <span className="text-red-500">*</span>
        </label>
        <input
          id="membershipNumber"
          name="membershipNumber"
          type="text"
          value={formData.membershipNumber}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter membership number"
          autoComplete="off"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter full name"
          autoComplete="off"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="category">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Conditionally show sub-category select */}
        {(formData.category === 'Male' || formData.category === 'Female') && (
          <>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="subCategory">
              Sub Category
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select sub-category</option>
              {(formData.category === 'Male' ? maleSubCategories : femaleSubCategories).map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </>
        )}

        {error && 
          (<p className="text-red-600 mb-4" aria-live="assertive">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" size="md" disabled={!formData.membershipNumber.trim() || !formData.name.trim() || !formData.category}>
          Generate QR Code
        </Button>
      </form>

      {qrData && (
        <div className="mt-8 bg-white p-6 rounded shadow-md text-center w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Your QR Code</h2>
          <QRCodeCanvas value={qrData} size={qrSize} />
          <p className="mt-4 break-words text-sm text-gray-700">{qrData}</p>
          {/* You can add a print button here if you want */}
        </div>
      )}
    </div>
  </>
  );
}
