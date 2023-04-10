import { useEffect, useState } from "react"

import { UserContext } from "../UserContext"
import { useContext } from "react"
import styled from "styled-components"
import ProgressCircle from "./ProgressCircle"
import ProgressSquare from "./ProgressSquare"
import {MdAddTask} from "react-icons/md"
import {AiOutlineEdit} from "react-icons/ai"
import {TiDocumentDelete} from "react-icons/ti"


function PactCard({pact , handlePacts , handlePactForm }){


    const currentUser = useContext(UserContext)
    
    const [pactInstance, setPactInstance] = useState(pact)
    const [instanceDates, setInstanceDates] = useState(pact['progress_dates'])

    useEffect(()=>{
        setPactInstance(pact)
    }, [pact])
 
    const goal = pactInstance.goal_int
  
    const today = new Date(new Date().setHours(23,59,59,59))
    const weekStart = new Date((new Date( new Date(today.valueOf()).setDate(today.getDate() - today.getDay()))).setHours(0,0,0,0))
    const weekEnd = new Date( new Date(today.valueOf()).setDate(today.getDate() - today.getDay()+6))

    const yesterday = new Date( new Date(today.valueOf()).setDate(today.getDate() -1))
    const tomorrow = new Date( new Date(today.valueOf()).setDate(today.getDate() +1))
    

    
    const weekArray = generateWeek(weekStart, weekEnd).map((day) =>
    <ProgressSquare key={day.toString().slice(0,3)} progressDates={instanceDates} day={day} weekStart={weekStart} weekEnd={weekEnd}/>)
   
    function generateWeek(startDate, stopDate) {
     
        const dateArray = new Array();
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            const newDate = currentDate.getDate() + 1
            currentDate = new Date (currentDate.setDate(newDate))
          
        }
        return dateArray;
    }


    function willBeComplete(){
        const progress = pactInstance.progress_dates.length

       if (goal <= progress + 1 && pactInstance.isSpecific){
            return true
        }
        return false
    }

    const pactParams = {pact_id: pactInstance.id, resolution_id: pactInstance.resolution.id, progressDate:today}
    
    useEffect(()=> {
        
            const filterOldProgress = (frequency_scope) =>{
                switch(frequency_scope){
                    case "Monthly":
                        return pactInstance['progress_dates'].filter((obj) => {
                                    const dateObj = new Date(Date.parse(obj.progressDate))
                                    return dateObj.getYear() == today.getYear() && dateObj.getMonth() == today.getMonth()})
                    case "Weekly":
                        return pactInstance['progress_dates'].filter((obj) => {
                    
                            return Date.parse(new Date((new Date( new Date(today.valueOf()).setDate(today.getDate() - today.getDay()))).setHours(0,0,0,0))) <= Date.parse(obj.progressDate) &&  Date.parse(obj.progressDate) <= Date.parse(weekEnd)})

                    case "Daily":
                        return pactInstance['progress_dates'].filter((obj) => {
                                    return Date.parse(obj.progressDate) > Date.parse(yesterday)})
                    default: 
                        return pactInstance['progress_dates']
                }

            }
            setInstanceDates(filterOldProgress(pactInstance['frequency_scope']))
       
    }, [pactInstance])


    function handlePactProgress(){
        fetch('/progress_dates', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(pactParams)
        }).then((r) =>{
            if (r.ok){
                r.json().then(progressObj => {
                   
                    if (willBeComplete()){
                        handlePacts({...pactInstance, 'completion_date':today, 'progress_dates':[...pactInstance['progress_dates'], progressObj]})
                        setPactInstance({...pactInstance, 'completion_date':today, 'progress_dates':[...pactInstance['progress_dates'], progressObj]})
                      }
                    else{
                        handlePacts({...pactInstance, 'progress_dates':[...pactInstance['progress_dates'], progressObj]})
                        setPactInstance({...pactInstance, 'progress_dates':[...pactInstance['progress_dates'], progressObj]})
                        }
                        setInstanceDates([...pactInstance['progress_dates'], progressObj])
                    })
                    }})
            }
            
    function handleDeletePact(){
        fetch(`/pacts/${pactInstance.id}`, {
            method: "DELETE"
        }).then((r) => {
            if(r.ok){
               
                handlePacts(pactInstance, "DELETE")
            }
        })

    }
    
    return <>
    
      {!pactInstance['completion_date'] || Date.parse(yesterday) < Date.parse(pactInstance['completion_date']) && Date.parse(pactInstance['completion_date']) < Date.parse(tomorrow) ?  
      
      <StyledMilestone category={pactInstance.frequency_scope} className={`${pactInstance.frequency_scope}`}>
            <p className="category">{pact.resolution.category} { currentUser.id === pactInstance.user_id ?  <span><AiOutlineEdit onClick={() => handlePactForm(pactInstance.resolution , pactInstance)}/> <TiDocumentDelete onClick={handleDeletePact} /> </span> : <></>} </p>
            <h2>{pact.resolution.goal_statement}</h2>
            
            {pactInstance.frequency_scope == "Weekly" ?  
            <>
            <p>{goal} per week</p>
            <div className='weekArray'>{weekArray}</div>
            </>
             : 
            
            <>
                <ProgressCircle className="circle" percentage={(instanceDates.length/goal)*100} color={"red"} />
                <p className='fraction'>{instanceDates.length}/{goal}</p>
            </> }
            

            { goal <= instanceDates.length ? 
            
            <p className="completed">{pactInstance['completion_date'] ? 
            
            ` Completed on: ${new Date(Date.parse(pactInstance['completion_date'])).toLocaleDateString("en-US")}` : "Completed"}
            
            </p> 
            
            : <MdAddTask className="progressBtn" onClick={handlePactProgress} />}
            
        </StyledMilestone> : <></>}
       
    
       
    </>
  
}

export default PactCard

const StyledMilestone = styled.div`
border: solid;
border-radius:25px;
margin: 10px;
position: relative;
flex: none;

h2, p{
    padding-left: 5px;
}

p.category{
    
    border-style: none none solid none;
}

${props => props.category == 'Monthly' ? MonthlyCSS : props.category == 'Weekly' ? WeeklyCSS : DailyCSS}



`
const WeeklyCSS = `
height: 20vh;


div{
    position: absolute;
    right: 25%;
    bottom: 25%;
    font-size: 20px;
    *{
        padding-left: 10px;
    }
}


svg.progressBtn{
    position: absolute;
    bottom: 1vh;
    right: 1vw;
    font-size: 20px;
 }
`

const MonthlyCSS = `
width: 20vw;

p.completed{
    padding-top: 40px;
   
}

.progressCircle{
    position: absolute;
    top: 30%;
    right: 0;
}
p.fraction{
        position: absolute;
        right: 8vw;
        bottom: 0vh;
    }

    svg.progressBtn{
        position: absolute;
        bottom: 1.5vh;
        right: 1vw;
        font-size: 20px;
     }
`
const DailyCSS = `
height: 20vh;

.progressCircle{
    position: absolute;
    top: 10%;
    right: 0;
}
p.fraction{
    position: absolute;
    right: 8vw;
    bottom: 0;
}

p.completed{
    padding-top: 20px;
   
}

svg.progressBtn{
   position: absolute;
   bottom: 1.5vh;
   right: 1vw;
   font-size: 20px;
}
`