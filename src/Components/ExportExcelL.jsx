import React from 'react';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';

export default function ExportExcelL({ lectureList }) {
  const exportToExcel = () => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportData = lectureList.map((lecture) => ({
      Title: lecture.title,
      Instructor: lecture.instructor,
      Date: new Date(lecture.date).toLocaleDateString(),
      Time: lecture.time,
      Hall: lecture.hall,
      Course: lecture.course,
      Note: lecture.note || '',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = 'lecture_data' + fileExtension;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <button 
    onClick={exportToExcel}
     className="bg-blue-500 text-white py-2 px-4 rounded " style={{ marginTop: '10px' }}>
      
      Export to Excel
    </button>
  );
}
ExportExcelL.propTypes = {
  lectureList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
      instructor: PropTypes.string,
      hall: PropTypes.string,
    })
  ),
};