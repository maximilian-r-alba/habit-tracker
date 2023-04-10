import { useParams , useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import { useContext } from "react"
import styled from "styled-components"
import PactCard from "../Pacts/PactCard"
import PactForm from "../Pacts/PactForm"
import ResolutionCard from "../Resolutions/ResolutionCard"
import {AiOutlineEdit , AiOutlineUserDelete} from "react-icons/ai"

function UserPage({users , setUsers , handlePacts , setUser}){

    const {id} = useParams()
    const navigate = useNavigate()
    const currentUser = useContext(UserContext)
   
    const [pageUser, setPageUser] = useState(users.filter((u) => u.id === parseInt(id)).pop())
  
    const [pacts, setPacts] = useState()
    

    
    useEffect(() => {
        setPageUser(users.filter((u) => u.id === parseInt(id)).pop())
    }, [id, users])

    useEffect(() => {
        setPacts(pageUser.pacts.map((pact, i) => <PactCard key={pact.id} pact={pact} handlePactForm={handlePactForm} pactView={showPactForm} handlePacts={handlePacts}  />))
    }, [pageUser])

    const uniqueResolutions = Array.from(new Set(pageUser.resolutions.map(r => r.id)))
    .map(id => {
      return pageUser.resolutions.find(r => r.id === id)
    })

    const [showPactForm, setShowPactForm] = useState(false)
    const [formResolution, setFormResolution] = useState()
    const [formPact, setFormPact] = useState()
   
    function handlePactForm(resolution , pact){
        setFormResolution(resolution)
        setFormPact(pact)
        setShowPactForm(!showPactForm)
    }
    
    function handleDeleteUser(){
        fetch(`/users/${currentUser.id}`,{
            method: "DELETE"
        }).then(() =>{
            const filterDeleted = users.filter((u) => u.id != currentUser.id)
            setUsers(filterDeleted)
            
        }).then(fetch("/logout", {
            method: "DELETE"}).then(() => {
                navigate('/') 
                setUser(false)
              }))

        navigate('/')
        
    }

    return <PageContainer>
        
        <div className="userDiv">
        <h1>{pageUser.name}</h1>
        <img src={pageUser.image_url} alt="profile_picture"/>
        <h2 className="bio">{pageUser.bio}</h2>
        </div>
        
       
      
        {currentUser.id == pageUser.id ? <div className="pageOptions"> <AiOutlineEdit onClick={()=> navigate(`/users/${currentUser.id}/edit`)}/> <AiOutlineUserDelete onClick={handleDeleteUser}/></div>: <></>}

        {showPactForm ? <PactForm resolution={formResolution} handlePacts={handlePacts} pact={formPact} setShowPactForm={setShowPactForm}/> : <></>}
        <PactResolutionContainer>
            {<ListContainer>{uniqueResolutions.map((res) => <ResolutionCard key = {res.id} handlePactForm={handlePactForm} resolution={res} pactView={showPactForm}/>)}</ListContainer>}

        
            {currentUser.id == pageUser.id ? <ListContainer>{ pacts ? pacts : <></>}</ListContainer> : <></>}
        </PactResolutionContainer>


    </PageContainer>
}

export default UserPage

const PageContainer = styled.div`
    position: relative;
    
    h2.bio{
        position: absolute;
        top: 5vh;
        left: 20vw;
    }
    div.userDiv{
        margin: 2vw;
        height: 30vh;
        img{
            border: solid;
            border-radius: 220px;
            width: 10vw;
        }
    }

    div.pageOptions{
        position: absolute;
        top: 9vw;
        
        *{
            font-size: 30px;
            margin: 3vw;
            margin-left: 2.75vw;
            cursor: pointer;
        }
    }
`

const PactResolutionContainer = styled.div`
display: flex;
width: 100vw;
justify-content: center;
gap: 5vw;

`

const ListContainer = styled.div`
width: 30vw;
height: 80vh;
flex-grow: 100;
overflow-y: scroll;
div.Weekly{
    position: relative;
    .weekArray{
        position: absolute;
        right: 2vw;
    }
}
div.Monthly{
    height: 20vh;
    width: 97%;
    position: relative;
    .progressCircle{
        position: absolute;
        top: 2vh;
    }
   p.fraction{
    
    position: absolute;
    margin: 20px;
    margin-right: 0px;
    padding: 0px;
    bottom: 0;
   }

   svg.progressBtn{
  
    position: absolute;
    margin: 20px;
    margin-left: 0px;
    bottom: 0;
   }
}
::-webkit-scrollbar {

width: 10px;
background: white;
}

::-webkit-scrollbar-thumb {
background: darkgray;
-webkit-border-radius: 1ex;
}

::-webkit-scrollbar-corner {
background: #000;
}
`