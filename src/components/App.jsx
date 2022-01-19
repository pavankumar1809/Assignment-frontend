import React, { useEffect, useState } from 'react'
import EmployeeList from './EmployeeList'
//import Footer from './Footer'
import Header from './Header'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import AddEmployee from './AddEmployee'
import UpdateEmployee from './UpdateEmployee'
import ViewInfo from './ViewInfo'
import Register from './Register'
import Login from './Login'
import axios from 'axios'
import Cookie from 'js-cookie'
import UserProfile from './UserProfile'
import SalaryList from './SalaryList'
function App() {

    const [login,setLogin]=useState(false)
    const [cred,setCred] = useState([])
    
    axios.defaults.baseURL = "http://localhost:8080/api";

    function onLogin(val){
        const temp = cred.filter((item)=>{
            console.log(item);
            console.log(val);
            const t = {
                dept:item.dept,
                username:item.username,
                password:item.password,
            }
            return JSON.stringify(t) === JSON.stringify(val) 
        })
        if(temp.length===0){
            setLogin(false);
            alert("Incorrect username/password !")
        }
        else{
            setLogin(true)
            Cookie.set("user","loginTrue")
            document.cookie = `dept=${val.dept}`
            document.cookie = `username=${val.username}`
            alert("Login Successful.....")
        }
        
    };
    function readLogin(){
        const userlogin = Cookie.get('user')
        if(userlogin){
            setLogin(true)
        }
    }

    function logout(){
        Cookie.remove('user')
        setLogin(false)
        
    }

    useEffect(()=>{
        let api = true
        readLogin()
        if(api){
            axios.get("/users").then(res=>{
                setCred(res.data)
            })
        }
        return ()=>{
            api=false
        }
    },[])
    return (
        <div>
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact>{login ? <EmployeeList logout={logout}/>:<Redirect to="/user/login"/>}</Route>
                <Route path="/employee">{login ? <EmployeeList logout={logout}/>:<Login onLogin={onLogin}/>}</Route>
                <Route path="/add-employee">{login ? <AddEmployee logout={logout}/>:<Redirect to="/user/login"/>&& <Login onLogin={onLogin}/>}</Route>
                <Route path="/update-employee/:id">{login ? <UpdateEmployee logout={logout}/>:<Redirect to="/user/login"/>&& <Login onLogin={onLogin}/>}</Route>
                <Route path="/view-info/:id">{login ? <ViewInfo logout={logout}/>:<Login onLogin={onLogin}/>}</Route>
                <Route path="/user-info">{login ? <UserProfile user={{dept:Cookie.get('dept'),username:Cookie.get('username')}} logout={logout}/>:<Login onLogin={onLogin}/>}</Route>
                <Route path="/user/register" ><Register/></Route>
                <Route path="/user/login" >{login ? <Redirect to="/employee"/>:<Login onLogin={onLogin}/>}</Route>
                <Route path="/salary/employee">{login ? <SalaryList logout={logout}/>:<Login onLogin={onLogin}/>}</Route>
            </Switch>
            {/* <Footer/> */}
        </Router>
        </div>
    )
}

export default App
