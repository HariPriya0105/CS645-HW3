import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminView() {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            const response = await axios.get('http://localhost:8080/surveys');
            setSurveys(response.data);
        } catch (error) {
            alert('Failed to fetch surveys: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this survey?')) {
            try {
                await axios.delete(`http://localhost:8080/surveys/${id}`);
                setSurveys(surveys.filter(survey => survey.id !== id));
            } catch (error) {
                alert('Delete failed: ' + error.message);
            }
        }
    };

    return (
        <div className="content">
            <h1>Admin View</h1>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map(survey => (
                            <tr key={survey.id}>
                                <td>{survey.id}</td>
                                <td>{survey.firstName}</td>
                                <td>{survey.lastName}</td>
                                <td>{survey.email}</td>
                                <td>{survey.dateOfSurvey}</td>
                                <td>
                                    <Link to={`/edit/${survey.id}`} className="submit-btn">Edit</Link>
                                    <button onClick={() => handleDelete(survey.id)} className="cancel-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminView;