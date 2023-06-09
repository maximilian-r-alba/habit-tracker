import styled from "styled-components"
import { useContext } from "react";
import { UserContext } from "../UserContext"
import { BsFillPersonFill } from 'react-icons/bs';
import {IoIosAddCircleOutline} from "react-icons/io"
import { useEffect, useState } from "react";

function ResolutionCard ({resolution , handlePactForm , pactView}){

    const [userAmount, setUserAmount] = useState()
    const user = useContext(UserContext)

    useEffect(() =>
    {
        if (resolution.unique_users){
        setUserAmount(resolution.unique_users.length)
        }
    }
    ,[resolution])


    return( 
    <Card category = {resolution.category}>
        <span>
            <p>{resolution.category}</p>
            {userAmount ? <p >{userAmount} <BsFillPersonFill /></p> : <></>}
        </span>
        <h1>{resolution.goal_statement}</h1>
       { user ? <button disabled={pactView} onClick={() => handlePactForm(resolution)}><IoIosAddCircleOutline className="addBtn" /></button> : <></>}
        
    </Card>
)
}




const Card = styled.div `
background-color: ${props =>
 props.category === 'Mental'? '#ba78f0' : props.category === 'Social' ? '#75c3ff' : props.category === 'Physical' ? '#55d964' : 'none'};
border: solid;
border-radius: 25px;
margin: 10px;
word-wrap: break-word;
position: relative;
h1{
    font-size: 1.5em;
}

span{
    border: solid;
    border-style: none none solid none;
    display: flex;
    justify-content: space-between;
    
    p   {
    margin: 0;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 100%;
}
}

button{
    position: absolute;
    bottom: .5vw;
    right: .5vw;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    svg{
        stroke-width: 15px;
    }
}
`
export default ResolutionCard
