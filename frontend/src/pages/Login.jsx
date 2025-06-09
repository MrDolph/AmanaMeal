import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-auto bg-gradient-to-br from-blue-100 via-white to-blue-200 px-5 sm: sm:y-0 md:mx-auto md:my-0 md:py-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-teal-700">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm">Please enter your credentials to login</p>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center text-teal-600 hover:text-teal-700 underline cursor-pointer transition">
          Forgot password?
        </p>
      </form>
    </div>
  );
}
