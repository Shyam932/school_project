import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addstudent.css'; // Import CSS file

const AddStudent = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    enrolledClass: '',
    feesPaid: '',
    contact: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.gender || !formData.dob || !formData.contact) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await axios.post('https://school-project-n93b.onrender.com/api/students', formData);
      if (response.data.success === false) {
        return setErrorMessage(response.data.message);
      }
      setLoading(false);
      setFormData({
        name: '',
        gender: '',
        dob: '',
        enrolledClass: '',
        feesPaid: '',
        contact: ''
      }); 
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
        <form className='add-student-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' value={formData.name} onChange={handleChange} placeholder="Student name.." required />
          </div>
          <div className='form-group'>
            <label htmlFor='gender'>Gender</label>
            <select id='gender' value={formData.gender} onChange={handleChange} required>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='dob'>Date of Birth</label>
            <input id='dob' type='date' value={formData.dob} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label htmlFor='enrolledClass'>Enrolled Class ID</label>
            <input id='enrolledClass' type='text' value={formData.enrolledClass} onChange={handleChange} placeholder="Enrolled Class ID" />
          </div>
          <div className='form-group'>
            <label htmlFor='feesPaid'>Fees Paid</label>
            <input id='feesPaid' type='number' value={formData.feesPaid} onChange={handleChange} placeholder="Ex: 1000" />
          </div>
          <div className='form-group'>
            <label htmlFor='contact'>Contact</label>
            <input id='contact' type='text' value={formData.contact} onChange={handleChange} placeholder="Contact number.." required />
          </div>
          {errorMessage && <span className="error">{errorMessage} {formData.enrolledClass && "Please check if the entered values are valid like enrolled class ID and fees."}</span>}
          <button className='submit-btn' type='submit' disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      )}
    </>
  );
};

export default AddStudent;
