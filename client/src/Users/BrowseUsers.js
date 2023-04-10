import UserCard from "./UserCard"
import styled from "styled-components"
function BrowseUsers({users}){
  
    const cards = users.map((user) => <UserCard key={user.id} user={user}/>)

    return <UserContainer>
        {cards}
    </UserContainer>
}

export default BrowseUsers

const UserContainer = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 5vh;
margin-left: 5vw;
gap: 30px;
`
