import { useState } from "react"
import ResolutionCard from "./ResolutionCard"
import ResolutionForm from "./ResolutionForm"
import PactForm from "../Pacts/PactForm"
// import {createPortal} from 'react-dom'
import styled from "styled-components"
import { useContext } from "react"
import { UserContext } from "../UserContext"

function ResolutionsPage ({resolutions , handleResolutions , handlePacts}){
    // console.log('resolution page rendered')
  
    const user = useContext(UserContext)
    const [resolutionView, setResolutionView] = useState(false)
    const [showPactForm, setShowPactForm] = useState(false)
    const [formResolution, setFormResolution] = useState()

    const resolutionCards = resolutions.map((res) => <ResolutionCard key={res.id} handlePacts ={handlePacts} handlePactForm = {handlePactForm} resolution={res} pactView={showPactForm} />)
    
  

    function handlePactForm(resolution){
        setFormResolution(resolution)
        setShowPactForm(!showPactForm)

    }

    return <>
        
        {user ? <AddResolutionButton onClick={() => setResolutionView(!resolutionView)}>{ !resolutionView ? "Add Resolution" : "Close Form"}</AddResolutionButton> : <></>}

        {resolutionView ? <ResolutionForm handleResolutions={handleResolutions} handleShowForm={()=> setResolutionView(!resolutionView)}/> : <></>}

        {showPactForm ? <PactForm setShowPactForm={setShowPactForm} handlePacts={handlePacts} resolution={formResolution}/> : <></>}
        
        <CardContainer>
            {resolutions ? resolutionCards : <></>}
        </CardContainer>
        
    </>

}

const CardContainer = styled.div`
display: grid;
grid-template-columns: 25vw 25vw 25vw 25vw ;
grid-template-rows: 25vh;
grid-auto-rows: 25vh;
`

const AddResolutionButton = styled.button`
border: solid;
border-radius: 25px;
background:none;
text-decoration: none;
height: 4vh;
margin-left: 1vw;
margin-top: 5vh;
margin-bottom: 2vh;
font-size: 20px;
cursor: pointer;
`

export default ResolutionsPage