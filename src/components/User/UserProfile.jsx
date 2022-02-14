import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookie from "js-cookie"

function UserProfile(props) {
  const u_id = Cookie.get("user_id")
  const [user,setUser] = useState({
    dept: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role:"",
    gender: "",
    age: "",
  })
  const [api,setApi]=useState(true)
  const [edit,setEdit] = useState(false)

  const history = useHistory()

  axios.defaults.baseURL = "http://localhost:8080/api/v1";

  //show userdata
  function showUserData(){
    return(
      <div className="userInfo">
        <h3>{user.firstName}`s Profile</h3><br/>
        <table className="userInfo" style={{width:"400px",height:"300px", background:"#FEECE9"}}>
        <tbody>
        
        <tr>
        <th className="left" >Department</th><th>:</th><td className="right">{user.dept} Department</td>
        </tr>
        <tr >
        <th className="left" >Full Name</th><th>:</th><td className="right">{user.firstName+" "+user.lastName}</td>
        </tr>
        <tr>
        <th className="left">User Name</th><th>:</th><td className="right">{user.username}</td>
        </tr>
        <tr>
        <th className="left">Role</th><th>:</th><td className="right">{user.role}</td>
        </tr>
        <tr >
        <th className="left" >Gender</th><th>:</th><td className="right">{user.gender}</td>
        </tr>
        <tr >
        <th className="left" >Age</th><th>:</th><td className="right">{user.age}</td>
        </tr>
        </tbody>
        </table><br/>
        <button className="editbtn" onClick={()=>{setEdit(true)}}><img src="https://img.icons8.com/pastel-glyph/28/000000/edit--v1.png" alt="edit"/></button>
        <button className="btnInfo" onClick={() => { history.push(`/more-info`)}}>View More</button>
      </div>
    )
  }
  function editUserData(){
    return (
      <div className="userInfo">
        <h3>{user.firstName}`s Profile</h3><br/>
        <table className="userInfo" style={{width:"400px",height:"300px", background:"#FEECE9"}}>
        <tbody>
        
        <tr>
        <th className="left" ><label>Department</label></th><th>:</th><td className="right"><input value={user.dept} disabled/></td>
        </tr>
        <tr >
        <th className="left" >First Name</th><th>:</th><td className="right"><input onChange={handleChange} type='text' placeholder='Enter First Name *' name='firstName' value={user.firstName} required/></td>
        </tr>
        <tr >
        <th className="left" >last Name</th><th>:</th><td className="right"><input onChange={handleChange} type='text' placeholder='Enter last Name *' name='lastName' value={user.lastName} required/></td>
        </tr>
        <tr>
        <th className="left">User Name</th><th>:</th><td className="right"><input type='text'  value={user.username} disabled/></td>
        </tr>
        <tr>
        <th className="left">Role</th><th>:</th><td className="right"><input value={user.role} disabled/></td>
        </tr>
        <tr >
        <th className="left" >Gender</th><th>:</th><td className="right">
        <select name="gender" onChange={handleChange} defaultValue={user.gender} required>
          <option value="" disabled hidden>--Gender--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select></td>
        </tr>
        <tr >
        <th className="left" >Age</th><th>:</th><td className="right"><input onChange={handleChange} type='number' placeholder='Enter age *' name='age' value={user.age} required/></td>
        </tr>
        </tbody>
        </table><br/>
        <button className="btnInfo" onClick={editUser}>Save</button>
      </div>
    )
  }
  async function editUser(){
    axios.post(`/Users/${u_id}`,user, {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).then(res=>{
        console.log(res.data);
    })
    let employee = {}
    await axios.get(`/Employees/${user.emp_id}`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).then(res => {
        employee = res.data
    })
    employee.firstName = user.firstName
    employee.lastName = user.lastName
    employee.role = user.role
    employee.age = user.age
    employee.gender = user.gender

    axios.post(`/Employees/${user.emp_id}`,employee, {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).then(res=>{
        console.log(res.data);
        console.log(employee)
    })
    setEdit(false)
  }

  function handleChange(e){
    const { name, value } = e.target;

    setUser(prevUser => {
      return {
        ...prevUser,
        [name]: value
      };
    });
}

  
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
                <Link to="/change-password" >Change Password</Link>
                <Link onClick={()=>{props.logout();}} to="/" id="logout">Logout</Link>
              </div>
            </div>
          </li>
               
            </ul>
        </div>
        <br/><br/>
        {edit? editUserData(): showUserData()}
        <br/><br/><br/>
    </div>
  );
}

export default UserProfile;
