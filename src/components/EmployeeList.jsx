import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
function EmployeeList(props) {
  const [employees, setEmployees] = useState([]);
  const history = useHistory();

  axios.defaults.baseURL = "http://localhost:8080/api";
  const getData = () => {
    axios.get("/employees").then((res) => {
      setEmployees(res.data);
    });
  };

  useEffect(() => {
    let api = true;
    if (api) {
      getData();
    }
    return () => {
      api = false;
    };
  }, []);
  return (
    <div>
      <div>
        <ul className="nav">
          <li>
            <Link to="/employee">Home</Link>
          </li>
          <h2 style={{ color: "#fff" }}>Employee List</h2>
         
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
          />{" "}
        </button>
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
                  >
                    More Info
                  </button>
                  <button
                    onClick={() => {
                      history.push(`/update-employee/${employee.id}`);
                    }}
                    className="btnUpdt"
                  >
                    Update
                  </button>
                  <button
                    className="btnDel"
                    onClick={() => {
                      axios.delete(`/employees/${employee.id}`).then((res) => {
                        console.log(res.data);
                      });
                    }}
                  >
                    Delete
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
      <br />
    </div>
  );
}

export default EmployeeList;
