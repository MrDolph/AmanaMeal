// src/context/AdminContext.jsx
import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [showGenerateButton, setShowGenerateButton] = useState(true);

  return (
    <AdminContext.Provider value={{ showGenerateButton, setShowGenerateButton }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
