import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function Register(props) {
    const [data,setData] = useState([])
    const [user,setUser] = useState({
      dept: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      role:"",
      gender: "",
      age: "",
    })
    
    axios.defaults.baseURL = "http://localhost:8080/api/v1";

    const history = useHistory()

    function tempAlert(msg, duration, status) {
        var box = document.createElement("div");
        box.setAttribute(
          "style",status?
          " position:absolute;left:35%; margin:auto;top:22%;background-color:#95CD41;color:#fff;width:30%; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;":
          " position:absolute;left:35%; margin:auto;top:10%;background-color:#F14A16;color:#fff;width:30%; box-shadow: 0 1px 5px rgb(138, 137, 137);padding:15px;border-radius:5px;"
        );
        box.innerHTML = msg;
        setTimeout(function () {
          box.parentNode.removeChild(box);
        }, duration);
        document.body.appendChild(box);
      }

    function getData(){
        axios.get("/Users", {
          auth: {
            username: "admin",
            password: "admin",
          },
        }).then(res => {
            setData(res.data)
        })
    }

    function handleChange(e){
        const { name, value } = e.target;
    
        setUser(prevUser => {
          return {
            ...prevUser,
            [name]: value
          };
        });
    }

    async function didRegister(e){
        e.preventDefault()
        console.log(data)
        if(user.dept !== "" && user.username !== "" && user.password !== "" && user.firstName !== "" && user.role !== ""){
        if(validation()){
        const temp = data.filter((item)=>{
            return item.username === user.username ;
        })
        if(temp.length===0){
          

          await  axios.post("/Requests",user, {
              auth: {
                username: "admin",
                password: "admin",
              },
            }).then(res=>{
                console.log(res.data);
               // employee.id = res.data.id
            })
            //props.register(user,employee)
            tempAlert("Regitration request sent successfully...Please wait for someone to approve your request.... You will be redirected to Login page...",3000,true)
            //alert("Regitered Successfully... You will be redirected to Login... press OK to continue....!")
            history.push('/')
            //window.location.reload()
        }
        else{
            setUser({
              dept: user.dept,
              firstName: user.firstName,
              lastName: user.lastName,
              username: "",
              password: "",
              role:user.role,
              gender: user.gender,
              age: user.age,
            })
            tempAlert("username already exists",2000,false)
            //alert("username already exists")
        }
    }
        }
        else
        {
            tempAlert("please fill all the required details",2000,false)
            //alert("please fill all the required details")
        }
        
    }

    function validation(){
        let isValid = true;
              
          if (user.username.length<4) {
            isValid = false;
            console.log(isValid);
            tempAlert("Please enter valid username.",2000,false)
            setUser({
              dept: user.dept,
              firstName: user.firstName,
              lastName: user.lastName,
              username: "",
              password: "",
              role:user.role,
              gender: user.gender,
              age: user.age,
            })
          }
              
          var pattern = new RegExp("(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"); //'/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/';
          if (!pattern.test(user.password)) {
            isValid = false;
            console.log(isValid);
            tempAlert("Password should be atleast 8 characters, and should contain a special charater, a capital letter, a small letter and a number....",2000,false)
            setUser({
              dept: user.dept,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              password: "",
              role:user.role,
              gender: user.gender,
              age: user.age,
            })
          }
        
        return isValid
      }

    useEffect(() => {
        let api = true;
        if(api){
        getData();
        }
        return ()=>{
            api=false
        }
      }, [user]);

    return (
        <div><br/>
            <form className='addData'>
            <h3>Register</h3><br/><br/>
            <select
          id="dept"
          name="dept"
          onChange={handleChange}
          defaultValue={user.dept}
          required
        >
          <option value="" disabled hidden>--department--</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Salary">Salary</option>
        </select><br/><br/>
        <input onChange={handleChange} type='text' placeholder='Enter First Name *' name='firstName' value={user.firstName} required/><br/><br/>
        <input onChange={handleChange} type='text' placeholder='Enter Last Name *' name='lastName' value={user.lastName}/><br/><br/>
        <input onChange={handleChange} type='text' placeholder='Enter User Name *' name='username' value={user.username} required/><br/><br/>
        <input onChange={handleChange} type='password' placeholder='Password *' name='password' value={user.password}  required/><br/><br/>
        <select
          name="role"
          onChange={handleChange}
          defaultValue={user.role}
          required
        >
          <option value="" disabled hidden>--role--</option>
          <option value="Intern">Intern</option>
          <option value="Employee">Employee</option>
          
        </select><br/><br/>
        <select
          name="gender"
          onChange={handleChange}
          defaultValue={user.gender}
          required
        >
          <option value="" disabled hidden>--Gender--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select><br/><br/>
        <input onChange={handleChange} type='number' placeholder='Enter age *' name='age' value={user.age} required/><br/><br/>
            <button type='submit' onClick={didRegister} className='btnUpdt'>Register</button><br/><br/>
            <Link to='/user/login'>Already have an Account?</Link>
        </form>
        <br/><br/><br/><br/><br/>
        </div>
    )
}

export default Register
