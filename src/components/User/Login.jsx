import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState({
    dept: "",
    username: "",
    password: "",
  });

  function tempAlert(msg, duration, status) {
    var box = document.createElement("div");
    box.setAttribute(
      "style",status?
      " position:absolute;left:35%; margin:auto;top:22%;background-color:#95CD41;color:#fff;width:30%; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;":
      " position:absolute;left:35%; margin:auto;top:10%;background-color:#F14A16;color:#fff;width:30%; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;"
    );
    box.innerHTML = msg;
    setTimeout(function () {
      box.parentNode.removeChild(box);
    }, duration);
    document.body.appendChild(box);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }


  function IsLogin(e) {
    e.preventDefault()
    if(user.dept !== "" && user.username !== "" && user.password !== ""){
      props.onLogin(user);
      setUser({
        dept: user.dept,
        username: "",
        password: "",
      })
    }
    else{
      tempAlert("Please fill all the details...",2000,false)
      setUser({
        dept: user.dept,
        username: "",
        password: "",
      })
    }
    
  }
  return (
    <div>
    <br/><br/>
      <form className="addData">
        <h3>Login</h3><br/><br/>
        
        <select
          name="dept"
          onChange={handleChange}
          defaultValue={user.dept}
          required
        >
          <option value="" disabled hidden>
            --department--
          </option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Salary">Salary</option>
        </select><br/><br/>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter User Name *"
          name="username"
          value={user.username}
          required
        /><br/><br/>
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password *"
          name="password"
          value={user.password}
          required
        />
        <br />
        <br />
        <button id="login" type="submit" onClick={IsLogin} className="btnInfo">
          Login
        </button>
        <br />
        <br />
        <Link to="/user/register" id="register" >Do not have an Account?</Link>
      </form>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default Login;
