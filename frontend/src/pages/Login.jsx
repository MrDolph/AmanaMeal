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

  const success = login(email, password); // login returns true or false maybe

  if (success) {
    navigate('/admin');
  } else {
    alert('Invalid credentials');
  }
};


  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-semibold"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-blue-600 underline cursor-pointer">
          Forgot password?
        </p>
      </form>
    </div>
  );
}
