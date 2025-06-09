import { useState } from 'react';

const dummyUsers = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'editor' },
  { id: 2, name: 'John Smith', email: 'john@example.com', role: 'viewer' },
];

export default function UsersTable() {
  const [users, setUsers] = useState(dummyUsers);

  const deleteUser = (id) => {
    const confirmDelete = window.confirm('Delete this user?');
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="mt-8 max-w-full px-2">
      <h3 className="text-lg font-semibold mb-4 text-center md:text-left">User Management</h3>

      {/* Scroll container for small screens */}
      <div className="overflow-x-auto">
        {/* Table for medium+ screens */}
        <table className="min-w-full border rounded shadow hidden md:table">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 space-x-4">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Card/list layout for small screens */}
        <div className="space-y-4 md:hidden">
          {users.map(user => (
            <div
              key={user.id}
              className="border rounded shadow p-4 space-y-2 bg-white"
              role="group"
              aria-label={`User ${user.name}`}
            >
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
