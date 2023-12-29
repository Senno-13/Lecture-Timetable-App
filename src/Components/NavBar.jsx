import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './SideBar';

const NavBar = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
       <div className="d-flex align-items-center justify-content-center">
         <SideBar/>
        </div>
    <div>
    </div>
</div>
  )
}

export default NavBar;