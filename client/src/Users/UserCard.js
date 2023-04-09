
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
function UserCard({user}){
    // console.log('user card rendered')
    const navigate = useNavigate()

    function handleNavigate(){
        navigate(`/users/${user.id}`)
    }

    return <UserCardDiv onClick={handleNavigate}>
            <h1>{user.name}</h1>
            <img src={user.image_url} alt="profile_picture"/>
            <p>Click to View</p>
        </UserCardDiv>

    
}

export default UserCard


const UserCardDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border: solid;
border-radius: 50px;
width: 20vw;
position: relative;

h1{
    flex: 0 1 auto;
}

img{
    width: 10vw;
    min-height: 14vh;
}

cursor: pointer;

`