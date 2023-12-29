import React, { useState } from 'react';

const GenerateTReportButton = () => {
  const [numberOfTutors, setNumberOfTutors] = useState(null);

  const generateReport = () => {
    const storedData = localStorage.getItem('tutorData');
    const tutorData = storedData ? JSON.parse(storedData) : [];

    setNumberOfTutors(tutorData.length);
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

      {numberOfTutors !== null && (
        <p>Total number of rooms added: {numberOfTutors}</p>
      )}
    </div>
  );
};

export default GenerateTReportButton;
