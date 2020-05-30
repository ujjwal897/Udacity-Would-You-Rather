import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/error.gif'

const Error = () => {
    return(
            <div style={{marginRight: "calc(-100vw / 2 + 500px / 2)",position:"relative"}}>
                <img style={{height:"650px",width:"1350px"}} src={img1} alt="error"/>
                <Link style={{position: "absolute",top: "70%",left: "36%",textDecoration:"none"}} to="/login">Click Here To Go Back</Link>
            </div>

    )
}
export default Error;