import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addclass.css'; // Import CSS file

const AddClass = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    studentFees: ''
  });

 

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.year || !formData.studentFees) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.post('https://school-project-n93b.onrender.com/api/classes', formData);
      if (response.data.success === false) {
        return setErrorMessage(response.data.message);
      }
      setLoading(false);
      setFormData({ name: '', year: '', studentFees: '' });
      onSuccess();
      setShowForm(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {showForm && (
        <form className='add-class-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' value={formData.name} onChange={handleChange} placeholder="Class name.." required />
          </div>
          <div className='form-group'>
            <label htmlFor='year'>Year</label>
            <input id='year' type='number' value={formData.year} onChange={handleChange} placeholder="Year.." required />
          </div>
          <div className='form-group'>
            <label htmlFor='studentFees'>Student Fees</label>
            <input id='studentFees' type='number' value={formData.studentFees} onChange={handleChange} placeholder="Student fees.." required />
          </div>
          {errorMessage && <span className="error">{errorMessage}</span>}
          <button className='submit-btn' type='submit' disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      )}
    </>
  );
};

export default AddClass;
