import { useEffect, useState } from "react"

import {AiOutlineClose} from "react-icons/ai"
import styled from "styled-components"

function PactForm({resolution , handlePacts, setShowPactForm , pact}){
   
    const [pactParams, setPactParams] = useState({frequency_scope: undefined, goal_int: 1, isSpecific: true,resolution_id: resolution.id})
    const [errorData, setErrorData] = useState()

    useEffect(() => {
        if(pact){
            setPactParams({frequency_scope: pact.frequency_scope, goal_int: pact.goal_int, isSpecific: pact.isSpecific, resolution_id: pact.resolution.id})
        }
    }, [pact])

    
    function handleSubmit(e){
        e.preventDefault()
        if(pact){
          
            fetch(`/pacts/${pact.id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(pactParams)}).then((r) =>{
                    if(r.ok){
                        r.json().then(handlePacts)
                        setShowPactForm(false)
                    }
                    else{
                        r.json().then(setErrorData)
                    }
                })
            }

        
        else{
            
            fetch('/pacts', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(pactParams)
        }).then(r => {
      
            if(r.ok){
                r.json().then(pact => handlePacts(pact))
                setShowPactForm(false)
            }
            else{
                r.json().then(setErrorData)
            }
        })
    }
        
    }

    function handleChange(e){
        const key = e.target.name
        const value = e.target.value

        switch(key){
            case 'goal_int':
            setPactParams({...pactParams, [key]: parseInt(value)})
                break;

            case 'isSpecific':
                if(value==='true'){
                    setPactParams({...pactParams, [key]: true, 'frequency_scope' : false})
                }
                else{
                    setPactParams({...pactParams, [key]: false})
                }
                break;

            default:
                setPactParams({...pactParams, [key]: value})
                break;
        } 
    }


    return (
 <>
 
 { errorData ? <ErrorsStyled>Uh-oh:{errorData.errors.map((error) => <p>{error}</p>)} </ErrorsStyled> : <></>}


        <StyledPactForm onSubmit={handleSubmit}>
        
<AiOutlineClose onClick={() => setShowPactForm(false)}/>
<label>
    <h3>{resolution.goal_statement}</h3>
    Is your goal a specific achievement or a repeated process?
   
    <select name="isSpecific" value = {pactParams['isSpecific']} onChange={handleChange}>
        <option value = 'true'>Specific</option>
        <option value = "false">Repeated</option>
    </select>

</label>

{pactParams['isSpecific'] ? 
<label>
    What is your target number?
    <input type = "number" name="goal_int" value = {pactParams['goal_int']} min = "1" onChange={handleChange} ></input>
</label> 
: 
    <>
    <label>

    Track goal by: 

    <select name="frequency_scope" value = {pactParams['frequency_scope']} onChange={handleChange}>
        <option value = {undefined}></option>
        <option value = "Daily">Day</option>
        <option value = "Weekly">Week</option>
        <option value = "Monthly">Month</option>
    </select>

    </label>

    <label>
    How often?
    <input type = "number" name="goal_int" value = {pactParams['goal_int']}min = "1" onChange={handleChange} ></input>
    </label> 
            </>
    
        }
    
<input type="submit"/>
</StyledPactForm>

</>
    )
}


export default PactForm

const StyledPactForm = styled.form`
display: flex;
flex-direction: column;
gap: 1vh;
align-items: center;
border: solid;
border-radius: 25px;
width: 20vw;
position: relative;
*{
    margin: 5px;
}

.submitBtn{
    border: none;
    background: none;
    font-size: 20px;
    text-decoration: underline;
    padding-bottom: 20px;
    cursor: pointer;
}

svg{
    position: absolute;
    bottom: 2%;
    right: 2%;
    cursor: pointer;
}
`

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
top: 15vh;
left: 25vw;
`
