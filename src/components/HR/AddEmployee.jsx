import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect, } from "react-router-dom";
import validator from "validator";
function AddEmployee(props) {
  const [page, setPage] = useState(1);
  const [submit,setSubmit]=useState(false)
  const [employees,setEmployees] = useState([])
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    gender: "",
    base: null,
    bonus: null,
    age: null,
    mobile: "",
    branch: "",
    country: "",
    acc_no: "",
    bank: "",
    ifsc: "",
  });
  let err = {
    "email":"",
    "phone":""
  }
  const [errors,setErrors] = useState(err)

  function tempAlert(msg, duration, status) {
    var box = document.createElement("div");
    box.setAttribute(
      "style",status?
      " position:fixed;left:35%; margin:auto;top:22%;background-color:#95CD41;color:#fff;width:30%; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;":
      " position:fixed;left:35%; margin:auto;top:10%;background-color:#F14A16;color:#fff;width:30%; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;"
    );
    box.innerHTML = msg;
    setTimeout(function () {
      box.parentNode.removeChild(box);
    }, duration);
    document.body.appendChild(box);
  }
  
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  //Active tab...
  function active(id) {
    if (page === id) {
      return "active";
    } else if (page > id) {
      return "success";
    } else {
      return "";
    }
  }

  //personal details....
  function Basic() {
    return (
      <form>
        <h3 style={{ color: "red" }}>Basic Details</h3>
        <br />
        <br />
        <label>First Name <span style={{color:"red"}}>*</span></label>
        <strong>:</strong>
        <input
          className="text"
          type="text"
          onChange={handleChange}
          placeholder="Enter first name"
          name="firstName"
          defaultValue={data.firstName}
          required
        />
        <br />
        <br />
        <label>Last Name <span style={{color:"red"}}>*</span></label>
        <strong>:</strong>
        <input
          className="text"
          onChange={handleChange}
          type="text"
          placeholder="Enter Lastname name"
          name="lastName"
          value={data.lastName}
          required
        />
        <br />
        <br />

        <label htmlFor="role">Role <span style={{color:"red"}}>*</span></label>
        <strong>:</strong>
        <select
          id="role"
          name="role"
          className="gen"
          onChange={handleChange}
          defaultValue={data.role}
          required
        >
          <option value="" disabled hidden>-select-</option>
          <option value="Intern">Intern</option>
          <option value="Employee">Employee</option>
          <option value="Lead">Lead</option>
          <option value="Manager">Manager</option>
        </select>
        <br />
        <br />

        <label htmlFor="gender">Gender <span style={{color:"red"}}>*</span></label>
        <strong>:</strong>
        <select
          id="gender"
          name="gender"
          className="gen"
          onChange={handleChange}
          defaultValue={data.gender}
          required
        >
          <option value="" disabled hidden>-select-</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <br />

        <label>Age <span style={{color:"red"}}>*</span></label>
        <strong>:</strong>
        <input
          className="text"
          type="number"
          onChange={handleChange}
          placeholder="Enter age"
          name="age"
          defaultValue={data.age}
          required
        />
        <br />
        <br />
        
      </form>
    );
  }

  //contact
  function Contact() {
    return (
      <form>
        <h3 style={{ color: "red" }}>Contact Details</h3>
        <br /><br/>
        <label>Email-Id <span style={{color:"red"}}>*</span> </label>
        <strong>:</strong>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Email-Id"
          name="email"
          value={data.email}
          required
        />
        <div className="text-danger">{errors.email}</div>
        <br />

        <label>Mobile <span style={{color:"red"}}>*</span> </label>
        <strong>:</strong>
        <input
          type="number"
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          name="mobile"
          value={data.mobile}
          required
        />
        <div className="text-danger">{errors.phone}</div>
        <br />
        

        <label>Branch <span style={{color:"red"}}>*</span> </label>
        <strong>:</strong>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Branch Name"
          name="branch"
          value={data.branch}
          required
        />
        <br />
        <br />

        <label>Country <span style={{color:"red"}}>*</span> </label>
        <strong>:</strong>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Country Name"
          name="country"
          value={data.country}
          required
        />
        <br />
        <br />
      </form>
    );
  }

 
  
  //final page
  function Final(){
      return(
          <div>
          <p>Please verify all the details again and click Submit</p><br/>
          {Basic()}<br/>
          {Contact()}<br/>
          </div>
      )
  }

  //handlechange ...
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    
  }

  function navigation(){
    if(page===1 && (data.firstName==="" || data.lastName==="" || data.role==="" || data.gender==="" || data.age===null)){
      tempAlert("please fill all the required fields in personal details....!",2000,false)
    }
    else if((page===2) && (data.email==="" || data.mobile==="" || data.branch==="" || data.country==="")){
      tempAlert("please fill all the required fields in contact details......!",2000,false)
    }
    else{
      setPage(page + 1);
    }
  }

  function validation(){
    let isValid = true;
      var pattern = RegExp(/^(?!-)[a-zA-Z-]*[a-zA-Z]$/);
      if(!pattern.test(data.firstName) && !pattern.test(data.lastName)){
        isValid = false;
        tempAlert("Name attributes should contain only letters.",2000,false)
      }

      if (!validator.isEmail(data.email)) {
        isValid = false;
        console.log(isValid);
        err["email"] = "Please enter valid email address.";
      }
      else{
        const temp = employees.filter((item)=>{
          return item.email === data.email;
        
      })
      if(temp.length!==0){
        isValid = false;
        console.log(isValid);
        err["email"] = "Email already mapped with another employeee.";
      }
    }
    const temp = employees.filter((item)=>{
      return item.mobile === data.mobile;
    
  })    
      pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(data.mobile) || data.mobile.length !== 10) {
        isValid = false;
        console.log(isValid);
        err["phone"] = "Please enter valid phone number.";
      }else if(temp.length !== 0){
        isValid = false;
        console.log(isValid);
        err["phone"] = "Mobile number mapped with another employee.";
      }
    setErrors(err)
    return isValid
  }

  function handleSubmit() {
    if(validation()){
      axios
      .post("/Employees", data,{
        auth: {
          username: 'admin',
          password: 'admin'
        }})
      .then((res) => console.log(res.data))
      .catch((res) => console.log(res));
    setSubmit(true)
    }
    
  }
  const [api,setApi] = useState(true)

  useEffect(()=>{
      axios.get(`/Employees`,{
        auth: {
          username: 'admin',
          password: 'admin'
        }}).then((res)=>{
          if(api){
              setEmployees(res.data)
              setApi(false);
          }
      })
  },[api,employees])

  return (
    submit?<Redirect to="/employee"/>:<div>
      <div>
            
            <ul className="nav">
                <li>
                    <Link to='/employee'><img src="https://img.icons8.com/material-rounded/48/000000/home-page.png" alt="home"/></Link>
                </li>
                <h2 style={{color:'#fff'}}>Add Employee</h2>
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
          <ul id="progressbar" style={{marginLeft:"25%"}}>
            <li className={active(1)} id="step1">
              <strong> Personal </strong>
            </li>
            <li className={active(2)} id="step2">
              {" "}
              <strong> Contact </strong>{" "}
            </li>
            <li className={active(3)} id="step3">
              {" "}
              <strong> Finish </strong>{" "}
            </li>
          </ul>
        </form>
        <div className="addData">
          {page === 1 && Basic()}
          {page === 2 && Contact()}
          {page === 3 && Final()}
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
          {page < 3 ? (
            <button
              className="btnInfo"
              onClick={navigation}
              id="next"
            >
              Next
            </button>
          ) : (
            <button className="btnInfo" onClick={handleSubmit} id="submit">
              Submit
            </button>
          )}
        </div><br/><br/>
      </div><br/><br/><br/><br/>
    </div>
  );
}

export default AddEmployee;
