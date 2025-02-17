import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/editclass.css';


const EditClass = ({ onSuccess, classData }) => {
    
  const classId = classData.id;
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (classData && Object.keys(classData).length > 0) {
      setEditData({
        name: classData.name || '',
        year: classData.year || '',
        studentFees: classData.studentFees || '',
      });
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.year || !editData.studentFees) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.put(`https://school-project-n93b.onrender.com/api/classes/${classId}`, editData);
      
      if (!response) {
        return;
      }
      setLoading(false);
      setEditData({ name: '', year: '', studentFees: '' });
      onSuccess();
      setShowForm(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <form className='edit-class-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              value={editData.name || ''}
              onChange={handleChange}
              placeholder='Class name..'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='year'>Year</label>
            <input
              id='year'
              type='number'
              value={editData.year || ''}
              onChange={handleChange}
              placeholder='Year..'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='studentFees'>Student Fees</label>
            <input
              id='studentFees'
              type='number'
              value={editData.studentFees || ''}
              onChange={handleChange}
              placeholder='Student fees..'
              required
            />
          </div>
          {errorMessage && <span className='error'>{errorMessage}</span>}
          <button className='submit-btn' type='submit' aria-label='Update Class' disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      )}
    </>
  );
};

export default EditClass;
