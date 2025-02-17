import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Info from './pages/Info';
import Analytics from './pages/Analytics';
import ViewTeachers from './pages/ViewTeachers';
import ViewStudents from './pages/ViewStudents';
import ViewClasses from './pages/ViewClasses';
import './App.css'; 
import ClassDetails from './components/ClassDetails';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="container">
          <div className="nav-links">
            <Link to="/dashboard" className="nav-button home">Home</Link>
            <Link to="/classes/view" className="nav-button classes">Classes</Link>
            <Link to="/students/view" className="nav-button student">Student</Link>
            <Link to="/teachers/view" className="nav-button teacher">Teacher</Link>
            <Link to="/analytics" className="nav-button analytics">Analytics</Link>
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/teachers/view" element={<ViewTeachers />} />
            <Route path="/students/view" element={<ViewStudents />} />
            <Route path="/classes/view" element={<ViewClasses />} />
            <Route path="/dashboard" element={<Info />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/class/:id" element={<ClassDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
