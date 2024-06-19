import React, { useState } from 'react';

const EventRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: 'No',
        guestName: '',
    });

    const [errors, setErrors] = useState({});
    const [showSummary, setShowSummary] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = 'Name is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.age) tempErrors.age = 'Age is required';
        else if (isNaN(formData.age) || formData.age <= 0) tempErrors.age = 'Age must be a positive number';
        if (formData.attendingWithGuest === 'Yes' && !formData.guestName) tempErrors.guestName = 'Guest Name is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowSummary(true);
        }
    };

    const formStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        background: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
    };

    const labelStyle = {
        fontWeight: 'bold',
    };

    const buttonStyle = {
        background: '#4CAF50',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '0.9em',
    };

    const summaryStyle = {
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        background: '#e9f7ef',
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Event Registration Form</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <label style={labelStyle}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                    {errors.name && <div style={errorStyle}>{errors.name}</div>}
                </div>
                <div>
                    <label style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                </div>
                <div>
                    <label style={labelStyle}>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                    {errors.age && <div style={errorStyle}>{errors.age}</div>}
                </div>
                <div>
                    <label style={labelStyle}>Are you attending with a guest?</label>
                    <select
                        name="attendingWithGuest"
                        value={formData.attendingWithGuest}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                {formData.attendingWithGuest === 'Yes' && (
                    <div>
                        <label style={labelStyle}>Guest Name:</label>
                        <input
                            type="text"
                            name="guestName"
                            value={formData.guestName}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                        {errors.guestName && <div style={errorStyle}>{errors.guestName}</div>}
                    </div>
                )}
                <button type="submit" style={buttonStyle}>Submit</button>
            </form>

            {showSummary && (
                <div style={summaryStyle}>
                    <h2>Form Summary</h2>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Age:</strong> {formData.age}</p>
                    <p><strong>Attending with Guest:</strong> {formData.attendingWithGuest}</p>
                    {formData.attendingWithGuest === 'Yes' && (
                        <p><strong>Guest Name:</strong> {formData.guestName}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventRegistrationForm;
