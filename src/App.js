import React, { useState } from "react";
import './App.css';
import Courses from './Components/Courses';
import NavBar from './Components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rooms from './Components/Rooms';
import TimeTable from './Components/TimeTable';
import Tutors from './Components/Tutors';
import Lectures from './Components/lectures';
import Documentation from './Components/Documentation';
import { lazy, Suspense } from "react";
import { ProvidAuthercontext } from "./ContextApis/authContext";

const Signup = lazy(() => import("./Components/Signup"));
const Login = lazy(() => import("./Components/Login"));

function App() {
  const [navappear, setnavappear] = useState(true);
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div
          className="spinner-grow text-success spinner-grow-lg"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
    >
      <ProvidAuthercontext>
        <BrowserRouter>
          <div className="d-flex">
            <div className="col-auto">
              {navappear && (
                <nav>
                  <NavBar />
                </nav>
              )}
            </div>

              <Routes>
                <Route path="*" element={<Signup show={setnavappear} />} />
                <Route path="login" element={<Login show={setnavappear} />} />
                <Route path="/navbar" element={<NavBar show={setnavappear} />} />
                <Route path='/courses' element={<Courses show={setnavappear} />} />
                <Route path='/rooms' element={<Rooms show={setnavappear} />} />
                <Route path='/timetable' element={<TimeTable show={setnavappear} />} />
                <Route path='/tutors' element={<Tutors show={setnavappear} />} />
                <Route path='/lectures' element={<Lectures show={setnavappear} />} />
                <Route path='/Documentation' element={<Documentation show={setnavappear} />} />
              </Routes>
            
          </div>


        </BrowserRouter>
      </ProvidAuthercontext>
    </Suspense>
  );
}

export default App;
