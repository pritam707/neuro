import React, { useState } from 'react';
import './userForm.css';
import { Toaster, toast } from 'sonner';

function UserForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        designation: '',
        email: '',
        gender: '',
        mobile: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.name === '' || formData.email === '' || formData.age === '' || formData.designation === '' || formData.gender === '' || formData.mobile === '') {
            toast('Please fill in all fields', { type: 'warning' });
            return;
        }

        if (!isValidEmail(formData.email)) {
            toast('Invalid email format', { type: 'error' });
            return;
        }

        if (!isValidMobile(formData.mobile)) {
            toast('Invalid mobile number format', { type: 'error' });
            return;
        }

        try {
            const response = await fetch('https://neurobuild-api.onrender.com/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    age: formData.age,
                    gender: formData.gender,
                    designation: formData.designation,
                    mobile: formData.mobile
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            setFormData({
                name: '',
                age: '',
                designation: '',
                email: '',
                gender: '',
                mobile: ''
            });
            onSubmit();
            toast('User added successfully', { type: 'success' });
        } catch (error) {
            toast('Error adding user: ' + error.message, { type: 'error' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidMobile = (mobile) => {
        return /^[0-9]{10}$/.test(mobile);
    };

    return (
        <div className="user-form-container">
            <h1 >User Form</h1>
            <Toaster position='top-center' />
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" autoFocus={true} value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label htmlFor="mobile">Mobile No:</label>
                    <input type="number" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label htmlFor="designation">Designation:</label>
                    <select id="designation" name="designation" value={formData.designation} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="FE Developer">FE Developer</option>
                        <option value="BE Developer">BE Developer</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Dev Ops">Dev Ops</option>
                    </select>
                </div>
                <div className="form-row">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserForm;
