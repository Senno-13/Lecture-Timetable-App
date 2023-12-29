import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes from "prop-types";
import "./TimeTable.css";
import moment from 'moment';
import ExportExcelTT from './ExportExcelTT';


const localizer = momentLocalizer(moment);  

function CustomHeader({ date }) {
  const days = ["Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday" ,"Friday"];
  const formattedDate = moment(date).format("dddd");
  return (
    <div style={{ textAlign: "center", fontWeight: "bold" }}>
      {formattedDate}
    </div>
  );
}
CustomHeader.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

function CustomToolbar({ label }) {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-toolbar-label">{label}</span>
    </div>
  );
}
CustomToolbar.propTypes = {
  label: PropTypes.string.isRequired,
};

function Timetable({ lectureList }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
const [position,setposition]=useState({});
  const handleEventClick = (event,e) => {
    setSelectedEvent(event);
    setposition({top:e.clientY,left:e.clientX});
  };
  const events = lectureList.map((lecture) => {
    const dayOfWeek = moment(lecture.date, "YYYY-MM-DD").format("dddd");
    const start = moment(`${dayOfWeek}T${lecture.time}`, "ddddTHH:mm").toDate();
    const end = moment(start).add(90, "minutes").toDate();
    return {
      title: lecture.title,
      start: start,
      end: end,
      instructor:lecture.instructor,
      hall:lecture.hall,
      course:lecture.course
    };
  });

  return (
    <div>
    <div style={{ height: 600, width: 1000 ,boxSizing: "border-box" }}>
      <Calendar
      style={{
        padding: "50px",
      }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        views={{ week: true }}
        defaultView="week"
        step={90}
        timeslots={1}
        min={new Date("2023-01-01T08:30:00")}
        max={new Date("2023-01-01T20:00:00")}
        onSelectEvent={handleEventClick} 
        components={{ toolbar: () =>  <div style={{fontSize:'30',fontWeight:'bold',gap:'15px',alignSelf:'self-start'}}> 
        <CustomToolbar label="Timetable" />
        </div> ,header:CustomHeader}}
      />
      {selectedEvent && (
        <div style={{
          position: "fixed",
          top: position.top ,
          left: position.left ,
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          boxSizing:"border-box",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <h3 style={{alignSelf:"center",gap:"10px",fontSize:"20px"}}><strong>{selectedEvent.title}</strong></h3>
          <p><strong>Instructor:</strong> {selectedEvent.instructor}</p>
          <p><strong>Course Name:</strong> {selectedEvent.course}</p>
          <p><strong>Room:</strong> {selectedEvent.hall}</p>
          <button style={{
            backgroundColor: "#0078d4",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            alignSelf: "center"
          }} onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
       {/* Export to Excel button */}
    <div style={{ marginLeft:'39spx'}}>
        <ExportExcelTT lectureList={lectureList} />
      </div>
    </div>
    </div>
  );
}

Timetable.propTypes = {
  lectureList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      course: PropTypes.string,
      instructor: PropTypes.string,
      hall: PropTypes.string,
      time: PropTypes.string
    })
  ),
};

export default function TT() {
  const lectureListData = JSON.parse(localStorage.getItem("lectures")) || [];
  
  return (
    <div>
      
      <Timetable lectureList={lectureListData} />
    </div>
  );
}




























