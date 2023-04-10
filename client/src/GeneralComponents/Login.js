import { useState } from "react"
import { useNavigate } from "react-router-dom"

import styled from "styled-components"
function Login({setUser}) { 
    console.log('login rendered')
    const [loginParameters, setLoginParameters] = useState({username:"" , password:""})
    const [errors, setErrors] = useState(null)

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
            navigate('/')
        }
        else{
            res.json().then(errorData => setErrors(errorData.error))
        }
       
    })
    }
    return (
    <FormContainer>
        {errors ? <ErrorsStyled>{errors}</ErrorsStyled> : <></>}
         <StyledForm onSubmit={handleSubmit} >
          <label>
            Username:
            <input type="text" name="username" value = {loginParameters['username']} onChange={handleChange} ></input>
          </label>
          
          <label>
            Password:
          <input type="password" name="password" value = {loginParameters['password']} onChange={handleChange} ></input>
          </label>

          <input className='submitBtn' type="submit" value = "Log in"></input>
        </StyledForm>

    </FormContainer>
    )
}

export default Login


const FormContainer = styled.div`
display: inline-block;
position: absolute;
margin-top: 5vh;
left: 30vw;

`

const StyledForm = styled.form `
  border: solid;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 30vw;
  font-size: 25px;

  input.submitBtn{
    border: none;
    background: none;
    font-size: 25px;
    text-decoration: underline;
    padding-bottom: 20px;
    cursor: pointer;
}
`

const ErrorsStyled = styled.h1`
color: red;
display: inline-block;
font-size: 20px;
width: fit-content;
margin-left: auto;
margin-right: auto;
`