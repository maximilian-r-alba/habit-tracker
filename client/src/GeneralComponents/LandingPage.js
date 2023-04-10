import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useContext } from "react"

function LandingPage(){
    console.log('landing page rendered')
    const user = useContext(UserContext)
    
    return <StyledLanding>

                    { user ? <h2>Welcome Back {user.name}</h2> :
                    <>
                        <h2>Make Resolutions</h2>
                        <h3>Track Habits</h3>
                        <p>Be the best you can be</p>
                        <NavLink to="/signup">Sign up</NavLink>
                    </>}
           
            </StyledLanding>
}

export default LandingPage

const StyledLanding = styled.div`
height: 95vh;
border-radius: 20px;
display: flex;
background-image: url("https://cdn.pixabay.com/photo/2018/05/02/14/57/arrows-3368751_960_720.png");
background-repeat: no-repeat;
background-position: center;
background-size: 50%;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
font-size: 30px;

a{
    color: inherit;
}
`