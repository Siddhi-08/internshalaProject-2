import React, { useState } from 'react';
import './JobApplicationForm.css';

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: [],
        preferredInterviewTime: '',
    });

    const [errors, setErrors] = useState({});
    const [showSummary, setShowSummary] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            let newSkills = [...formData.additionalSkills];
            if (checked) {
                newSkills.push(value);
            } else {
                newSkills = newSkills.filter((skill) => skill !== value);
            }
            setFormData({
                ...formData,
                additionalSkills: newSkills,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName) tempErrors.fullName = 'Full Name is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone Number is required';
        if (['Developer', 'Designer'].includes(formData.position) && !formData.relevantExperience) tempErrors.relevantExperience = 'Relevant Experience is required';
        if (formData.position === 'Designer' && !formData.portfolioUrl) tempErrors.portfolioUrl = 'Portfolio URL is required';
        if (formData.position === 'Manager' && !formData.managementExperience) tempErrors.managementExperience = 'Management Experience is required';
        if (formData.additionalSkills.length === 0) tempErrors.additionalSkills = 'At least one skill must be selected';
        if (!formData.preferredInterviewTime) tempErrors.preferredInterviewTime = 'Preferred Interview Time is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowSummary(true);
        }
    };

    return (
        <div className="form-container">
            <h1>Job Application Form</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    {errors.fullName && <div className="error">{errors.fullName}</div>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                </div>
                <div className="form-group">
                    <label>Applying for Position:</label>
                    <select name="position" value={formData.position} onChange={handleChange}>
                        <option value="">Select Position</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                {['Developer', 'Designer'].includes(formData.position) && (
                    <div className="form-group">
                        <label>Relevant Experience:</label>
                        <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
                        {errors.relevantExperience && <div className="error">{errors.relevantExperience}</div>}
                    </div>
                )}
                {formData.position === 'Designer' && (
                    <div className="form-group">
                        <label>Portfolio URL:</label>
                        <input type="text" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
                        {errors.portfolioUrl && <div className="error">{errors.portfolioUrl}</div>}
                    </div>
                )}
                {formData.position === 'Manager' && (
                    <div className="form-group">
                        <label>Management Experience:</label>
                        <input type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
                        {errors.managementExperience && <div className="error">{errors.managementExperience}</div>}
                    </div>
                )}
                <div className="form-group">
                    <label>Additional Skills:</label>
                    <label><input type="checkbox" name="additionalSkills" value="JavaScript" onChange={handleChange} /> JavaScript</label>
                    <label><input type="checkbox" name="additionalSkills" value="CSS" onChange={handleChange} /> CSS</label>
                    <label><input type="checkbox" name="additionalSkills" value="Python" onChange={handleChange} /> Python</label>
                    {errors.additionalSkills && <div className="error">{errors.additionalSkills}</div>}
                </div>
                <div className="form-group">
                    <label>Preferred Interview Time:</label>
                    <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} />
                    {errors.preferredInterviewTime && <div className="error">{errors.preferredInterviewTime}</div>}
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>

            {showSummary && (
                <div className="summary">
                    <h2>Form Summary</h2>
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
                    <p><strong>Position:</strong> {formData.position}</p>
                    {['Developer', 'Designer'].includes(formData.position) && <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>}
                    {formData.position === 'Designer' && <p><strong>Portfolio URL:</strong> {formData.portfolioUrl}</p>}
                    {formData.position === 'Manager' && <p><strong>Management Experience:</strong> {formData.managementExperience}</p>}
                    <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
                    <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
                </div>
            )}
        </div>
    );
};

export default JobApplicationForm;
