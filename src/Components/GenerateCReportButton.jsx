import React, { useState } from 'react';

const GenerateReportButton = () => {
  const [numberOfCourses, setNumberOfCourses] = useState(null);

  const generateReport = () => {
    const storedData = localStorage.getItem('courseData');
    const courseData = storedData ? JSON.parse(storedData) : [];

    setNumberOfCourses(courseData.length);
  };

  return (
    <div>
      <button
        onClick={generateReport}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        Generate A Report
      </button>

      {numberOfCourses !== null && (
        <p>Total number of courses added: {numberOfCourses}</p>
      )}
    </div>
  );
};

export default GenerateReportButton;
