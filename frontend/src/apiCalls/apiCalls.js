import axios from 'axios'

const BASE_URL = "http://localhost:8000/api/"

function fetchAllPerson() {
    return axios.get(`${BASE_URL}person/`).then(res => {
        return res.data
    })
}

function deletePerson(id) {
    return axios.get(`${BASE_URL}person/delete?id=${id}`)
}


function updatePerson(id, payload) {
    return axios.post(`${BASE_URL}person/update?id=${id}`, payload).then(res => {
        return res.data
    })
}

function createPerson(payload) {
    return axios.post(`${BASE_URL}person/add`, payload).then(res => {
        return res.data
    })
}

function fetchConnetionOfAPerson(id) {
    console.log(id);
    return axios.get(`${BASE_URL}person/relations?id=${id}`).then(res => {
        return res.data
    })
}

function addRelation(payload) {
    console.log(payload);
    return axios.post(`${BASE_URL}relation/add`, payload).then(res => {
        return res.data
    })
}

function fetchAllRelations() {
    return axios.get(`${BASE_URL}relation/`).then(res => {
        return res.data
    })
}

export {
    fetchAllPerson,
    deletePerson,
    updatePerson,
    createPerson,
    fetchConnetionOfAPerson,
    addRelation,
    fetchAllRelations
}