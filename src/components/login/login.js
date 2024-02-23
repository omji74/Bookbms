import React,{useState} from "react"
import "./login.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login  = () =>{
    const history = useNavigate()
    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
        
    }
    const login = ()=>{

        const {email,password} = user
        if(email && password)
        {

        axios.post("http://localhost:5000/login",user)
         .then(res=>alert(res.data.message))
        }
        else{
            alert("Invalid id and password")
        }
    }
    return (
        <div className="login">
            {console.log("Login",user)}
            <h1> Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter Your email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="enter your password"></input>

            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history("/register")}>Register</div>
        </div>
    )
}
export default Login;
