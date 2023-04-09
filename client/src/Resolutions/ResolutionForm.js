import { useState } from "react"
import styled from "styled-components"

function ResolutionForm({handleResolutions , handleShowForm}){
    console.log('resolution form rendered')

    const [resolutionParams, setResolutionParams] = useState({goal_statement: "", category: "Physical"})

    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setResolutionParams({...resolutionParams, [key] : value})
    }

    function handleSubmit(e){
        e.preventDefault()

        fetch("/resolutions", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(resolutionParams)
        }).then(r => {
            if (r.ok){
                r.json().then(handleResolutions)
                handleShowForm()
            }
            else{
                    r.json().then(errorData => alert(`Error! ${errorData.errors}`))
                }})
            }


    return <ResolutionFormStyled onSubmit={handleSubmit}>
            <label>
                What is your goal?
                <input type="text" name="goal_statement" value = {resolutionParams['goal_statement']}onChange = {handleChange}></input>
            </label>
            <label>
                Category:
                <select name="category" value = {resolutionParams['category']} onChange = {handleChange}>
                    <option value = "Physical">Physical</option>
                    <option value = "Mental">Mental</option>
                    <option value = "Social">Social</option>
                </select>
            </label>
            <input type="submit" className="submitBtn" value="Submit"/>
        </ResolutionFormStyled>
}

export default ResolutionForm

const ResolutionFormStyled = styled.form`

display: flex;
flex-direction: column;
gap: 1vh;
align-items: center;
border: solid;
border-radius: 25px;
width: 20vw;
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
`