import React, { useState,useEffect } from 'react'
import { addRelation } from '../../apiCalls/apiCalls'

const AddRelationForm = ({ persons,closeModal }) => {
    const [p1, setP1] = useState(persons[0].id)
    const [p2, setP2] = useState(persons[0].id)
    const [name, setName] = useState("")

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])


    const AddRelation= ()=>{
        addRelation({"p1":+p1,"p2":+p2,name}).then(res=>{
            closeModal(false)
        }).catch(err =>{
            console.log(err);
        })
    }
    return (
        <div className="bg-white p-3 relationform__container">
            <h1>Add Relation Form</h1>
            <div className="input">
                <label className="form-label">Person 1 </label>
                <select class="form-select" value={p1} onChange={(e)=> setP1(e.target.value)} aria-label="Default select example">
                    {persons.map(p =>  <option value={p.id}>{p.name}</option>)}
                </select>
            </div>
            <div className="input">
                <label className="form-label">Person 2 </label>
                <select class="form-select"value={p2} onChange={(e)=> setP2(e.target.value)} aria-label="Default select example">
                    {persons.map(p =>  <option value={p.id}>{p.name}</option>)}
                </select>
            </div>
            <div className="input">
                <label className="form-label">Relation Name</label>
                <input required className="form-control  mb-1" type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
            </div>

            <button className="btn btn-primary mt-3 me-3 center" onClick={()=>AddRelation() }>Submit</button>
             <button className="btn btn-outline-primary mt-3 center" onClick={()=>closeModal(false)}>Close</button>
        </div>
    )
}

export default AddRelationForm
