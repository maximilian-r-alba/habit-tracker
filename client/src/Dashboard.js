import { UserContext } from "./UserContext"
import { useContext } from "react"

function Dashboard(){
    const user = useContext(UserContext)
    console.log(user)
    return <h1>hi</h1>
}

export default Dashboard