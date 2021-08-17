import React from 'react'
import "./PersonCard.css"
const PersonCard = ({data,deleteFunc}) => {
    const {id,name,city,contactNo,photoUrl} = data
    return (
        <div className="pcard__container">
            <img src={photoUrl} alt="" />
            <h3>{name}</h3>
            <p>Contact No : {contactNo}</p>
            <p>City : {city}</p>
            <button onClick={() => deleteFunc(id)}>Delete</button>
            <button>update</button>
        </div>
    )
}

export default PersonCard
