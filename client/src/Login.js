import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
function Login({setUser}) { 

    const [loginParameters, setLoginParameters] = useState({username:"" , password:""})

    const navigate = useNavigate()

    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setLoginParameters({...loginParameters, [key]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginParameters)
        }).then(res => {
        if(res.ok){
            res.json().then((user) => setUser(user))
        }
        else{
            res.json().then(errorData => console.log(errorData.error))
        }
        navigate('/')
    })
    }
    return (
    <div>

         <form onSubmit={handleSubmit} >
          <label>
            Username:
            <input type="text" name="username" value = {loginParameters['username']} onChange={handleChange} ></input>
          </label>
          
          <label>
            Password:
          <input type="password" name="password" value = {loginParameters['password']} onChange={handleChange} ></input>
          </label>

          <input className='submitBtn' type="submit" value = "Log in"></input>
        </form>

    </div>
    )
}

export default Login