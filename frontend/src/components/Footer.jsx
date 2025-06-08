// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} AmanaMeal. All rights reserved.</p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://github.com/MrDolph/amanameal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
          <a
            href="mailto:support@amanameal.com"
            className="hover:text-white"
          >
            Contact
          </a>
          <a
            href="/privacy-policy"
            className="hover:text-white"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
