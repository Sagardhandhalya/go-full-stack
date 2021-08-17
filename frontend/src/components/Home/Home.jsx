import React, { useState,useEffect } from 'react'
import { fetchAllRelative,deletePerson } from '../../apiCalls/apiCalls'
import PersonCard from '../PersonCard/PersonCard'
import "./Home.css"
const Home = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        fetchAllRelative().then((data) => {
            console.log(data);
            setPersons(data)
        }).catch(err => console.log(err))
    }, [])

    const delPerson = (id) =>{
        deletePerson(id).then(res => {
            fetchAllRelative().then((data) => {
                console.log(data);
                setPersons(data)
            }).catch(err => console.log(err))
        }).catch(err =>{
            console.log(err);
        })
    }

    return (
        <div className="home__container">
            {
                persons.map(person => <PersonCard key={person.id} data={person} deleteFunc={delPerson}/> )
            }
            <button className="home__pluse_button">+</button>
        </div>
    )
}

export default Home
