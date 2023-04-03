import React from 'react';
import ViewInfoIT from './IT/ViewInfoIT';
import ViewInfoSalary from './Salary/ViewInfoSalary';
import ViewInfo from './HR/ViewInfo';
import { useParams } from 'react-router-dom';

function Info(props) {
  const {id} = useParams()
  return (
      <div>

        {props.dept==="IT" && <ViewInfoIT logout={props.logout} id={id}/>}
        {props.dept==="Salary" && <ViewInfoSalary logout={props.logout} id={id}/>}
        {props.dept==="HR" && <ViewInfo logout={props.logout} id={id}/>}
        <br/><br/>
      </div>
  );
}

export default Info;
