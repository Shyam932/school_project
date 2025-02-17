import React, { useState } from 'react';
import axios from 'axios';
import '../styles/editteacher.css'; // Import CSS file

const EditTeacher = ({ onSuccess, teacherData }) => {
  const teacherId = teacherData._id;

  const [editData, setEditData] = useState({
    name: teacherData.name || '',
    gender: teacherData.gender || '',
    dob: teacherData.dob ? new Date(teacherData.dob).toISOString().slice(0, 10) : '',
    contact: teacherData.contact || '',
    salary: teacherData.salary || '',
    assignedClass: teacherData.assignedClass ? teacherData.assignedClass._id : ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.gender || !editData.dob || !editData.contact || !editData.salary) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.put(`http://localhost:5000/api/teachers/${teacherId}`, editData);
      if (!response) {
        throw new Error('Update failed.');
      }
      setLoading(false);
      setEditData({ name: '', gender: '', dob: '', contact: '', salary: '', assignedClass: '' });
      onSuccess();
      setShowForm(false);
    } catch (error) {
      console.error('Error updating teacher:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <form className='edit-teacher-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' value={editData.name} onChange={handleChange} placeholder='Teacher name..' required />
          </div>
          <div className='form-group'>
            <label htmlFor='gender'>Gender</label>
            <input id='gender' type='text' value={editData.gender} onChange={handleChange} placeholder='Teacher gender..' required />
          </div>
          <div className='form-group'>
            <label htmlFor='dob'>Date of Birth</label>
            <input id='dob' type='date' value={editData.dob} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label htmlFor='contact'>Contact</label>
            <input id='contact' type='tel' value={editData.contact} onChange={handleChange} placeholder='Teacher contact number..' required />
          </div>
          <div className='form-group'>
            <label htmlFor='salary'>Salary</label>
            <input id='salary' type='number' value={editData.salary} onChange={handleChange} placeholder='Teacher salary..' required />
          </div>
          <div className='form-group'>
            <label htmlFor='assignedClass'>Assigned Class Id</label>
            <input id='assignedClass' type='text' value={editData.assignedClass} onChange={handleChange} placeholder='Assigned Class Id' />
          </div>
          {errorMessage && <span className='error'>{errorMessage}</span>}
          <button className='submit-btn' type='submit' disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      )}
    </>
  );
};

export default EditTeacher;
