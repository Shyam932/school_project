import React, { useState } from 'react';
import axios from 'axios';
import '../styles/editstudents.css'; // Import CSS file

const EditStudent = ({ onSuccess, studentData }) => {
  const studentId = studentData._id;

  const [editData, setEditData] = useState({
    name: studentData.name || '',
    gender: studentData.gender || '',
    dob: studentData.dob ? new Date(studentData.dob).toISOString().slice(0, 10) : '',
    feesPaid: studentData.feesPaid || '',
    enrolledClass: studentData.enrolledClass ? studentData.enrolledClass._id : ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.gender || !editData.dob || !editData.feesPaid) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.put(`https://school-project-n93b.onrender.com/api/students/${studentId}`, editData);
      if (!response) {
        throw new Error('Update failed.');
      }
      setLoading(false);
      setEditData({ name: '', gender: '', dob: '', feesPaid: '', enrolledClass: '' });
      onSuccess();
      setShowForm(false);
    } catch (error) {
      console.error('Error updating student:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <form className='edit-student-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              value={editData.name}
              onChange={handleChange}
              placeholder='Student name..'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='gender'>Gender</label>
            <input
              id='gender'
              type='text'
              value={editData.gender}
              onChange={handleChange}
              placeholder='Student gender..'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='dob'>Date of Birth</label>
            <input
              id='dob'
              type='date'
              value={editData.dob}
              onChange={handleChange}
              placeholder='Student DOB..'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='enrolledClass'>Enrolled Class Id</label>
            <input
              id='enrolledClass'
              type='string'
              value={editData.enrolledClass}
              onChange={handleChange}
              placeholder='Class ID'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='feesPaid'>Fees Paid</label>
            <input
              id='feesPaid'
              type='number'
              value={editData.feesPaid}
              onChange={handleChange}
              placeholder='Fees paid..'
            />
          </div>
          {errorMessage && <span className='error'>{errorMessage}</span>}
          <button className='submit-btn' type='submit' aria-label='Update Student' disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      )}
    </>
  );
};

export default EditStudent;
