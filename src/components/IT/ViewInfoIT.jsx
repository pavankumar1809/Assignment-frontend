import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function ViewInfoIT(props) {

  const [page, setPage] = useState(1);
  axios.defaults.baseURL = "http://localhost:8080/api/v1/";
  const {id} = useParams()
  const [employee,setEmployee] = useState({})

  function active(id) {
    if (page === id) {
      return "active";
    }  else {
      return "";
    }
  }


  function Basic() {
    return (
      <form>
        <h3 style={{ color: "red" }}>Basic Details</h3>
        <br />
        <br />
        <label>First Name </label>
        <strong>:</strong>
        <label className='data'>{employee.firstName}</label>
        <br />
        <br />
        <label>Last Name</label>
        <strong>:</strong>
        <label className='data'>{employee.lastName}</label>
        <br />
        <br />

        <label htmlFor="role">Role</label>
        <strong>:</strong>
        <label className='data'>{employee.role}</label>
        <br />
        <br />

        <label htmlFor="gender">Gender</label>
        <strong>:</strong>
        <label className='data'>{employee.gender}</label>
        <br />
        <br />

        <label>Age </label>
        <strong>:</strong>
        <label className='data'>{employee.age}</label>
        <br />
        <br />
      </form>
    );
  }

  function Contact() {
    return (
      <form>
        <h3 style={{ color: "red" }}>Contact Details</h3>
        <br /><br/>
        <label>Email-Id </label>
        <strong>:</strong>
        <label className='data'>{employee.email}</label>
        <br />
        <br />

        <label>Mobile </label>
        <strong>:</strong>
        <label className='data'>{employee.mobile}</label>
        <br />
        <br />

        <label>Branch </label>
        <strong>:</strong>
        <label className='data'>{employee.branch}</label>
        <br />
        <br />

        <label>Country </label>
        <strong>:</strong>
        <label className='data'>{employee.country}</label>
        <br />
        <br />
      </form>
    );
  }

  function Salary() {
    return (
      <form>
        <h3 style={{ color: "red" }}>Salary Details</h3>
        <br /><br/>
        <label>Base Pay </label>
        <strong>:</strong>
        <label className='data'>Rs. {employee.base}</label>
        <br />
        <br />

        <label>Bonus Pay </label>
        <strong>:</strong>
        <label className='data'>Rs. {employee.bonus}</label>
        <br />
        <br />
      </form>
    );
  }

  function Bank(){
    return(
    <form>
    <h3 style={{ color: "red" }}>Bank Account Details</h3>
    <br /><br/>
    <label>Bank Name </label>
    <strong>:</strong>
    <label className='data'>{employee.bank !== ""? employee.bank : "Not Added"}</label>
    <br />
    <br />

    <label>Account Number </label>
    <strong>:</strong>
    <label className='data'>{employee.acc_no!==""?employee.acc_no:"Not Added"}</label>
    <br />
    <br />

    <label>IFSC Code </label>
    <strong>:</strong>
    <label className='data'>{employee.ifsc!==""?employee.ifsc:"Not Added"}</label>
    <br />
    <br />
  </form>
    )
  }
  
  useEffect(()=>{
    let api = true
    if(api){
      axios.get(`/Employees/${id}`,{
        auth: {
          username: 'admin',
          password: 'admin'
        }}).then(res => {
        setEmployee(res.data)
    })
    return (
      api = false
    )
    }
  },[id])

  return (
    <div>
      <div>
            
            <ul className="nav">
                <li>
                    <Link to='/employee' id='home'><img src="https://img.icons8.com/material-rounded/48/000000/home-page.png" alt="home"/></Link>
                </li>
                <h2 style={{color:'#fff'}}>Employee Details</h2>
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
                <Link to="/user-info">Profile</Link>
                <Link onClick={()=>{props.logout();}} to="/">Logout</Link>
              </div>
            </div>
          </li>
               
            </ul>
        </div>
      <div className="addemp">
        <form id="form">
          <ul id="progressbar" style={{marginLeft:"18%"}}>
            <li className={active(1)} id="step1">
              <strong> Personal </strong>
            </li>
            <li className={active(2)} id="step2">
              {" "}
              <strong> Contact </strong>{" "}
            </li>
            <li className={active(3)} id="step3">
              {" "}
              <strong> Salary </strong>{" "}
            </li>
            <li className={active(4)} id="step4">
              {" "}
              <strong> Bank </strong>{" "}
            </li>
          </ul>
        </form>
        <div className="addData">
          {page === 1 && Basic()}
          {page === 2 && Contact()}
          
          <br />
          {page > 1 && (
            <button
              className="btnUpdt"
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous
            </button>
          )}
          {page < 2 && (
            <button
              className="btnInfo"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </button>
          ) }
        </div><br/><br/>
      </div><br/><br/>
    </div>
  )
}

export default ViewInfoIT
