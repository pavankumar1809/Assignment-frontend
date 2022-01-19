import React from "react";
import { Link } from "react-router-dom";

function UserProfile(props) {
  return (
    <div>
    <div>
            
            <ul className="nav">
                <li>
                    <Link to='/employee'>Home</Link>
                </li>
                <h2 style={{color:'#fff'}}>User Details</h2>
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
      <div className="addData">
        <h3>{props.user.username}`s Profile</h3><br/><br/>
        <label>Department</label><strong>:</strong><label className="data">{props.user.dept}</label><br/><br/>
        <label>User Name</label><strong>:</strong><label className="data">{props.user.username}</label> <br/><br/>
      </div>
    </div>
  );
}

export default UserProfile;
