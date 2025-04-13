import React, { useState } from 'react';
import axios from 'axios';

function StudentSurvey() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        telephoneNumber: '',
        email: '',
        dateOfSurvey: '',
        likedMost: [],
        interestSource: [],
        recommendationLikelihood: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => {
                const currentValues = prev[name];
                if (checked) {
                    return { ...prev, [name]: [...currentValues, value] };
                } else {
                    return { ...prev, [name]: currentValues.filter(item => item !== value) };
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/surveys', formData);
            alert('Survey submitted!');
            setFormData({
                firstName: '',
                lastName: '',
                streetAddress: '',
                city: '',
                state: '',
                zip: '',
                telephoneNumber: '',
                email: '',
                dateOfSurvey: '',
                likedMost: [],
                interestSource: [],
                recommendationLikelihood: []
            });
        } catch (error) {
            alert('Submission failed: ' + error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
            telephoneNumber: '',
            email: '',
            dateOfSurvey: '',
            likedMost: [],
            interestSource: [],
            recommendationLikelihood: []
        });
    };

    return (
        <div className="content" style={{ marginTop: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Student Survey</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Street Address:</label>
                        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>City:</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>State:</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>ZIP:</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Telephone:</label>
                        <input type="tel" name="telephoneNumber" value={formData.telephoneNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Date:</label>
                        <input type="date" name="dateOfSurvey" value={formData.dateOfSurvey} onChange={handleChange} required />
                    </div>
                    
                    <h3 style={{ textAlign: 'left' }}>What did you like most?</h3>
                    <div className="checkbox-group" style={{ textAlign: 'left' }}>
                        {['students', 'location', 'campus', 'atmosphere', 'dorm rooms', 'sports'].map(option => (
                            <div className="checkbox-item" key={option}>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="likedMost" 
                                        value={option} 
                                        checked={formData.likedMost.includes(option)} 
                                        onChange={handleChange} 
                                    /> {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ textAlign: 'left' }}>How did you hear about us?</h3>
                    <div className="checkbox-group" style={{ textAlign: 'left' }}>
                        {['friends', 'television', 'Internet', 'other'].map(option => (
                            <div className="checkbox-item" key={option}>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="interestSource" 
                                        value={option} 
                                        checked={formData.interestSource.includes(option)} 
                                        onChange={handleChange} 
                                    /> {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ textAlign: 'left' }}>Recommendation Likelihood</h3>
                    <div className="checkbox-group" style={{ textAlign: 'left' }}>
                        {['Very Likely', 'Likely', 'Unlikely'].map(option => (
                            <div className="checkbox-item" key={option}>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="recommendationLikelihood" 
                                        value={option} 
                                        checked={formData.recommendationLikelihood.includes(option)} 
                                        onChange={handleChange} 
                                    /> {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="button-group">
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentSurvey;