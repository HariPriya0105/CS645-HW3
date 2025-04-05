import React, { useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditForm() {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);

    const fetchSurvey = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/surveys/${id}`);
            setFormData(response.data);
        } catch (error) {
            alert('Survey not found: ' + error.message);
        }
    }, [id]);  // Add id as dependency since it's used in the function

    useEffect(() => {
        fetchSurvey();
    }, [fetchSurvey]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/surveys/${id}`, formData);
            alert('Survey updated!');
        } catch (error) {
            alert('Update failed: ' + error.message);
        }
    };

    if (!formData) return <div className="content"><h1>Loading...</h1></div>;

    return (
        <div className="content">
            <h1>Edit Survey (ID: {id})</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label>First Name: <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required /></label>
                    <label>Last Name: <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required /></label>
                    <label>Street Address: <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required /></label>
                    <label>City: <input type="text" name="city" value={formData.city} onChange={handleChange} required /></label>
                    <label>State: <input type="text" name="state" value={formData.state} onChange={handleChange} required /></label>
                    <label>ZIP: <input type="text" name="zip" value={formData.zip} onChange={handleChange} required /></label>
                    <label>Telephone: <input type="tel" name="telephoneNumber" value={formData.telephoneNumber} onChange={handleChange} required /></label>
                    <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
                    <label>Date: <input type="date" name="dateOfSurvey" value={formData.dateOfSurvey} onChange={handleChange} required /></label>
                    <h3>What did you like most?</h3>
                    <select name="likedMost" value={formData.likedMost} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="students">Students</option>
                        <option value="location">Location</option>
                        <option value="campus">Campus</option>
                        <option value="atmosphere">Atmosphere</option>
                        <option value="dorm rooms">Dorm Rooms</option>
                        <option value="sports">Sports</option>
                    </select>
                    <h3>How did you hear about us?</h3>
                    <div className="radio-group">
                        {['friends', 'television', 'Internet', 'other'].map(option => (
                            <label key={option}>
                                <input type="radio" name="interestSource" value={option} checked={formData.interestSource === option} onChange={handleChange} /> {option}
                            </label>
                        ))}
                    </div>
                    <label>Recommend: 
                        <select name="recommendationLikelihood" value={formData.recommendationLikelihood} onChange={handleChange}>
                            <option value="Very Likely">Very Likely</option>
                            <option value="Likely">Likely</option>
                            <option value="Unlikely">Unlikely</option>
                        </select>
                    </label>
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