import React, { useState, useEffect } from 'react';
import './SurveyForm.css'; // Import the CSS file

const SurveyForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteProgrammingLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: '',
    });

    const [additionalQuestions, setAdditionalQuestions] = useState([]);
    const [errors, setErrors] = useState({});
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        if (formData.surveyTopic) {
            // Fetch additional questions based on the survey topic
            fetch(`https://api.example.com/questions?topic=${formData.surveyTopic}`)
                .then((response) => response.json())
                .then((data) => setAdditionalQuestions(data))
                .catch((error) => console.error('Error fetching additional questions:', error));
        }
    }, [formData.surveyTopic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName) tempErrors.fullName = 'Full Name is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.surveyTopic) tempErrors.surveyTopic = 'Survey Topic is required';
        if (formData.surveyTopic === 'Technology' && !formData.favoriteProgrammingLanguage) tempErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
        if (formData.surveyTopic === 'Technology' && !formData.yearsOfExperience) tempErrors.yearsOfExperience = 'Years of Experience is required';
        if (formData.surveyTopic === 'Health' && !formData.exerciseFrequency) tempErrors.exerciseFrequency = 'Exercise Frequency is required';
        if (formData.surveyTopic === 'Health' && !formData.dietPreference) tempErrors.dietPreference = 'Diet Preference is required';
        if (formData.surveyTopic === 'Education' && !formData.highestQualification) tempErrors.highestQualification = 'Highest Qualification is required';
        if (formData.surveyTopic === 'Education' && !formData.fieldOfStudy) tempErrors.fieldOfStudy = 'Field of Study is required';
        if (!formData.feedback || formData.feedback.length < 50) tempErrors.feedback = 'Feedback must be at least 50 characters';
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
        <div className="survey-form-container">
            <h1>Survey Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    {errors.fullName && <div className="error">{errors.fullName}</div>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div>
                    <label>Survey Topic:</label>
                    <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
                        <option value="">Select Topic</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                    </select>
                    {errors.surveyTopic && <div className="error">{errors.surveyTopic}</div>}
                </div>
                {formData.surveyTopic === 'Technology' && (
                    <div>
                        <label>Favorite Programming Language:</label>
                        <select name="favoriteProgrammingLanguage" value={formData.favoriteProgrammingLanguage} onChange={handleChange}>
                            <option value="">Select Language</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="C#">C#</option>
                        </select>
                        {errors.favoriteProgrammingLanguage && <div className="error">{errors.favoriteProgrammingLanguage}</div>}
                    </div>
                )}
                {formData.surveyTopic === 'Technology' && (
                    <div>
                        <label>Years of Experience:</label>
                        <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
                        {errors.yearsOfExperience && <div className="error">{errors.yearsOfExperience}</div>}
                    </div>
                )}
                {formData.surveyTopic === 'Health' && (
                    <div>
                        <label>Exercise Frequency:</label>
                        <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange}>
                            <option value="">Select Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Rarely">Rarely</option>
                        </select>
                        {errors.exerciseFrequency && <div className="error">{errors.exerciseFrequency}</div>}
                    </div>
                )}
                {formData.surveyTopic === 'Health' && (
                    <div>
                        <label>Diet Preference:</label>
                        <select name="dietPreference" value={formData.dietPreference} onChange={handleChange}>
                            <option value="">Select Diet</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                        </select>
                        {errors.dietPreference && <div className="error">{errors.dietPreference}</div>}
                    </div>
                )}
                {formData.surveyTopic === 'Education' && (
                    <div>
                        <label>Highest Qualification:</label>
                        <input type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} />
                        {errors.highestQualification && <div className="error">{errors.highestQualification}</div>}
                    </div>
                )}
                {formData.surveyTopic === 'Education' && (
                    <div>
                        <label>Field of Study:</label>
                        <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                        {errors.fieldOfStudy && <div className="error">{errors.fieldOfStudy}</div>}
                    </div>
                )}
                <div>
                    <label>Feedback:</label>
                    <textarea name="feedback" value={formData.feedback} onChange={handleChange}></textarea>
                    {errors.feedback && <div className="error">{errors.feedback}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
            {showSummary && (
                <div className="survey-summary">
                    <h2>Survey Summary</h2>
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>
                    {formData.surveyTopic === 'Technology' && (
                        <>
                            <p><strong>Favorite Programming Language:</strong> {formData.favoriteProgrammingLanguage}</p>
                            <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
                        </>
                    )}
                    {formData.surveyTopic === 'Health' && (
                        <>
                            <p><strong>Exercise Frequency:</strong> {formData.exerciseFrequency}</p>
                            <p><strong>Diet Preference:</strong> {formData.dietPreference}</p>
                        </>
                    )}
                    {formData.surveyTopic === 'Education' && (
                        <>
                            <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
                            <p><strong>Field of Study:</strong> {formData.fieldOfStudy}</p>
                        </>
                    )}
                    <p><strong>Feedback:</strong> {formData.feedback}</p>
                </div>
            )}
        </div>
    );
};

export default SurveyForm;
