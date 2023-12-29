import React from 'react';
import * as XLSX from 'xlsx';

const ExportExcelC = ({ userData }) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const columnNames = Object.keys(userData[0] || {});
    const courseNameIndex = columnNames.findIndex(name => name === 'Course Name');

    if (courseNameIndex !== -1) {
      let maxLength = 0;
      userData.forEach(data => {
        const courseName = data['Course Name'] || '';
        maxLength = Math.max(maxLength, courseName.length);
      });

      const wscols = [{ wch: 20 }];
      wscols[courseNameIndex] = { wch: maxLength + 2 };
      worksheet['!cols'] = wscols;
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, 'CoursesData');
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

    downloadExcelFile(blob, 'courses_data.xlsx');
  };

  return (
    <button
      onClick={exportToExcel}
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

export default ExportExcelC;
