import React from 'react';
import UpdateEmployee from './HR/UpdateEmployee';
import UpdateSalary from './Salary/UpdateSalary';
import Cookie from "js-cookie"

function Update(props) {
    return (
        <div>
        {props.dept === "HR" && Cookie.get("role")==="Employee" && <UpdateEmployee logout={props.logout}/>}
        {props.dept==="Salary" && Cookie.get("role")==="Employee" &&<UpdateSalary logout={props.logout}/>}
        </div>
        )
      }

export default Update;
