import React, { useState, useEffect } from 'react'
import {deletePerson,updatePerson,createPerson, fetchAllPerson } from '../../apiCalls/apiCalls'
import AddRelationForm from '../AddRelationForm/AddRelationForm'
import ConnectionChart from '../ConnectionChart/ConnectionChart'
import Modal from '../Modal/Modal'
import PersonCard from '../PersonCard/PersonCard'
import UpdatePersonForm from '../UpdatePersonForm/UpdatePersonForm'

import "./CardView.css"
const CardView = () => {
    const [persons, setPersons] = useState([])
    const [updateOpen, setUpdateOpen] = useState({status:false,person:{}})
    const [createOpen, setCreateOpen] = useState(false)
    const [connectionOpen, setConnectionOpen] = useState({status:false,id:0})
    const [btnStatus, setBtnStatus] = useState(false)
    const [relationOpen, setRelationOpen] = useState(false)
    useEffect(() => {
        fetchAllPerson().then((data) => {
            console.log(data);
            setPersons(data)
        }).catch(err => console.log(err))
    }, [])

    const delPerson = (id) => {
        deletePerson(id).then(res => {
            setPersons(persons.filter(p => p.id !== id))
        }).catch(err => {
            console.log(err);
        })
    }

    const editPerson = (id) => {
        setUpdateOpen({status:true,person:persons.filter(p => p.id === id)[0]})
    }

    const openConnectionsFunc = (id)=>{
        setConnectionOpen({status:true,id})
    }

    const onUpdate = (id,payload)=>{
        console.log(id, payload);
        updatePerson(id,payload).then(res => {
            console.log(res);
            let upPersons = persons.map(p => p.id === id ? res : p)
            setPersons(upPersons)
        setUpdateOpen({status:false,person:{}})

        }).catch(err => {
            console.log(err);
        })
    }

    const onCreate = (payload)=>{
        console.log( payload);
    
        createPerson(payload).then(res => {
            setPersons([...persons,res])
        setCreateOpen(false)

        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <div className="home__container">
            {
                persons.map(person => <PersonCard key={person.id}
                    data={person}
                    deleteFunc={delPerson}
                    editFunc={editPerson}
                    openConnectionsFunc={openConnectionsFunc}
                    />)
            }
            {btnStatus ?<> <button className="btn btn-primary rounded-2  home__pluse_person" 
            onClick={() => setCreateOpen(true)}>Add Person</button>
            <button className="btn btn-primary  rounded-2 home__pluse_relation" 
            onClick={() => setRelationOpen(true)}>Add Relation</button> </>:<div/>}
            <button className="btn btn-primary btn-lg  rounded-circle home__pluse" 
            onClick={() => setBtnStatus(!btnStatus)}>	&#x2B;</button>
            <Modal open={updateOpen.status || createOpen || connectionOpen.status || relationOpen}>
                {createOpen ? <UpdatePersonForm closeModal={setCreateOpen} onCreate={onCreate} /> : <div />}
                {updateOpen.status ? <UpdatePersonForm closeModal={setUpdateOpen} person={updateOpen.person} onUpdate={onUpdate} /> : <div />}
                {connectionOpen.status ? <ConnectionChart closeModal={setConnectionOpen} id={connectionOpen.id} persons={persons}/>:<div/>}
                {relationOpen ?<AddRelationForm persons={persons} closeModal={setRelationOpen} />:<div/>}
            </Modal>
        </div>
    )
}

export default CardView
