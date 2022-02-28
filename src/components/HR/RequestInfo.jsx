import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
//import Cookie from "js-cookie"


function RequestInfo(props) {
  const {id} = useParams()
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
  const history =useHistory()
  let data = {
    dept: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role:"",
    gender: "",
    age: "",
    date_created: new Date(),
    last_loggedin: new Date()
  }
  let employee = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    gender: "",
    base: 0,
    bonus: 0,
    age: null,
    mobile: "",
    branch: "",
    country: "",
    acc_no: "",
    bank: "",
    ifsc: "",
    user_id:""
  };

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
        <button className="btnInfo" onClick={handleAccept}>Accept</button>
        <button className="btnDel" onClick={handleReject}>Reject</button>
      </div>
    )
  }
  
  async function handleAccept(){
    employee.firstName = user.firstName
    employee.lastName = user.lastName
    employee.role = user.role
    employee.gender = user.gender
    employee.age = user.age

    data.firstName = user.firstName
    data.lastName = user.lastName
    data.dept = user.dept
    data.role = user.role
    data.username = user.username
    data.password = user.password
    data.age = user.age
    data.gender = user.gender

    await  axios.post("/Employees",employee, {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).then(res=>{
        console.log(res.data);
        employee.id = res.data.id
    })
    await props.register(data,employee)
    axios.delete(`/Requests/${user.id}`,{
                    auth: {
                      username: "admin",
                      password: "admin",
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    history.push('/requests')
                  });
  }
  function handleReject(){
    axios.delete(`/Requests/${user.id}`,{
      auth: {
        username: "admin",
        password: "admin",
      },
    })
    .then((res) => {
      console.log(res.data);
      history.push('/requests')
    });
  }
  useEffect(()=>{
    if(api){
    axios.get(`/Requests/${id}`,{
      auth: {
        username: 'admin',
        password: 'admin'
      }}).then((res) => {
        setUser(res.data);
        console.log(user);
        setApi(false)
      });
  }},[api,id,user])
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
        <br/><br/>
        {showUserData()}
        <br/><br/><br/>
    </div>
  );
}

export default RequestInfo;
