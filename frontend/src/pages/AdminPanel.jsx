import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function Admin() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { showGenerateButton, setShowGenerateButton } = useAdmin();

  // CRUD states
  const [meals, setMeals] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('meals');

  // Meals state
  const [newMeal, setNewMeal] = useState({ name: '', description: '', price: '' });
  const [editingMealIndex, setEditingMealIndex] = useState(null);

  // Users state
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUserIndex, setEditingUserIndex] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  // --- Meal Handlers ---
  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.price) return;
    setMeals([...meals, { ...newMeal, id: Date.now() }]);
    setNewMeal({ name: '', description: '', price: '' });
  };

  const handleEditMeal = (index) => {
    setEditingMealIndex(index);
    setNewMeal(meals[index]);
  };

  const handleUpdateMeal = () => {
    const updated = [...meals];
    updated[editingMealIndex] = { ...newMeal };
    setMeals(updated);
    setNewMeal({ name: '', description: '', price: '' });
    setEditingMealIndex(null);
  };

  const handleDeleteMeal = (id) => {
    setMeals(meals.filter((m) => m.id !== id));
  };

  // --- User Handlers ---
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: '', email: '' });
  };

  const handleEditUser = (index) => {
    setEditingUserIndex(index);
    setNewUser(users[index]);
  };

  const handleUpdateUser = () => {
    const updated = [...users];
    updated[editingUserIndex] = { ...newUser };
    setUsers(updated);
    setNewUser({ name: '', email: '' });
    setEditingUserIndex(null);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Logout */}
      <button
        onClick={() => {
          logout();
          navigate('/');
        }}
        className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
      >
        Logout
      </button>

      {/* Back */}
      <button
        onClick={() => navigate('/')}
        className="text-blue-600 underline mb-4 block"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold text-center mb-4">Admin Panel</h2>

      {/* QR Toggle */}
      <div className="text-center bg-gray-100 p-4 rounded shadow mb-6">
        <p className="font-semibold mb-2">QR Code Button Visibility:</p>
        <button
          onClick={() => setShowGenerateButton(!showGenerateButton)}
          className={`px-4 py-2 rounded font-semibold ${
            showGenerateButton ? 'bg-red-600' : 'bg-green-600'
          } text-white`}
        >
          {showGenerateButton ? 'Hide Generate Button' : 'Show Generate Button'}
        </button>
      </div>

      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setTab('meals')}
          className={`px-4 py-2 rounded ${
            tab === 'meals' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Manage Meals
        </button>
        <button
          onClick={() => setTab('users')}
          className={`px-4 py-2 rounded ${
            tab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Manage Users
        </button>
      </div>

      {/* Meals Section */}
      {tab === 'meals' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Meal CRUD</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Meal name"
              className="border p-2 mr-2 mb-2"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="border p-2 mr-2 mb-2"
              value={newMeal.description}
              onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 mr-2 mb-2"
              value={newMeal.price}
              onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
            />
            {editingMealIndex === null ? (
              <button onClick={handleAddMeal} className="bg-green-600 text-white px-4 py-2 rounded">
                Add Meal
              </button>
            ) : (
              <button onClick={handleUpdateMeal} className="bg-blue-600 text-white px-4 py-2 rounded">
                Update Meal
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {meals.map((meal, i) => (
              <li key={meal.id} className="border p-3 flex justify-between">
                <div>
                  <strong>{meal.name}</strong> - ${meal.price}
                  <p className="text-sm text-gray-600">{meal.description}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEditMeal(i)} className="bg-yellow-400 px-3 py-1 text-white rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteMeal(meal.id)} className="bg-red-600 px-3 py-1 text-white rounded">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Users Section */}
      {tab === 'users' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">User CRUD</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="User name"
              className="border p-2 mr-2 mb-2"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="User email"
              className="border p-2 mr-2 mb-2"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            {editingUserIndex === null ? (
              <button onClick={handleAddUser} className="bg-green-600 text-white px-4 py-2 rounded">
                Add User
              </button>
            ) : (
              <button onClick={handleUpdateUser} className="bg-blue-600 text-white px-4 py-2 rounded">
                Update User
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {users.map((user, i) => (
              <li key={user.id} className="border p-3 flex justify-between">
                <div>
                  <strong>{user.name}</strong>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEditUser(i)} className="bg-yellow-400 px-3 py-1 text-white rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-600 px-3 py-1 text-white rounded">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
