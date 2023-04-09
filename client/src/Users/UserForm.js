import { useState , useEffect } from "react"
import { useNavigate } from "react-router-dom";
import styled  from 'styled-components';

function UserForm ({user , setUser, handleUserChange}){
  console.log('user form rendered')
    const [newUserParams, setNewUserParams] = useState({username:"" , password: "", password_confirmation: "", name: "", bio: "", image_url: ""})
    const [errorData, setErrorData] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
      if (user){setNewUserParams({...newUserParams, ['username']:user.username, ['name']: user.name, ['bio']: user.bio, ['image_url']: user.image_url})}
    }, [])
  
    function handleChange(e){
        const key = e.target.id
        const value = e.target.value
        setNewUserParams({...newUserParams, [key]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        if(user){
          fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUserParams)
            }).then(res => {
            if(res.ok){
                res.json().then((editedUser) =>{
                  setUser(editedUser)
                  handleUserChange(editedUser)
                
                }).then( navigate('/'))
                
            }
              else{
                  res.json().then(errorData => setErrorData(errorData))
              }})
        }
              else{  fetch("/users", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newUserParams)
                }).then(res => {
                if(res.ok){
                    res.json().then((userObj) =>{
                      handleUserChange(userObj)
                    })
                    navigate('/login')
                }
                else{
                    res.json().then(errorData => setErrorData(errorData))
                }})}
    }

    return (
    <>
        { errorData ? <ErrorsStyled>Uh-oh:{errorData.errors.map((error, i) => <p key={i}>{error}</p>)}</ErrorsStyled> : <></>}

        <FormContainer>
            <StyledForm onSubmit={handleSubmit} >
              <label for="username">
                Username:
              </label>

              <input type="text" id="username" value = {newUserParams['username']} onChange={handleChange} ></input>
              
              <label for="password">
                Password:
              </label>
              <input type="password" id="password" value = {newUserParams['password']} onChange={handleChange} ></input>

              <label for="password_confirmation">
                Confirm Password:
              </label>
              <input type="password" id="password_confirmation" value = {newUserParams['password_confirmation']} onChange={handleChange} ></input>

              <label for="name">
                Name:
              </label>

              <input type="text" id="name" value = {newUserParams['name']} onChange={handleChange} ></input>

              <label for = "bio">
                Bio:
              </label>
                <textarea id="bio" value = {newUserParams['bio']} onChange={handleChange} ></textarea>

              <label for = "image_url">
                Image:
              </label>
              <input type="text" id="image_url"  value = {newUserParams['image_url']} onChange={handleChange} ></input>

              <input className='submitBtn' type="submit" value = {user ? 'Edit' : 'Signup'}></input>
            </StyledForm>
        </FormContainer>
         

    </>
    )
}

export default UserForm

const ErrorsStyled = styled.div`
color: red;
border: solid;
border-radius: 25px;
text-align: center;
word-wrap: break-word;
padding: 20px;
display: inline-block;
font-size: 20px;
width: 15vw;
margin-left: auto;
margin-right: auto;
position: relative;
top: 25vh;
left: 8vw;
`
const FormContainer = styled.div`
display: inline-block;
position: absolute;
top: 10vh;
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
  width: 40vw;
  font-size: 25px;

  textarea{
    font-size: 15px;
    height: 100px;
    width: 500px;
  }

  input.submitBtn{
    border: none;
    background: none;
    font-size: 25px;
    text-decoration: underline;
    padding-bottom: 20px;
    cursor: pointer;
}
`