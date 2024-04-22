import React, { useState, useEffect } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import './userList.css';
import { Toaster, toast } from 'sonner';

function UserList({ refresh }) {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://neurobuild-api.onrender.com/userList');
            if (!response.ok) {
                throw new Error('Failed to fetch user list');
            }
            const data = await response.json();
            setUserList(data.userList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user list:', error);
            setError('Failed to fetch user list');
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`https://neurobuild-api.onrender.com/deleteUser/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setUserList(userList.filter(user => user._id !== userId));
            fetchData()
            toast('User deleted successfully', { type: 'success' });
        } catch (error) {
            toast('Error while deleting user: ' + error.message, { type: 'error' });
        }
    };

    return (
        <div className="table-container">
            <h1 style={{ fontSize: '20px' }}>User List</h1>
            <Toaster position='top-center' />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.designation}</td>
                                <td>
                                    <CiCircleRemove className="edit" onClick={() => deleteUser(user._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserList;
