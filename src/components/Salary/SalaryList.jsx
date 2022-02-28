import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SalaryList(props) {
  const [employees, setEmployees] = useState([]);
  const history = useHistory();

  axios.defaults.baseURL = "http://localhost:8080/api/v1";

  const getData = () => {
    axios.get("/Employees",{
      auth: {
        username: 'admin',
        password: 'admin'
      }}).then((res) => {
      setEmployees(res.data);
    });
  };

  function button(employee) {
    if (
      employee.base !== 0 &&
      employee.bank !== "" &&
      employee.acc_no !== "" &&
      employee.ifsc !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    let api = true;
    if (api) {
      getData();
    }
    return () => {
      api = false;
    };
  }, [history]);
  return (
    <div>
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
            <h2 style={{ color: "#fff" }}>Employee List(<span>{employees.length}</span>)</h2>

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
                  <Link to="/users" id="users">Users</Link>
                  <Link
                    onClick={() => {
                      props.logout();
                    }}
                    to="/"
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
          <br />
          <table cellSpacing={20}>
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
                  <td>{employee.firstName + " " + employee.lastName}</td>
                  <td>{employee.role}</td>
                  <td>
                    <button
                      onClick={() => {
                        history.push(`/view-info/${employee.id}`);
                      }}
                      className="btnInfo"
                      id={"info"+employee.id}
                    >
                      More Info
                    </button>

                    <button
                      onClick={() => {
                        history.push(`/update-employee/${employee.id}`);
                      }}
                      className="btnUpdt"
                      id={"sal"+employee.id}
                    >
                      {button(employee)?"Update":"Add"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
          <br />
        </div>
        <br />
        <br /><br />
        <br /><br />
        <br />
      </div>
    </div>
  );
}

export default SalaryList;
