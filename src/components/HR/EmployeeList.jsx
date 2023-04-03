import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Link, useHistory } from "react-router-dom";
function EmployeeList(props) {
  const [employees, setEmployees] = useState([]);
  const history = useHistory();

  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  let emp_id = Cookie.get('emp_id');
  const getData = () => {
    axios
      .get("/Employees", {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        setEmployees(res.data);
      });
  };

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

  function rows(){
    return <table cellSpacing={20}>
    <thead>
      <tr>
        <th>Emp Id</th>
        <th>EmployeeName</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
      
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td id={"name" + employee.id}>
            {employee.firstName + " " + employee.lastName}
          </td>
          <td>{employee.role}</td>
          <td>
            <button
              onClick={() => {
                history.push(`/view-info/${employee.id}`);
              }}
              className="btnInfo"
              id={"info" + employee.id}
            >
              More Info
            </button>

            <button
              onClick={() => {
                history.push(`/update-employee/${employee.id}`);
              }}
              id={"updt" + employee.id}
              className="btnUpdt"
            >
              Update
            </button>
            {emp_id == employee.id ? <button className="btnDel" onClick={()=>{tempAlert("You cannot delete yourself.....!",2000,false)}}>Delete</button>:
            <button
              className="btnDel"
              id={"del" + employee.id}
              onClick={() => {
                axios
                  .delete(`/Employees/${employee.id}`,{
                    auth: {
                      username: "admin",
                      password: "admin",
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    setApi(true);
                  });
                  if(employee.user_id!==null){
                    axios
                  .delete(`/Users/${employee.user_id}`,{
                    auth: {
                      username: "admin",
                      password: "admin",
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    setApi(true);
                  }).catch((err)=>{});
                  }
                  
              }}
            >
              Delete
            </button>
            }</td>
        </tr>
      ))}
    </tbody>
  </table>
  }
  const [api, setApi] = useState(true);

  useEffect(() => {
    if(api){
    getData();
    setApi(false);
    }
  }, [api]);
  return (
    <div>
      <div>
        <ul className="nav">
          <li>
            <Link to="/employee">
              <img
                src="https://img.icons8.com/material-rounded/48/000000/home-page.png"
                alt="home"
              />
            </Link>
          </li>
          <h2 style={{ color: "#fff" }} id="head">
            Employee List(<span>{employees.length}</span>)
          </h2>

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
                <Link to="/user-info" id="profile">
                  Profile
                </Link>
                <Link to="/requests" >
                  Requests
                </Link>
                <Link to="/users" >
                  Users
                </Link>
                <Link
                  onClick={() => {
                    props.logout();
                  }}
                  to="/"
                  id="logout"
                >
                  Logout
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <br />
      <div align="center" className="list">
        <br />
        <button
          onClick={() => {
            history.push("/add-employee");
          }}
          className="add"
        >
          {" "}
          <img
            src="https://img.icons8.com/fluency/48/000000/add-user-male.png"
            alt="Add employee"
            id="add"
          />{" "}
        </button>
        <br />
        <br />
        {rows()}
        <br />
        <br />
        <br />
      </div>
      <br />
      <br /><br />
        <br />
        <br />
    </div>
  );
}

export default EmployeeList;
