import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import '../styles/Students.css';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      if (Array.isArray(response.data.students)) {
        const updatedStudents = response.data.students.map(student => ({
          ...student,
          id: student._id.toString()
        }));
        setStudents(updatedStudents);
      } else {
        console.error('Unexpected API response format:', response.data);
        setError('Unexpected API response format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Error deleting student');
    }
  };

  return (
    <div className="students-container">
      <h2>Students:</h2>
      <button onClick={() => setShowAddStudent(true)}>Add New</button>
      {showAddStudent && <button onClick={() => setShowAddStudent(false)}>Cancel</button>}
      {showAddStudent && <AddStudent onSuccess={() => { setShowAddStudent(false); fetchStudents(); }} />}
      {showEditStudent && <button onClick={() => setShowEditStudent(false)}>Cancel</button>}
      {showEditStudent && <EditStudent onSuccess={() => { setShowEditStudent(false); setSelectedStudent(null); fetchStudents(); }} studentData={selectedStudent} />}
      <ul className="students-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <li>
              <strong>ID:</strong> {student.id}<br />
              <strong>Name:</strong> {student.name}<br />
              <strong>Date of Birth:</strong> {student.dob}<br />
              <strong>Class:</strong> {student.enrolledClass ? student.enrolledClass.name : "NA"}<br />
              <strong>Gender:</strong> {student.gender}<br />
              <strong>Contact:</strong> {student.contact}<br />
              <strong>Fees Paid:</strong> {student.feesPaid ? student.feesPaid : "NA"}<br />
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
              <button onClick={() => { setSelectedStudent(student); setShowEditStudent(true); }}>Edit</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ViewStudents;
