import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminView.css';

const API_URL = process.env.REACT_APP_API_URL;

function AdminView() {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/surveys`);
            // Add index as fallback ID if ID is missing
            const surveysWithIds = response.data.map((survey, index) => ({
                ...survey,
                id: survey.id || index + 1
            }));
            setSurveys(surveysWithIds);
        } catch (error) {
            alert('Failed to fetch surveys: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this survey?')) {
            try {
                await axios.delete(`${API_URL}/surveys/${id}`);
                setSurveys(surveys.filter(survey => survey.id !== id));
            } catch (error) {
                alert('Delete failed: ' + error.message);
            }
        }
    };


    return (
        <div className="admin-view">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage all survey submissions</p>
            </div>
            
            <div className="admin-container">
                {loading ? (
                    <div className="loading">Loading surveys...</div>
                ) : surveys.length === 0 ? (
                    <div className="no-data">No survey submissions found</div>
                ) : (
                    <div className="table-responsive">
                        <table className="surveys-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {surveys.map((survey, index) => (
                                    <tr key={index}>
                                        <td>{survey.id}</td>
                                        <td>{survey.firstName}</td>
                                        <td>{survey.lastName}</td>
                                        <td>{survey.email}</td>
                                        <td className="action-buttons">
                                            <Link to={`/edit/${survey.id}`} className="edit-btn">Edit</Link>
                                            <button onClick={() => handleDelete(survey.id)} className="delete-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminView;