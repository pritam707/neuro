import React, { useEffect, useState } from 'react';
import './userCard.css'; // Import CSS for styling

const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9inRqaFfeNmYbm_Z_AwaICGOVqcRE-Of5Lw&usqp=CAU"

function UserCard({ user }) {
    return (
        <div className="user-card">

            <img src={image} alt='user' />
            <div className="user-details">
                <h3>Name: {user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Age: {user.age}</p>
                <p>Designation: {user.designation}</p>
                <p>Gender: {user.gender}</p>
                <p>Mobile: {user.mobile}</p>
            </div>
        </div>
    );
}

export default function UserCardPage({ refresh }) {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await fetch('https://neurobuild-api.onrender.com/userList');
                if (!response.ok) {
                    throw new Error('Failed to fetch user list');
                }
                const data = await response.json();
                setUserList(data.userList);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        fetchUserList();
    }, [refresh]);

    return (
        <div className="user-card-container">
            <h1 style={{ fontSize: "30px" }}>User Cards</h1>
            <div className="user-card-row">
                {userList.map((user, index) => (
                    <UserCard key={index} user={user} />
                ))}
            </div>
        </div>
    );
}
