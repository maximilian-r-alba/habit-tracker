
import {BiCheckbox , BiCheckboxChecked} from "react-icons/bi"
function ProgressSquare({day, progressDates, weekEnd}){

    const boxDate = day.toLocaleDateString('en-US')
    const dayOfWeek = day.toString().slice(0,3)
    const weekStart = new Date(new Date( new Date(day.valueOf()).setDate(day.getDate() - day.getDay())).setHours(0,0,0,0))
    console.log(weekStart)
    const filteredDates = progressDates.filter((obj) => {
        
        const dateObj = new Date (Date.parse(obj.progressDate))
        
        return weekStart < dateObj && dateObj < weekEnd
    }).map((dateObj) => new Date(dateObj.progressDate).toLocaleDateString('en-US'))
    

    return <>
        <label>
        <span>{dayOfWeek}</span>
        {filteredDates.includes(boxDate) ? <span><BiCheckboxChecked />x{filteredDates.filter(date => date == boxDate).length}</span> :  <BiCheckbox />}
        </label>
        
    </>
}

export default ProgressSquare

