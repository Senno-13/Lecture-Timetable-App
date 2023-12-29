import React, { useState, useContext } from "react";
import Style from "../Styles/form.module.css";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../ContextApis/authContext";

const Login = (props) => {
  props.show(false);
  const [User, setUser] = useState({
    email: "",
    password: "",
   usertype: "Student",
  });
  let [success, setSuccess] = useState(false);
  const Navigate = useNavigate();
  let handleChange = (e) => {
    const { name, value } = e.target;
    setUser((old) => ({
      ...old,
      [name]: value,
    }));
  };
  let { Users } = useContext(AuthContext);
  let login = (e) => {
    e.preventDefault();
    const isAuthorized = Users.some((ele) => {
      return (
        User.email === ele.email &&
        User.password === ele.password &&
        User.usertype === ele.usertype
      );
    });
    if (isAuthorized) {
      setSuccess(true);
      localStorage.setItem("user", JSON.stringify(User));
      let user = JSON.parse(localStorage.getItem("user"));
      if (user.usertype === "Student") {
        Navigate("/timetable", { state: { success: true } });
      } else {
        props.show(true);
        Navigate("/lectures", { state: { success: true } });
      }

    }else {
      setUser({ email: "", password: "", usertype: "Student" });
      setSuccess(false);
      errormsg();
    }
  };
  function errormsg() {
    alert(" You are not authorized. Please try again.");
  }


  return (
    <div className={` ${Style.container}`}>
      <form
        action=""
        onSubmit={login}
        className={`animate__animated animate__backInLeft ${Style.form}`}
      >
        <h1>login now</h1>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={User.email}
            onChange={handleChange}
          />
          <label htmlFor="email"> Your Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={User.password}
            onChange={handleChange}
          />
          <label htmlFor="name">Password</label>
        </div>
        <div>
          <select
            size="2"
            class="form-floating"
            className={Style.select}
            id="usertype"
            name="usertype"
            value={User.usertype}
            onChange={handleChange}
          >
            <option value="Student">Student</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>
        <button className={Style.btn} type="submit">
          Login
        </button>
        <p className="mt-3">
          you don`t have acount
          <Link to={"/signup"} className=" text-primary m-2 fs-5">
            Sign up now
          </Link>
        </p>
      </form>
      <div className={`animate__animated animate__backInRight ${Style.image}`}>
        <img src={require("../images/img2.PNG")} alt="" />
      </div>
    </div>
  );
};

export default Login;
