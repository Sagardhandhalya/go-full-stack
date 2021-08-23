import axios from 'axios'
function fetchAllPerson(){
    return axios.get("http://localhost:8000/api/person/").then(res => {
       return  res.data
})
}

function deletePerson(id){
    return axios.get(`http://localhost:8000/api/person/delete?id=${id}`)
}


function updatePerson(id,payload){
    return axios.post(`http://localhost:8000/api/person/update?id=${id}`,payload).then(res => {
        return  res.data
 })
}

function createPerson(payload){
    return axios.post(`http://localhost:8000/api/person/add`,payload).then(res => {
        return  res.data
 })
}

function fetchConnetionOfAPerson(id){
    console.log(id);
    return axios.get(`http://localhost:8000/api/person/relations?id=${id}`).then(res=>{
        return res.data
    })
}

function addRelation(payload){
    console.log(payload);
    return axios.post(`http://localhost:8000/api/relation/add`,payload).then(res => {
        return  res.data
 })
}

export {fetchAllPerson,deletePerson,updatePerson,createPerson,fetchConnetionOfAPerson,addRelation}