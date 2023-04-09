import { useContext } from "react"
import { NavLink , useNavigate} from "react-router-dom"
import { UserContext } from "../UserContext"
import styled from "styled-components"
import {FcComboChart} from "react-icons/fc"

function NavBar({setUser}){
  // console.log('nav rendered')
    const user = useContext(UserContext)
    const navigate = useNavigate()

    function handleLogout(e){
        fetch("/logout", {
          method: "DELETE"}).then(() => {
              navigate('/') 
              setUser(false)
            })
      }


    return(
        <StyledNavBar>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/resolutions">Resolutions</NavLink>
            {user ?<>
              <NavLink to="/users">Users</NavLink>
              <button onClick={() => navigate(`/users/${user.id}`)}> Profile</button>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink onClick = {handleLogout}>Logout</NavLink>
            </>  :<> <NavLink to="/login">Login</NavLink> <NavLink to="/signup">Signup</NavLink> </> }
            <span>Habit Tracker <FcComboChart /></span>
        </StyledNavBar>
       
    )
}

export default NavBar

const StyledNavBar = styled.div`
margin: 20px;
font-size: 25px;
position: relative;
a{
  text-decoration: none;
  color: black;
  padding-left: 5px;
  padding-right: 35px;
  border-style: none none none solid;
}

button{
  text-decoration: none;
  background: none;
  border-width: 3px;
  color: black;
  padding-left: 5px;
  padding-right: 35px;
  font-size: 25px;
  border-style: none none none solid;
  cursor: pointer;
}

span{
  font-size: 30px;
  position: absolute;
  right: 0;
}


`