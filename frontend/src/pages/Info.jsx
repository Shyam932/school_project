import React from 'react';
import '../styles/Info.css'; 

const Info = () => {
  return (
    <div className='info-container'>
      <h2 className='info-title'>School Management App Development Info</h2>
      <ol className='info-list'>
        <li>In this project, you can navigate to different entities by clicking on the top buttons, which will take you to their respective pages.</li>
        <li>Entities can be added using the "Add New" button, with the help Class ID. Later, entries can be edited using the "Edit" button or removed using the "Delete" button.</li>
        <li>In the class section, student composition is visualized through a pie chart. Clicking on "View Class" will display detailed class information, including assigned teachers and the student list.</li>
        <li>The analytics page provides insights into expenses, such as teacher salaries, and income generated from student fees. A toggle allows switching between monthly and yearly views.</li>
        <li>On the backend, pagination is implemented. You can test the API endpoints using Postman.</li>
      </ol>
    </div>
  );
};

export default Info;
