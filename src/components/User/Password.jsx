import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";

function Password(props) {
  const u_id = Cookie.get("user_id");
  const [user, setUser] = useState({
    dept: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    gender: "",
    age: "",
  });
  const [data, setData] = useState({
    password: "",
    new: "",
    con: "",
  });
  function tempAlert(msg, duration, status) {
    var box = document.createElement("div");
    box.setAttribute(
      "style",
      status
        ? " position:fixed;left:35%; margin:auto;top:22%;background-color:#95CD41;color:#fff;width:30%; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;"
        : " position:fixed;left:35%; margin:auto;top:10%;background-color:#F14A16;color:#fff;width:30%; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;"
    );
    box.innerHTML = msg;
    setTimeout(function () {
      box.parentNode.removeChild(box);
    }, duration);
    document.body.appendChild(box);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setData((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }
  async function handleSubmit(e) {
    console.log(user);
    if(data.password!=="" && data.new!=="" && data.con!==""){
    if (user.password === data.password) {
      if(validation()){
      if(data.new === data.con){
      let newUser={
        id: user.id,
        dept: user.dept,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: data.new,
        role: user.role,
        gender: user.gender,
        age: user.age,
        emp_id:user.emp_id
      };
      await axios.post(`/Users/${u_id}`,newUser, {
        auth: {
          username: "admin",
          password: "admin",
        },
      }).then(res=>{
          console.log(res.data);
          tempAlert("successfully changed.... Logging you out..... please login again...",2000,true)
          props.logout()
      })
    }
    else{
      tempAlert("Both Passwords should match...!",2000,false)
    }}
    }
    else{
      tempAlert("Incorrect Password",2000,false)
    }
  }
  else{
    tempAlert("Please fill all the details.....!",2000,false)
  }
}

  function validation(){
    let isValid = true
    var pattern = new RegExp("(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"); //'/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/';
          if (!pattern.test(data.new)) {
            isValid = false;
            console.log(isValid);
            tempAlert("Password should be atleast 8 characters, and should contain a special charater, a capital letter, a small letter and a number....",2000,false)
            setData({
              password: data.password,
              new:"",
              con:"",
            })
          }
    return isValid
  }

  const [api,setApi] = useState(true)
  useEffect(()=>{
    if(api){
    axios.get(`/Users/${u_id}`,{
      auth: {
        username: 'admin',
        password: 'admin'
      }}).then((res) => {
        setUser(res.data);
        setApi(false)
      });
  }})
  return (
    <div>
    <div>
            
            <ul className="nav">
                <li>
                    <Link to='/employee'><img src="https://img.icons8.com/material-rounded/48/000000/home-page.png" alt="home"/></Link>
                </li>
                <h2 style={{color:'#fff'}}>User Details</h2>
                <li>
            <div className="dropdown">
              <button className="dropbtn">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                  alt="user"
                />
              </button>
              <div className="dropdown-content">
                <Link to="/user-info" id="profile">Profile</Link>
                <Link onClick={()=>{props.logout();}} to="/" id="logout">Logout</Link>
              </div>
            </div>
          </li>
               
            </ul>
        </div>
      <br />
      <br />

      <div className="addData">
        <br />
        <h2>Change Password</h2>
        <br />
        <br />
        <label style={{ padding: "10px", textAlign: "center" }}>
          Enter old Password
        </label>
        <br />
        <input
          style={{ width: "50%" }}
          type="password"
          onChange={handleChange}
          placeholder="Old Password"
          name="password"
          required
        />
        <br />
        <br />
        <label style={{ padding: "10px", textAlign: "center" }}>
          Enter new Password
        </label>
        <br />
        <input
          style={{ width: "50%" }}
          type="password"
          onChange={handleChange}
          placeholder="New Password"
          name="new"
          required
        />
        <br />
        <br />
        <label style={{ padding: "10px", textAlign: "center" }}>
          Confirm Password
        </label>
        <br />
        <input
          style={{ width: "50%" }}
          type="password"
          onChange={handleChange}
          placeholder="Confirm Password"
          name="con"
          required
        />
        <br />
        <br />
        <br />
        <br />
        <button className="btnInfo" onClick={handleSubmit}>
          Change Password
        </button>
      </div>
      <br/><br/><br/>
    </div>
  );
}

export default Password;
