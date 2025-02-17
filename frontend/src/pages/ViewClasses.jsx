import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import AddClass from './AddClass';
import EditClass from './EditClass';
import ViewChart from './ViewChart';
import '../styles/Class.css'; 

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddClass, setShowAddClass] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [classEditData, setClassEditData] = useState(null);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [classDetails, setClassDetails] = useState({ students: [], teachers: [] });

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      if (Array.isArray(response.data.classes)) {
        const updatedClasses = response.data.classes.map(cls => ({
          ...cls,
          id: cls._id.toString()
        }));
        setClasses(updatedClasses);
      } else {
        console.error('Unexpected API response format:', response.data);
        setError('Unexpected API response format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setError('Error fetching classes');
      setLoading(false);
    }
  };

  const editClass = (cls) => {
    setClassEditData({ ...cls });
    setShowEditClass(true);
  };

  const deleteClass = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/classes/${id}`);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
      setError('Error deleting class');
    }
  };

  const viewClassDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/classes/${id}/details`);
      const data = response.data;
  
      // Ensure `students` and `teachers` fields are always arrays
      setClassDetails({
        students: Array.isArray(data.students) ? data.students : [],
        teachers: data.teacher ? [data.teacher] : [] // Ensure teacher is always in an array for consistency
      });
  
      setShowClassDetails(true);
    } catch (error) {
      console.error('Error fetching class details:', error);
      setError('Error fetching class details');
    }
  };
  

  useEffect(() => {
    fetchClasses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="classes-container">
      <h2>Classes:</h2>
      <button className='add-button' onClick={() => setShowAddClass(true)}>Add New</button>
      {showAddClass && <button className='cancel-button' onClick={() => setShowAddClass(false)}>Cancel</button>}
      {showAddClass && <AddClass onSuccess={() => { setShowAddClass(false); fetchClasses(); }} />}
      <br />
      {showEditClass && <button className='cancel-button' onClick={() => setShowEditClass(false)}>Cancel</button>}
      {showEditClass && <EditClass onSuccess={() => { setShowEditClass(false); setClassEditData(null); fetchClasses(); }} classData={classEditData} />}
      <div className='class-list'>
        {classes.map((cls) => (
          <div className='class-card' key={cls.id}>
            <strong>ID:</strong> {cls.id}<br />
            <strong>Name:</strong> {cls.name}<br />
            <strong>Year:</strong> {cls.year}<br />
            <strong>Fees:</strong> {cls.studentFees}<br />
            <button className='delete-button' onClick={() => deleteClass(cls.id)}>Delete</button>
            <button className='edit-button' onClick={() => editClass(cls)}>Edit</button>
            <button className='view-button' onClick={() => viewClassDetails(cls.id)}>View Class</button>
            {showChart && <ViewChart classID={cls.id} />}
          </div>
        ))}
      </div>

     {/* Class Details Modal */}
     {showClassDetails && classDetails && (
        <div className="class-details-modal">
          <h3>Class Details</h3>
          <h4>Students:</h4>
          <ul>
            {classDetails.students.length > 0 ? (
              classDetails.students.map(student => (
                <li key={student._id}>{student.name}</li>
              ))
            ) : (
              <p>No students enrolled.</p>
            )}
          </ul>
          <h4>Teachers:</h4>
        
           <ul>
            {classDetails.teachers.map(teacher => (
              <li key={teacher.id}>{teacher.name}</li>
            ))}
          </ul>
          <button onClick={() => setShowClassDetails(false)}>Close</button>
        </div>
      )}
    </div>
  );
};


export default ViewClasses;
