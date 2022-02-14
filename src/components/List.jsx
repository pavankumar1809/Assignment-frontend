import React from 'react';
import EmployeeList from './HR/EmployeeList';
import ITList from './IT/ITList';
import SalaryList from './Salary/SalaryList';
import Cookie from "js-cookie";
function List(props) {
  return (
  <div>
  {props.dept==="IT" && <ITList logout={props.logout}/>}
  {props.dept==="Salary" && Cookie.get("role")==="Employee" && <SalaryList logout={props.logout}/>}
  {props.dept==="Salary" && Cookie.get("role")==="Intern" && <ITList logout={props.logout}/>}
  {props.dept==="HR" && Cookie.get("role")==="Employee" &&<EmployeeList logout={props.logout}/>}
  {props.dept==="HR" && Cookie.get("role")==="Intern" &&<ITList logout={props.logout}/>}
  
  </div>
  )
}

export default List;
