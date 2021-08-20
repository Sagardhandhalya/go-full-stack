import axios from 'axios'
function fetchAllRelative(){
    return axios.get("http://localhost:8000/api/relative/").then(res => {
       return  res.data
})
}

function deletePerson(id){
    return axios.get(`http://localhost:8000/api/relative/delete?id=${id}`)
}


function updatePerson(id,payload){
    return axios.post(`http://localhost:8000/api/relative/update?id=${id}`,payload).then(res => {
        return  res.data
 })
}

function createPerson(payload){
    return axios.post(`http://localhost:8000/api/relative/add`,payload).then(res => {
        return  res.data
 })
}

function fetchConnetionOfAPerson(id){
    console.log(id);
    return axios.get(`http://localhost:8000/api/relative/relations?id=${id}`).then(res=>{
        return res.data
    })
}

function addRelation(payload){
    console.log(payload);
    return axios.post(`http://localhost:8000/api/relative/addrelation`,payload).then(res => {
        return  res.data
 })
}

export {fetchAllRelative,deletePerson,updatePerson,createPerson,fetchConnetionOfAPerson,addRelation}