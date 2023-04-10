import { useState } from "react"
import styled from "styled-components"

import { useContext } from "react"
import { UserContext } from "../UserContext"

import ResolutionCard from "./ResolutionCard"
import ResolutionForm from "./ResolutionForm"
import PactForm from "../Pacts/PactForm"

function ResolutionsPage ({resolutions , handleResolutions , handlePacts}){
    console.log('resolution page rendered')
  
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
grid-template-columns: 24vw 24vw 24vw 24vw ;
grid-template-rows: 24vh;
grid-auto-rows: 25vh;
grid-row-gap: 10px;
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