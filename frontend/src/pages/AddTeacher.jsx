import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../styles/addteacher.css'; // Import CSS file

const AddTeacher = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const onSubmit = async (formData) => {
    if (!formData.name || !formData.gender || !formData.dob || !formData.salary || !formData.contact) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await axios.post('https://school-project-n93b.onrender.com/api/teachers', formData);
      if (response.data.success === false) {
        return setErrorMessage(response.data.message);
      }
      setLoading(false);
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
        <form className='add-teacher-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' {...register('name', { required: true })} placeholder="Teacher's name.." />
            {errors.name && <span className="error">Name is required</span>}
          </div>
          <div className='form-group'>
            <label htmlFor="gender">Gender</label>
            <select id="gender" {...register('gender', { required: true })}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.gender && <span className="error">Gender is required</span>}
          </div>
          <div className='form-group'>
            <label htmlFor="dob">DOB:</label>
            <input type="date" id="dob" {...register('dob', { required: true })} />
            {errors.dob && <span className="error">DOB is required</span>}
          </div>
          <div className='form-group'>
            <label htmlFor="contact">Contact Number:</label>
            <input type="tel" id="contact" {...register('contact', { required: true })} />
            {errors.contact && <span className="error">Contact number is required</span>}
          </div>
          <div className='form-group'>
            <label htmlFor="salary">Salary:</label>
            <input type="number" id="salary" {...register('salary', { required: true })} />
            {errors.salary && <span className="error">Salary is required</span>}
          </div>
          {errorMessage && <span className="error">{errorMessage}</span>}
          <button className='submit-btn' type='submit' aria-label='Add Teacher' disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      )}
    </>
  );
};

export default AddTeacher;
