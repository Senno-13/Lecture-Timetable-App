import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SideBar() {
  return (
    <div className="w-[20vw]">
      <div className=" fixed sidebar d-flex flex-column justify-content-between bg-dark p-4 vh-100">
      <div>
        <i className="usericon bi bi-person-circle fs-5 me-2"></i>
        <span className="fs-5 p-1">User</span>
        <hr className="text-secondary mt-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          <li className="nav-item p-1">
            <a href="/" className="nav-link flex text-white">
              <i className="bi bi-speedometer me-2 fs-5"></i>
              <span className="fs-5">Dashboard</span>
            </a>
          </li>
          <li className="nav-item p-1">
            <a href="/" className="nav-link flex text-white">
              <i className="bi bi-file-pdf-fill me-2 fs-5"></i>
              <span className="fs-5">Lectures</span>
            </a>
          </li>
          <li className="nav-item p-1">
            <a href="/tutors" className="nav-link flex text-white">
              <i className="bi bi-person-video3 me-2 fs-5"></i>
              <span className="fs-5">Tutors</span>
            </a>
          </li>
          <li className="nav-item p-1">
            <a href="/rooms" className="nav-link flex text-white">
              <i className="bi bi-building me-2 fs-5"></i>
              <span className="fs-5">Rooms</span>
            </a>
          </li>
          <li className="nav-item p-1">
            <a href="/courses" className="nav-link flex text-white">
              <i className="bi bi-journal-bookmark-fill me-2 fs-5"></i>
              <span className="fs-5">Courses</span>
            </a>
          </li>
          <li className="nav-item p-1">
            <a href="/TimeTable" className="nav-link flex text-white">
              <i className="bi bi-calendar3 me-2 fs-5"></i>
              <span className="fs-5">TimeTable</span>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-secondary" />
        <i className="bi bi-box-arrow-left fs-5 me-2"></i>
        <span className="fs-5 p-1">Log out!</span>
      </div>
    </div>
    </div>
  );
}
