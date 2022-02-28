import React, { useEffect, useState } from "react";
import Footer from './User/Footer'
import Header from "./User/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import UpdateEmployee from './IT/UpdateEmployee'
import Register from "./User/Register";
import Login from "./User/Login";
import axios from "axios";
import Cookie from "js-cookie";
import UserProfile from "./User/UserProfile";
import List from "./List";
import Update from "./Update";
import AddEmployee from "./HR/AddEmployee";
import Info from "./Info";
import UserInfo from "./User/UserInfo";
import Password from "./User/Password";
import Requests from "./HR/Requests";
import RequestInfo from "./HR/RequestInfo"
import Users from "./User/Users";
function App() {
  const [login, setLogin] = useState(false);
  const [cred, setCred] = useState([]);
  axios.defaults.baseURL = "http://localhost:8080/api/v1/";
  
  

  function tempAlert(msg, duration, status) {
    var box = document.createElement("div");
    box.setAttribute(
      "style",status?
      " position:absolute;left:40%; margin:auto;top:22%;background-color:#95CD41;color:#fff;width:300px; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;":
      " position:absolute;left:40%; margin:auto;top:10%;background-color:#F14A16;color:#fff;width:300px; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;"
    );
    box.innerHTML = msg;
    setTimeout(function () {
      box.parentNode.removeChild(box);
    }, duration);
    document.body.appendChild(box);
  }

  async function onLogin(val) {
    const temp = cred.filter((item) => {
      const t = {
        dept: item.dept,
        username: item.username,
        password: item.password,
      };
      return JSON.stringify(t) === JSON.stringify(val);
    });
    if (temp.length === 0) {
      setLogin(false);
      //alert("Invalid Credentials !")
      tempAlert("Invalid Credentials....!",2000,false)
    } else {
      temp[0].active = "yes"
      await axios.post(`/Users/${temp[0].id}`,temp[0], {
        auth: {
          username: "admin",
          password: "admin",
        },
      }).then(res=>{
          console.log(res.data);
      })
      setLogin(true);
      Cookie.set("isLogin", "yes",{expires:3});
      Cookie.set("role", temp[0].role,{expires:3});
      Cookie.set("dept", temp[0].dept,{expires:3});
      Cookie.set("user_id", temp[0].id,{expires:3});
      Cookie.set("emp_id", temp[0].emp_id,{expires:3});

      // alert("Login Successful.....")
      tempAlert("Login Successfull...",2000,true)
    }
  }

  async function register(user,employee){
    
   
    console.log(user);
    user.emp_id = employee.id
    console.log(user);
    await axios.post("/Users",user, {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).then(res=>{
        console.log(res.data);
        employee.user_id = res.data.id
    })
  await axios.post(`/Employees/${employee.id}`,employee, {
    auth: {
      username: "admin",
      password: "admin",
    },
  }).then(res=>{
      console.log(res.data);
  })
  }

  function readLogin() {
    const userlogin = Cookie.get("isLogin");
    if (userlogin) {
      setLogin(true);
    }
  }

  async function logout() {
    let user = {}
    await axios.get(`/Users/${Cookie.get("user_id")}`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).then(res=>{
        user = res.data
    })
    console.log(user);
    user.last_loggedin = new Date()
    user.active = null
    await axios.post(`/Users/${Cookie.get("user_id")}`,user, {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).then(res=>{
        console.log(res.data);
    })

    let s = user.last_loggedin.getTime() - new Date(user.date_created).getTime()
    s = Math.ceil(s/60000)
    console.log(`${s} mins ago`)

    Cookie.remove("isLogin");
    Cookie.remove("dept");
    Cookie.remove("role");
    Cookie.remove("user_id");
    Cookie.remove("emp_id");
    setLogin(false);
  }

  useEffect(() => {
    let api = true;
    
    readLogin()
    if (api) {
      axios.get(`/Users`,{
      auth: {
        username: 'admin',
        password: 'admin'
      }}).then((res) => {
        setCred(res.data);
      });
      
    }
    
    return () => {
      api = false;
    };
  }, [cred]);
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            {login ? (
              <Redirect to="/employee" />
            ) : (
              <Redirect to="/user/login" />
            )}
          </Route>
          <Route path="/employee">
            {login ? (
              <List dept={Cookie.get("dept")} logout={logout} />
            ) : (
              <Redirect to="/user/login" />
            )}
          </Route>
          <Route path="/requests">
            {login ? (
              <Requests dept={Cookie.get("dept")} logout={logout} />
            ) : (
              <Redirect to="/user/login" /> && <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/add-employee">
            {login ? (
              <AddEmployee logout={logout} />
            ) : (
              <Redirect to="/user/login" /> && <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/users">
            {login ? (
              <Users logout={logout} />
            ) : (
              <Redirect to="/user/login" /> && <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/update-employee/:id">
            {login ? (
              <Update dept={Cookie.get("dept")} logout={logout} />
            ) : (
              <Redirect to="/user/login" /> && <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/view-info/:id">
           
            {login ? (
              <Info dept={Cookie.get("dept")} logout={logout} />
            ) : (
              <Redirect to="/employee" /> && <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/request/:id">
           
            {login ? (
              <RequestInfo dept={Cookie.get("dept")} register = {register} logout={logout} />
            ) : (
              <Redirect to="/employee" /> && <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/more-info">
           
            {login ? (
              <UserInfo dept={Cookie.get("dept")} logout={logout} />
            ) : (
              <Redirect to="/employee" /> && <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/change-password">
           
            {login ? (
              <Password logout={logout} />
            ) : (
              <Redirect to="/employee" /> && <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/user-info">
            {login ? (
              <UserProfile
                user={{
                  dept: Cookie.get("dept"),
                  username: Cookie.get("username"),
                }}
                logout={logout}
              />
            ) : (
              <Login onLogin={onLogin} />
            )}
          </Route>
          <Route path="/user/register">
            {login?<Redirect to="/employee" />:<Register/>}
          </Route>
          <Route path="/user/login">
            {login ? <Redirect to="/" /> : <Login onLogin={onLogin} />}
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
