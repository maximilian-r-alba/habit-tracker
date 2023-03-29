import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "./UserContext"

function NavBar({setUser}){
    const user = useContext(UserContext)

    function handleLogout(e){
        fetch("/logout", {
          method: "DELETE"
        }).then(setUser(false))
      }

    return(
        <div>
            <NavLink to="/resolutions">Resolutions</NavLink>
            {user ? <NavLink to="/" onClick = {handleLogout}>Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
            {user ? <></> : <NavLink to="/signup">Signup</NavLink>}
            {user ? <NavLink to="/dashboard">Dashboard</NavLink> : <></>}
        </div>
       
    )
}

export default NavBar