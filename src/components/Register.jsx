import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function Register() {
    const [data,setData] = useState([])
    const [user,setUser] = useState({
        dept:"",
        username:"",
        password:"",
    })

    axios.defaults.baseURL = "http://localhost:8080/api";

    const history = useHistory()
    function getData(){
        axios.get("/users").then(res => {
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

    function didRegister(e){
        console.log(data)
        if(user.dept !== "" && user.username !== "" && user.password !== ""){
        const temp = data.filter((item)=>{
            return item.username === user.username && item.dept === user.dept;
        })
        if(temp.length===0){

            axios.post("/users",user).then(res=>{
                console.log(res.data);
            })
            setUser({
                dept : '',
                username : '',
                password : '',
            }
            )
            alert("Regitered Successfully... You will be redirected to Login... press OK to continue....!")
            history.push('/')
            window.location.reload()
        }
        else{
            setUser({
                dept : '',
                username : '',
                password : '',
            })
            alert("username already exists")
        }
        }
        else
        {
            alert("please fill all the required details")
        }
        e.preventDefault()
    }

    useEffect(() => {
        let api = true;
        if(api){
        getData();
        }
        return ()=>{
            api=false
        }
      }, [data]);

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
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Salary">Salary</option>
        </select><br/><br/>
            <input onChange={handleChange} type='text' placeholder='Enter User Name *' name='username' value={user.username} required/><br/><br/>
            <input onChange={handleChange} type='password' placeholder='Password *' name='password' value={user.password} required/><br/><br/>
            <button type='submit' onClick={didRegister} className='btnUpdt'>Register</button><br/><br/>
            <Link to='/user/login'>Already have an Account?</Link>
        </form>
        </div>
    )
}

export default Register
