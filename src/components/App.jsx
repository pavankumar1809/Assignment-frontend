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

  function onLogin(val) {
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
      setLogin(true);
      Cookie.set("isLogin", "yes");
      Cookie.set("role", temp[0].role);
      Cookie.set("dept", temp[0].dept);
      Cookie.set("user_id", temp[0].id);
      Cookie.set("emp_id", temp[0].emp_id);

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

  function logout() {
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
          <Route path="/add-employee">
            {login ? (
              <AddEmployee logout={logout} />
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
            {login?<Redirect to="/employee" />:<Register register = {register}/>}
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
