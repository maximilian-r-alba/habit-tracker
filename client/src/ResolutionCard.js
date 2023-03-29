import { useState } from "react"
function ResolutionCard ({resolution}){

    const [showForm, setShowForm] = useState(false)
    function handleNewPact(){
        console.log("pact made")
        setShowForm(true)
    }

    return( 
    <div>
        {showForm ? <form>
            <label>
                How do you want to track progress?
                <input name="frequency_scope"></input>
            </label>
            <label>
                What is your target number?
                <input></input>
            </label>
            <label>
                Is your goal a specific achievement or a repeated process?
                <input></input>
            </label>
        </form>:<></>}
        <h1>{resolution.goal_statement}</h1>
        <button onClick={handleNewPact}>MAKE A PACT</button>
    </div>
)
}

export default ResolutionCard