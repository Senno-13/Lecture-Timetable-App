import React, { useState } from 'react';

const GenerateRReportButton = () => {
  const [numberOfRooms, setNumberOfRooms] = useState(null);

  const generateReport = () => {
    const storedData = localStorage.getItem('roomData');
    const roomData = storedData ? JSON.parse(storedData) : [];

    setNumberOfRooms(roomData.length);
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

      {numberOfRooms !== null && (
        <p>Total number of rooms added: {numberOfRooms}</p>
      )}
    </div>
  );
};

export default GenerateRReportButton;
