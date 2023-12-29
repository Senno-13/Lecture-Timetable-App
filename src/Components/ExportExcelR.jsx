import React from 'react';
import * as XLSX from 'xlsx';

const ExportExcelR = ({ userData }) => {
  const handleExportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(userData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'RoomData');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    const downloadExcelFile = (blob, fileName) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    downloadExcelFile(blob, 'rooms_data.xlsx');
  };

  return (
    <button
      onClick={handleExportToExcel}
      style={{
        width: '35%',
        marginTop: '10px',
        backgroundColor: '#1e8449',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
      }}
    >
      Export to Excel
    </button>
  );
};

export default ExportExcelR;
