import React from 'react';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import moment from 'moment';

const ExportExcelTT = ({ lectureList }) => {
  const handleExportToExcel = () => {
    const events = lectureList.map((lecture) => {
      const dayOfWeek = moment(lecture.date, "YYYY-MM-DD").format("dddd");
      const start = moment(`${dayOfWeek}T${lecture.time}`, "ddddTHH:mm").toDate();
      const end = moment(start).add(90, "minutes").toDate();

      return {
        title: lecture.title,
        start: `${start.toLocaleTimeString()}`,
        end: ` ${end.toLocaleTimeString()}`,
        instructor: lecture.instructor,
        hall: lecture.hall,
        course: lecture.course
      };
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(events);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'TimeTableData');

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

    downloadExcelFile(blob, 'timetable_data.xlsx');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button
      onClick={handleExportToExcel}
      style={{
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        marginRight: '10px',
        marginLeft: '10px',
      }}
    >
      Export to Excel
    </button>
    </div>
  );
};

ExportExcelTT.propTypes = {
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

export default ExportExcelTT;

