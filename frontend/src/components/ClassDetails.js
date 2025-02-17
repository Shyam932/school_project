import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClassDetails = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/classes/${id}/details`);
        setClassDetails(response.data);
      } catch (err) {
        console.error('Error fetching class details:', err);
        setError('Error fetching class details');
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Class: {classDetails.class.name}</h2>
      <h3>Teacher</h3>
      {classDetails.teacher ? (
        <p>{classDetails.teacher.name} (Email: {classDetails.teacher.email})</p>
      ) : (
        <p>No teacher assigned.</p>
      )}

      <h3>Students</h3>
      {classDetails.students.length > 0 ? (
        <ul>
          {classDetails.students.map((student) => (
            <li key={student._id}>{student.name} - {student.email}</li>
          ))}
        </ul>
      ) : (
        <p>No students enrolled.</p>
      )}
    </div>
  );
};

export default ClassDetails;
