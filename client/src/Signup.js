import { useState } from "react"

function Signup (){
    const [newUserParams, setNewUserParams] = useState({username:"" , password: "", name: "", bio: "", image_url: ""})

    const [errorData, setErrorData] = useState()

    function errorAlerts () {
        const alerts = errorData.errors.map((error) => <h1>{error}</h1>)
        return alerts
    }

    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setNewUserParams({...newUserParams, [key]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch("/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUserParams)
        }).then(res => {
        if(res.ok){
            res.json().then((user) => console.log(user))
        }
        else{
            res.json().then(errorData => setErrorData(errorData))
        }
       
    })
    }

    return (
    <div>
        {errorData ? errorData.errors.map((error, i) => <h1 key={i}>{error}</h1>) : <></>}
         <form onSubmit={handleSubmit} >
          <label>
            Username:
            <input type="text" name="username" value = {newUserParams['username']} onChange={handleChange} ></input>
          </label>
          
          <label>
            Password:
          <input type="password" name="password" value = {newUserParams['password']} onChange={handleChange} ></input>

          <label>
            Name:
            <input type="text" name="name" value = {newUserParams['name']} onChange={handleChange} ></input>
          </label>

          <label>
            Bio:
            <input type="text" name="bio" value = {newUserParams['bio']} onChange={handleChange} ></input>
          </label>

          <label>
            Image:
            <input type="text" name="image_url" value = {newUserParams['image_url']} onChange={handleChange} ></input>
          </label>

          </label>

          <input className='submitBtn' type="submit" value = "Signup"></input>
        </form>

    </div>
    )
}

export default Signup