import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState({
    dept: "",
    username: "",
    password: "",
  });
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
    props.onLogin(user);
  }
  return (
    <div>
    <br/>
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
          <option value="IT">IT</option>
          <option value="HR">HR</option>
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
        <button type="submit" onClick={IsLogin} className="btnInfo">
          Login
        </button>
        <br />
        <br />
        <Link to="/user/register">Do not have an Account?</Link>
      </form>
    </div>
  );
}

export default Login;
