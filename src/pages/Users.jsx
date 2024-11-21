import React, { useState, useEffect } from "react";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = (page = 1) => {
        fetch(`http://127.0.0.1:5000/users?page=${page}&per_page=5`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data.users);
                setTotalPages(data.pages);
                setError(null); // Clear any previous error
            })
            .catch((error) => setError('Fetch error: ' + error.message));
    };

    const deleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter((user) => user.id !== userId));
                setMessage('User deleted successfully');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to delete user');
            }
        } catch (error) {
            setError('An error occurred while deleting the user');
        }
    };

    const handleCreateAdmin = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role: 'admin'
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to create admin user');
            }
            return response.json();
        })
        .then(() => {
            setMessage('Admin user created successfully!');
            fetchUsers(currentPage); // Refresh user table
            setName('');
            setEmail('');
            setPassword('');
            setError(null); // Clear any previous error
        })
        .catch((error) => {
            setError('Error creating admin user: ' + error.message);
        });
    };

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Create Admin User</h1>
          <form onSubmit={handleCreateAdmin} className="mb-6 p-4 border rounded shadow-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            >
              Create Admin
            </button>
          </form>
    
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
    
          <h1 className="text-2xl font-bold mb-4">User Table</h1>
          <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-600">{user.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{user.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{user.role}</td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
    
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      );
    };

export default UserTable;
