import React, { useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditForm.css';

const API_URL = process.env.REACT_APP_API_URL;

function EditForm() {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);

    const fetchSurvey = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/surveys/${id}`);
            setFormData(response.data);
        } catch (error) {
            alert('Survey not found: ' + error.message);
        }
    }, [id]);

    useEffect(() => {
        fetchSurvey();
    }, [fetchSurvey]); 

    // Helper function to ensure we use the first value from arrays
    // or just use the value if it's not an array
    const getSafeValue = (value) => {
        if (Array.isArray(value) && value.length > 0) {
            return value[0];
        }
        return value;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a proper payload matching the backend's expectations
            const dataToSend = {
                ...formData,
                // Ensure field names match exactly what's in the backend model
                dateofSurvey: formData.dateOfSurvey || formData.dateofSurvey,
                // Send single values instead of arrays
                likedMost: formData.likedMost,
                interestSource: formData.interestSource,
                recommendationLikelihood: formData.recommendationLikelihood
            };
            
            console.log('Sending data to server:', dataToSend);
            await axios.put(`${API_URL}/surveys/${id}`, dataToSend);
            alert('Survey updated!');
        } catch (error) {
            console.error('Error details:', error.response?.data);
            alert('Update failed: ' + error.message);
        }
    };

    if (!formData) return <div className="content"><h1>Loading...</h1></div>;

    // Extract values safely from possibly array fields
    const formattedData = {
        ...formData,
        likedMost: getSafeValue(formData.likedMost),
        interestSource: getSafeValue(formData.interestSource),
        recommendationLikelihood: getSafeValue(formData.recommendationLikelihood)
    };

    return (
        <div className="content">
            <h1>Edit Survey (ID: {id})</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2>Personal Information</h2>
                        <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} required />
                        <input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} required />
                        <input type="text" name="streetAddress" value={formData.streetAddress} placeholder="Street Address" onChange={handleChange} required />
                        <input type="text" name="city" value={formData.city} placeholder="City" onChange={handleChange} required />
                        <input type="text" name="state" value={formData.state} placeholder="State" onChange={handleChange} required />
                        <input type="text" name="zip" value={formData.zip} placeholder="ZIP" onChange={handleChange} required />
                        <input type="tel" name="telephoneNumber" value={formData.telephoneNumber} placeholder="Telephone" onChange={handleChange} required />
                        <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
                        <input type="date" name="dateofSurvey" value={formData.dateofSurvey || formData.dateOfSurvey} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <h2>Survey Questions</h2>
                        <label>What did you like most?</label>
                        <select name="likedMost" value={formattedData.likedMost} onChange={handleChange} required>
                            <option value="">Select an option</option>
                            <option value="students">Students</option>
                            <option value="location">Location</option>
                            <option value="campus">Campus</option>
                            <option value="atmosphere">Atmosphere</option>
                            <option value="dorm rooms">Dorm Rooms</option>
                            <option value="sports">Sports</option>
                        </select>

                        <label>How did you hear about us?</label>
                        <div className="radio-group">
                            {['friends', 'television', 'Internet', 'other'].map(option => (
                                <label key={option}>
                                    <input 
                                        type="radio" 
                                        name="interestSource" 
                                        value={option} 
                                        checked={formattedData.interestSource === option} 
                                        onChange={handleChange} 
                                    /> 
                                    {option}
                                </label>
                            ))}
                        </div>

                        <label>Would you recommend us?</label>
                        <select name="recommendationLikelihood" value={formattedData.recommendationLikelihood} onChange={handleChange}>
                            <option value="Very Likely">Very Likely</option>
                            <option value="Likely">Likely</option>
                            <option value="Unlikely">Unlikely</option>
                        </select>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="submit-btn">Update</button>
                        <button type="button" className="cancel-btn" onClick={() => window.location.href = '/admin'}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditForm;