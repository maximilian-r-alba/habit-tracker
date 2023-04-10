import { UserContext } from "../UserContext"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import PactCard from "../Pacts/PactCard"
import styled from "styled-components"


function Dashboard({handlePacts}){

    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [toggleDailies, setToggleDailies] = useState(true)

    const pacts = user.pacts.sort(sortPactsbyID)
    const monthlies = pacts.filter((pact) => pact.frequency_scope === 'Monthly').map((pact) => <PactCard key={pact.id} pact = {pact} handlePacts={handlePacts}/>)
    const weeklies = pacts.filter((pact) => pact.frequency_scope === 'Weekly').map((pact) => <PactCard key={pact.id} pact = {pact} handlePacts={handlePacts}/>)
    const dailies = pacts.filter((pact) => pact.frequency_scope === 'Daily').map((pact) => <PactCard key={pact.id} pact = {pact} handlePacts={handlePacts}/>)
    const milestones = pacts.filter((pact) => pact.isSpecific === true ).map((pact) => <PactCard key={pact.id} pact = {pact} handlePacts={handlePacts}/>)

    function sortPactsbyID (a,b){
        let x = a.id
        let y = b.id
        if(x>y){return 1;}
        if(x<y){return -1;}
        return 0;
    }

    function navigateToResolutions(){
        navigate('/resolutions')
    }

    const today = new Date(new Date().setHours(23,59,59,59))
    const weekStart = new Date( new Date(today.valueOf()).setDate(today.getDate() - today.getDay() ))
    const weekEnd = new Date( new Date(today.valueOf()).setDate(today.getDate() - today.getDay()+6))

   
    return( 
        <DashboardDiv id = "dashboard">            
            {monthlies.length > 0 ? <MonthliesContainer >
            <div>
            <h2>{today.toLocaleString('en-us', {month: 'long'})}</h2>
            <h2>Monthlies</h2>
            </div>
    
            {monthlies}
            </MonthliesContainer> : <MonthliesContainer > <h1 className='empty' onClick={navigateToResolutions}>Click Here to Add Monthiles!</h1> </MonthliesContainer> }

            {weeklies.length > 0? <WeekliesContainer > 
            <h2>Weeklies:  {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}</h2>
            {weeklies}
            </WeekliesContainer> : <WeekliesContainer ><h1 className='empty' onClick={navigateToResolutions}>Click Here to Add Weeklies!</h1></WeekliesContainer>}

            <DailiesMilestoneContainer className="dailies/milestones">
          <button className='toggle' onClick={()=>setToggleDailies(!toggleDailies)}>{toggleDailies ? 'Show Milestones' : 'Show Dailies'}</button> 
            { toggleDailies ? 
                    <>
                        {dailies.length > 0 ? <>
                        <h1>Dailies for {today.toLocaleDateString()}</h1>
                        {dailies}
                        </> : <h1 className='empty'  onClick={navigateToResolutions}>Click Here to Add Dailies!</h1>}
                    </>
                    
            : 
            <>
            {milestones.length > 0 ? <>
                <h1>Milestones</h1>
                {milestones}
                </>: <h1 className='empty' onClick={navigateToResolutions}>Click Here to Add Milestones!</h1>}  
            </>
            
           }
           
            </DailiesMilestoneContainer>
        </DashboardDiv>
    
    
    )
}

export default Dashboard
const DashboardDiv = styled.div`
display: grid;
grid-template-columns:28vw 70vw ;
grid-template-rows: 28vh 70vh;
grid-template-areas: 
"monthlies monthlies"
"dailies weeklies";

column-gap: 15px;
row-gap: 10px;
.empty{
    height: 5vh;
    cursor: pointer;
}

`

const MonthliesContainer = styled.div`

display: flex;
flex-wrap: nowrap;
grid-area: monthlies;
overflow-x: auto;


::-webkit-scrollbar {

    height: 10px;
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


const WeekliesContainer = styled.div`

display: flex;
flex-direction: column;
grid-area: weeklies;

overflow-y: scroll;
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






const DailiesMilestoneContainer = styled.div`
display: flex;
flex-direction: column;

grid-area: dailies;

.toggle{
    border: solid;
    border-radius: 25px;
    width: 30%;
    height: 3vh;
    cursor: pointer;
}

overflow-y: scroll;
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