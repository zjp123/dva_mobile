import axios from 'axios'

export  function propmissTest(){
    return axios.get('http://127.0.0.1:8000/src/mock/res.json')
}

export  function testYeildVlaue(){
    return axios.get('http://127.0.0.1:8000/src/mock/res.json')
}

export  function listVserver(payload){
    console.log(payload, 'serverpaylod')
    return axios.get('http://127.0.0.1:8000/src/mock/list.json', {
        params: payload
    })
}