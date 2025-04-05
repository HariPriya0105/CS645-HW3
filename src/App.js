import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Removed `Router`
import StudentSurvey from './components/StudentSurvey';
import EditForm from './components/EditForm';
import AdminView from './components/AdminView';
import './App.css';

function App() {
    return (
        <div className="App">
            <nav>
                <Link to="/">Student Survey</Link> | <Link to="/admin">Admin View</Link> | <Link to="/edit/:id">Edit Form</Link>
            </nav>
            <Routes>
                <Route path="/" element={<StudentSurvey />} />
                <Route path="/edit/:id" element={<EditForm />} />
                <Route path="/admin" element={<AdminView />} />
            </Routes>
        </div>
    );
}

export default App;