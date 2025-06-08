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
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">User Management</h3>
      <table className="w-full text-left border rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 space-x-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
