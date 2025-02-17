import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTeacher from './AddTeacher';
import EditTeacher from './EditTeacher';
import "../styles/teachers.css"; // Import external CSS

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showEditTeacher, setShowEditTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('https://school-project-n93b.onrender.com/api/teachers');
      if (Array.isArray(response.data.teachers)) {
        const updatedTeachers = response.data.teachers.map(teacher => ({
          ...teacher,
          id: teacher._id.toString()
        }));
        setTeachers(updatedTeachers);
      } else {
        console.error('Unexpected API response format:', response.data);
        setError('Unexpected API response format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Error fetching teachers');
      setLoading(false);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`https://school-project-n93b.onrender.com/api/teacher/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
      setError('Error deleting teacher');
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddTeacherClick = () => setShowAddTeacher(true);
  const handleAddTeacherSuccess = () => {
    setShowAddTeacher(false);
    fetchTeachers();
  };
  
  const handleEditTeacherClick = (teacher) => {
    setSelectedTeacher({ ...teacher });
    setShowEditTeacher(true);
  };
  
  const handleEditTeacherSuccess = () => {
    setShowEditTeacher(false);
    setSelectedTeacher(null);
    fetchTeachers();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="teacher-container">
      <h2>Teachers:</h2>
      <button className="add-button" onClick={handleAddTeacherClick}>Add New</button>
      {showAddTeacher && <button className="cancel-button" onClick={() => setShowAddTeacher(false)}>Cancel</button>}
      {showAddTeacher && <AddTeacher onSuccess={handleAddTeacherSuccess} />}
      {showEditTeacher && <button className="cancel-button" onClick={() => setShowEditTeacher(false)}>Cancel</button>}
      {showEditTeacher && <EditTeacher onSuccess={handleEditTeacherSuccess} teacherData={selectedTeacher} />} 
      <ul className="teacher-list">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <li>
              <strong>ID:</strong> {teacher.id}<br />
              <strong>Name:</strong> {teacher.name}<br />
              <strong>Date of Birth:</strong> {teacher.dob}<br />
              <strong>Salary:</strong> {teacher.salary}<br />
              <strong>Gender:</strong> {teacher.gender}<br />
              <strong>Contact:</strong> {teacher.contact}<br />
              <strong>Assigned Class:</strong> {teacher.assignedClass ? teacher.assignedClass.name : "NA"}<br />
              <button className="delete-button" onClick={() => deleteTeacher(teacher.id)}>Delete</button>
              <button className="edit-button" onClick={() => handleEditTeacherClick(teacher)}>Edit</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ViewTeachers;
