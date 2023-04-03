import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users(props) {
  const [users,setUsers] = useState([])
  const [api,setApi] = useState(true)

  function lastActive(user){
    let s = new Date().getTime() - new Date(user.last_loggedin).getTime()
    let x = new Date(user.date_created).getTime() - new Date(user.last_loggedin).getTime()
    s = Math.ceil(s/60000)
    if(user.active === "yes"){
      return <span>Active now</span>
    }
    else if(x === 0){
      return <span>Never logged</span>
    }
    else if(s<60){
      return s===1?<span>Active {s} min ago</span>:<span>Active {s} mins ago</span>
    }
    else{
      s=Math.floor(s/60)
      if(s<24){
        return  s===1?<span>Active {s} hour ago</span>:<span>Active {s} hours ago</span>
      }
      else{
        s=Math.floor(s/24)
        if(s<30){
          return  s===1?<span>Active {s} day ago</span>:<span>Active {s} days ago</span>
        }
        else{
          s=Math.floor(s/30)
          if(s<12){
            return  s===1?<span>Active {s} month ago</span>:<span>Active {s} months ago</span>
          }
          else{
            s=Math.floor(s/12)
            return  s===1?<span>Active {s} year ago</span>:<span>Active {s} years ago</span>
          }
        }
      }
    }

  }
  useEffect(()=>{
    
    if (api) {
        axios.get(`/Users`,{
        auth: {
          username: 'admin',
          password: 'admin'
        }}).then((res) => {
          setUsers(res.data);
        });
      }
      
      return () => {
        setApi(false);
      };
  })
  return <div>
      <div>
      <ul className="nav">
                <li>
                    <Link to='/employee'><img src="https://img.icons8.com/material-rounded/48/000000/home-page.png" alt="home"/></Link>
                </li>
                <h2 style={{color:'#fff'}}>Users({users.length})</h2>
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
      <br/><br/>
      <div className="list">
        <br/><br/>
          {users.map((user)=>(
            <div key={user.id}>
              <div className="user">
              <p style={{position:"absolute"}}>{user.active === "yes" ?"🟢": "⚪"}</p>
              <h3>{user.firstName +" "+ user.lastName}</h3>
              <p>{user.dept}<br/>{lastActive(user)}</p>
              
              </div>
              <br/>
              </div>
          )
          )}
      </div>
      <br/><br/><br/>
  </div>;
}

export default Users;
