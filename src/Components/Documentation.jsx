import React from 'react';
import tutor1 from './photos/tutor1.png';
import tutor2 from './photos/tutor2.png';
import tutor3 from './photos/tutor3.png';
import tutor4 from './photos/tutor4.png';
import Courses from './photos/Courses.png'; 
import Rooms from './photos/Rooms.png'; 
import SideBar from './photos/SideBar.png';
import timetable1 from './photos/timetable1.jpg';
import timetable2 from './photos/timetable2.jpg';
import lecture1 from './photos/lecture1.jpg';
import lecture2 from './photos/lecture2.jpg';
import lecture3 from './photos/lecture3.jpg';
import lecture4 from './photos/lecture4.jpg';

const styles = {
  container: {
    padding: '40px',
  },
  titleRect: {
    backgroundColor: '#4a4a4a',
    borderRadius: '4px',
    marginBottom: '30px',
    padding: '20px',
    width: '1000px',
  },
  title: {
    margin: '0',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: '24px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    
    fontWeight: 'bold',
    fontSize: '28px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontFamily: 'Segoe UI',
  },
  image: {
    border:'1px solid',
    maxWidth: '800px', 
    margin: '10px auto', 
    display: 'block', 
    marginTop:'35px',
    marginBottom:'35px'
  },
};

function Documentation() {
  return (
    <div style={styles.container}>
      <div style={styles.titleRect}>
        <p style={styles.title}>Documentation</p>
      </div>
      <div style={styles.sections}>
        <div style={styles.leftSection}>
          {/* sidebar */}
          <h2 style={styles.header}>Sidebar</h2>
          <p>Here is on the left, we have the sidebar that contains all the menus that we will deal with to enter the information in the right place.</p>
          <img src={SideBar} style={styles.image} alt="Sidebar" />
           
           {/* tutor */}
          <h2 style={styles.header}>Tutor</h2>
          <img src={tutor1} style={styles.image} alt="Tutor 1" />
          <p>Here, we are inside the Tutor menu,as shown in the image below:</p>
          <p> 1)  Enter your phone number here.</p>
          <p> 2)  Enter your name here.</p>
          <p>3)  Enter your course_ID here.</p>
          <p> 4)  To add the entries above,click on this button, then a new row with the added enttries will appear in the table at the right.</p>
          <p> 5)  If you want to edit an existing row in the table, select it first, then click on "Edit" button.</p>
            <img src={tutor3} style={styles.image} alt="Tutor 3" />
            <p>select a field to change for example the course_id and then type the proper information</p>
            <img src={tutor4} style={styles.image} alt="Tutor 4" />
            <p>6)  "UPDATE" button is used to apply the changes made with "Edit" button.</p>
            <img src={tutor2} style={styles.image} alt="Tutor 2" />
            <p>7)  To delete an existing row in the table,select the row you want to delete then hit "Delete".</p>
            <p> 8)  Use this button to know how many tutors were added to the table.</p>
            <p> 9)  Once you click on this button, an excel sheet will be downloaded.</p>

           {/*rooms */}
          <h2 style={styles.header}>Rooms</h2>
          <img src={Rooms} style={styles.image} alt="Rooms" />
          <p>Here, we are inside the Rooms menu,as shown in the image below:</p>
          <p> 1)  Enter the room number.</p>
          <p> 2)  Enter the room name here.</p>
          <p> 3)  Enter the capacity of the room here.</p>
          <p> 4)  To add the entries above,click on this button, then a new row with the added enttries will appear in the table at the right.</p>
          <p> 5)  If you want to edit an existing row in the table, select it first, then click on "Edit" button.</p>
          <p> 6)  "UPDATE" button is used to apply the changes made with "Edit" button.</p>
          <p> 7)  To delete an existing row in the table,select the row you want to delete then hit "Delete".</p>
          <p> 8)  Use this button to know how many rooms were added to the table.</p>
          <p>  9)  Once you click on this button, an excel sheet will be downloaded.</p>

           {/* courses */}
          <h2 style={styles.header}>Courses</h2>
          <img src={Courses} style={styles.image} alt="Courses" />
          <p> 1)  Enter the course code.</p>
          <p> 2)  Enter the course name here.</p>
          <p> 3)  Enter number of units here.</p>
          <p> 4)  To add the entries above,click on this button, then a new row with the added enttries will appear in the table at the right.</p>
          <p> 5)  If you want to edit an existing row in the table, select it first, then click on "Edit" button.</p>
          <p> 6)  "UPDATE" button is used to apply the changes made with "Edit" button.</p>
          <p> 7)  To delete an existing row in the table,select the row you want to delete then hit "Delete".</p>
          <p> 8)  Use this button to know how many courses were added to the table.</p>
          <p> 9)  Once you click on this button, an excel sheet will be downloaded.</p>
            
            {/* lectures */}
            <h2 style={styles.header}>Lectures</h2>
            <p>Here, we are inside the lectures menu,you have an overall view of the lectures added recently.</p>
            <img src={lecture1} style={styles.image} alt="lecture1" />
            <p>-  You can delete an existing lecture using "delete" button </p>
            <p>-  you can also export an excel sheet from the existing lectures using "Export to Excel" button </p>
            <p>-  If you want to add a new lecture, click on add lecture from the top right corner, then a new window will appear as shown below</p>
            <img src={lecture2} style={styles.image} alt="lecture2" />
            <p>Here in "New Lecture" window, you can select several options such as: lecture title, tutor,...etc as shown in the image<br />
            once you select all the options, click on submit.</p>
            <p>Here is an example of adding a new lecture:</p>
            <img src={lecture3} style={styles.image} alt="lecture3" />
            <p>All options were selected and after clicking on submit button, here is the result:</p>
            <img src={lecture4} style={styles.image} alt="lecture4" />
            <p>A new lecture were added to the previous created lectures in the Lectures menu.</p>
        </div>

        {/* timetable */}
        <h2 style={styles.header}>Timetable</h2>
        <img src={timetable1} style={styles.image} alt="ltimetable1" />
        <p>-  This table gives the final result combining all useful information from earlier menus.</p>
        <p>-  It presents the lectures in daily and weekly chronological order according to entries added in previous menus. </p>
        <p>-  You also have an option to export the timetable as an excel sheet from the button "Export to Excel"at the bottom of the page</p> 
        <p>  when you click on cell it shows all the relate information to the lecture you selectes such as:(tutor name,course name and room)</p>
        <img src={timetable2} style={styles.image} alt="timetable2" />
        <p>If you have reached here, congratulations, you have completed all the steps successfully!</p>
      </div>
    </div>
  );
}

export default Documentation;
