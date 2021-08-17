import axios from 'axios'
function fetchAllRelative(){
    return axios.get("http://localhost:8000/api/relative/").then(res => {
       return  res.data
})
}

function deletePerson(id){
    return axios.get(`http://localhost:8000/api/relative/delete?id=${id}`)
}

export {fetchAllRelative,deletePerson}