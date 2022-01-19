import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
function UpdateEmployee(props) {

  axios.defaults.baseURL = "http://localhost:8080/api";
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
  

  const history = useHistory()

  function Basic() {
    return (
      <form>
        <h3 style={{ color: "red" }}>Basic Details</h3>
        <br />
        <br />
        <label>First Name </label>
        <strong>:</strong>
        <input
          className="text"
          type="text"
          onChange={handleChange}
          placeholder="Enter first name"
          name="firstName"
          value={data.firstName}
        />
        <br />
        <br />
        <label>Last Name</label>
        <strong>:</strong>
        <input
          className="text"
          onChange={handleChange}
          type="text"
          placeholder="Enter Lastname name"
          name="lastName"
          value={data.lastName}
        />
        <br />
        <br />

        <label htmlFor="role">Role</label>
        <strong>:</strong>
        <select
          id="role"
          name="role"
          className="gen"
          onChange={handleChange}
          value={data.role}
        >
          <option value="Intern">Intern</option>
          <option value="Employee">Employee</option>
          <option value="Lead">Lead</option>
          <option value="Manager">Manager</option>
        </select>
        <br />
        <br />

        <label htmlFor="gender">Gender</label>
        <strong>:</strong>
        <select
          id="gender"
          name="gender"
          className="gen"
          onChange={handleChange}
          value={data.gender}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <br />

        <label>Age </label>
        <strong>:</strong>
        <input
          className="text"
          type="number"
          onChange={handleChange}
          placeholder="Enter age"
          name="age"
          defaultValue={data.age}
        />
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
        <label>Base Pay </label>
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
    <label>Bank Name </label>
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

    <label>Account Number </label>
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

    <label>IFSC Code </label>
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
          {Basic()}<br/>
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
    console.log(data);
  }

  function handleSubmit() {
    axios
      .post(`/employee/${id}`, data)
      .then((res) => console.log(res.data))
      .catch((res) => console.log(res));
    history.push('/employee')
  }

  const [api,setApi] = useState(true)

  useEffect(()=>{
      axios.get(`/employees/${id}`).then((res)=>{
          if(api){
              setData(res.data)
              setApi(false);
          }
      })
  })
  return (
    <div>
        <div>
            
            <ul className="nav">
                <li>
                    <Link to='/employee'>Home</Link>
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
          <ul id="progressbar">
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
            <li className={active(5)} id="step5">
              {" "}
              <strong> Finish </strong>{" "}
            </li>
          </ul>
        </form>
        <div className="addData">
          {page === 1 && Basic()}
          {page === 2 && Contact()}
          {page === 3 && Salary()}
          {page === 4 && Bank()}
          {page === 5 && Final()}
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
          {page < 5 ? (
            <button
              className="btnInfo"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </button>
          ) : (
            <button className="btnInfo" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
        </div>
    </div>
  );
}

export default UpdateEmployee;
