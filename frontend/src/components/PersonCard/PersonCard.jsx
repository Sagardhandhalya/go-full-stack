import React from 'react'
import "./PersonCard.css"
const PersonCard = ({data,deleteFunc,editFunc,openConnectionsFunc}) => {
    const {id,name,city,contactNo,photoUrl} = data
    return (
        <div className="pcard__container card mb-3">
            <img src={photoUrl} className="card-img-top mt-2" alt="name" />
            <hr />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                I am from {city}.and you can can contact me on {contactNo}.
            </p>
            <button className="btn btn-primary btn-sm me-3" onClick={() => openConnectionsFunc(id)}>Connections</button>
            <button className="btn btn-outline-primary btn-sm me-3" onClick={() => editFunc(id)}>Update</button>
            <button className="btn btn-danger btn-sm " onClick={() => deleteFunc(id)}>Delete</button>
            </div>
            
        </div>
    )
}

export default PersonCard
