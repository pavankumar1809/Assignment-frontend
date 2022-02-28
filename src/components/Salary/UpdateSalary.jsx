import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
function UpdateSalary(props) {

  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const {id} = useParams()
  const [page, setPage] = useState(1);
  const [data,setData] = useState({
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
  })
  
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
  const history = useHistory()
 

  function Contact() {
    return (
      <form>
        <h3 style={{ color: "red" }}>Contact Details</h3>
        <br /><br/>
        <label>Email-Id </label>
        <strong>:</strong>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Email-Id"
          name="email"
          value={data.email}
         
        />
        <br />
        <br />

        <label>Mobile </label>
        <strong>:</strong>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          name="mobile"
          defaultValue={data.mobile}
          
        />
        <br />
        <br />

        <label>Branch </label>
        <strong>:</strong>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Branch Name"
          name="branch"
          value={data.branch}
          disabled
        />
        <br />
        <br />

        <label>Country </label>
        <strong>:</strong>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Country Name"
          name="country"
          value={data.country}
          disabled
        />
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
        <label>Base Pay <span style={{color:"red"}}>*</span> </label>
        <strong>:</strong>
        <input
          type="number"
          onChange={handleChange}
          placeholder="Enter Salary Amount..."
          name="base"
          defaultValue={data.base}
        />
        <br />
        <br />

        <label>Bonus Pay </label>
        <strong>:</strong>
        <input
          type="number"
          onChange={handleChange}
          placeholder="Enter Salary Amount..."
          name="bonus"
          defaultValue={data.bonus}
        />
        <br />
        <br />
      </form>
    );
  }

  //bank details
  function Bank(){
    return(
    <form>
    <h3 style={{ color: "red" }}>Bank Account Details</h3>
    <br /><br/>
    <label>Bank Name <span style={{color:"red"}}>*</span></label>
    <strong>:</strong>
    <input
      type="text"
      onChange={handleChange}
      placeholder="Enter Bank Name"
      name="bank"
      value={data.bank}
    />
    <br />
    <br />

    <label>Account Number <span style={{color:"red"}}>*</span></label>
    <strong>:</strong>
    <input
      type="text"
      onChange={handleChange}
      placeholder="Enter Account Number"
      name="acc_no"
      value={data.acc_no}
    />
    <br />
    <br />

    <label>IFSC Code <span style={{color:"red"}}>*</span></label>
    <strong>:</strong>
    <input
      type="text"
      onChange={handleChange}
      placeholder="Enter IFSC Code"
      name="ifsc"
      value={data.ifsc}
    />
    <br />
    <br />
  </form>
    )
  }

  //final page
  function Final(){
      return(
          <div>
          <p>Please verify all the details again and click Submit</p><br/>
          
          {Contact()}<br/>
          {Salary()}<br/>
          {Bank()}
          </div>
      )
  }


  function active(id) {
    if (page === id) {
      return "active";
    } else if (page > id) {
      return "success";
    } else {
      return "";
    }
  }


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
  const [submit,setSubmit] = useState(false)

  function handleSubmit() {
    axios
      .post(`/Employees/${id}`, data,{
        auth: {
          username: 'admin',
          password: 'admin'
        }})
      .then((res) => console.log(res.data))
      .catch((res) => console.log(res));
    setSubmit(true)
    
  }

  function navigation(){
    if(page===2 && data.base < 10000 ){
      tempAlert("Enter Valid amount....!",2000,false)
    }
    else if(page===1 && (data.email==="" || data.mobile==="" )){
      tempAlert("please fill all the required fields in contact details......!",2000,false)
    }
    else if(page===3 && (data.bank==="" || data.acc_no==="" || data.ifsc==="")){
      tempAlert("please fill all the required details......!",2000,false)
    }
    else{
      setPage(page + 1);
    }
  }

  const [api,setApi] = useState(true)

  useEffect(()=>{
      axios.get(`/Employees/${id}`,{
        auth: {
          username: 'admin',
          password: 'admin'
        }}).then((res)=>{
          if(api){
              setData(res.data)
              setApi(false);
          }
      })
  },[data,api,id])
  return (submit?<Redirect to="/employee"/>:
    <div>
        <div>
            
            <ul className="nav">
                <li>
                    <Link to='/employee'><img src="https://img.icons8.com/material-rounded/48/000000/home-page.png" alt="home"/></Link>
                </li>
                <h2 style={{color:'#fff'}}>Update Employee</h2>
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
              {" "}
              <strong> Contact </strong>{" "}
            </li>
            <li className={active(2)} id="step2">
              {" "}
              <strong> Salary </strong>{" "}
            </li>
            <li className={active(3)} id="step3">
              {" "}
              <strong> Bank </strong>{" "}
            </li>
            <li className={active(4)} id="step4">
              {" "}
              <strong> Finish </strong>{" "}
            </li>
          </ul>
        </form>
        <div className="addData">
          {page === 1 && Contact()}
          {page === 2 && Salary()}
          {page === 3 && Bank()}
          {page === 4 && Final()}
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
          {page < 4 ? (
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
        </div><br/><br/>
    </div>
  );
}

export default UpdateSalary;
