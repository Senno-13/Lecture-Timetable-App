import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className='sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100'>
      <div>
        <i className='usericon bi bi-person-circle fs-5 me-2'></i>
        <span className='fs-5 p-1'>User</span>
        <hr className='text-secondary mt-2' />
        <ul className='nav nav-pills flex-column p-0 m-0'>
          <li className='nav-item p-1'>
            <NavLink to="/lectures" className='nav-link text-white' style={({ isActive }) => ({
              backgroundColor: isActive ? 'blue' : '',
            })}>
              <i className='bi bi-file-pdf-fill me-2 fs-5'></i>
              <span className='fs-5'>Lectures</span>
            </NavLink>
          </li>
          <li className='nav-item p-1'>
            <NavLink to="/tutors" className='nav-link text-white' style={({ isActive }) => ({
              backgroundColor: isActive ? 'blue' : '',
            })}>
              <i className='bi bi-person-video3 me-2 fs-5'></i>
              <span className='fs-5'>Tutors</span>
            </NavLink>
          </li>
          <li className='nav-item p-1'>
            <NavLink to="/rooms" className='nav-link text-white' style={({ isActive }) => ({
              backgroundColor: isActive ? 'blue' : '',
            })}>
              <i className='bi bi-building me-2 fs-5'></i>
              <span className='fs-5'>Rooms</span>
            </NavLink>
          </li>
          <li className='nav-item p-1'>
            <NavLink to="/courses" className='nav-link text-white' style={({ isActive }) => ({
              backgroundColor: isActive ? 'blue' : '',
            })}>
              <i className='bi bi-journal-bookmark-fill me-2 fs-5'></i>
              <span className='fs-5'>Courses</span>
            </NavLink>
          </li>
          <li className='nav-item p-1'>
            <NavLink to="/timetable" className='nav-link text-white' style={({ isActive }) => ({
              backgroundColor: isActive ? 'blue' : '',
            })}>
              <i className='bi bi-calendar3 me-2 fs-5'></i>
              <span className='fs-5'>TimeTable</span>
            </NavLink>
          </li>
          {/* Documentation NavLink */}
          <li className='nav-item p-1'>
            <NavLink to="/documentation" className='nav-link text-white' style={({ isActive }) => ({
              backgroundColor: isActive ? 'blue' : '',
            })}>
              <i className='bi bi-file-earmark-text-fill me-2 fs-5'></i>
              <span className='fs-5'>Documentation</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <hr className='text-secondary' />    
          <Link to={"/signup"} className='nav-link text-blue' >
              Log out!
          </Link>
      </div>
    </div>
  );
};

export default SideBar;
