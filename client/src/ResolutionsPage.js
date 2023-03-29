import { useState } from "react"
import ResolutionCard from "./ResolutionCard"

function ResolutionsPage ({resolutions , handleResolutions}){
    const resolutionCards = resolutions.map((res) => <ResolutionCard resolution={res}/>)
    const [resolutionParams, setResolutionParams] = useState({goal_statement: "", category: "Physical"})
    const [errorObj, setErrorObj] = useState(null)
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
            }
            else{
                r.json().then(errorData => setErrorObj(errorData))
            }
        })
    }
    
    return <div>
        <form onSubmit={handleSubmit}>
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
            <input type="submit" value="submit"/>
        </form>
        {resolutions ? resolutionCards : <></>}
    </div>

}

export default ResolutionsPage