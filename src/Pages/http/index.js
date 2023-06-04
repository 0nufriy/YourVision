import { json } from "react-router-dom";

const BASE_URL = "http://192.168.208.94:7178/api";


const requestJSON = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
    })
    if(localStorage.getItem("TOKEN")) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("TOKEN"));
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url,options)
    .then(response => 
        response.status !== 401?
        response.json().then( json =>{
            if(!response.ok){
                return Promise.reject(json);
            }
            return json
            }
        ) : localStorage.removeItem("TOKEN")
    )
}

const requestFile = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
    })
    if(localStorage.getItem("TOKEN")) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("TOKEN"));
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url,options)
    .then(response => {
        return response;
    }
    )
}


export function login(loginRequest){
    return requestJSON({
        url: BASE_URL + "/Auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}
export function getAllSessions(){
    return requestJSON({
        url: BASE_URL + "/Session/get",
        method: 'GET'
    });
}
export function getSession(id){
    return requestJSON({
        url: BASE_URL + "/Session/get/" + id,
        method: 'GET'
    });
}

export function getUnabledata(ids){
    var query = BASE_URL + "/AudiencePack/get/unavaibleDataTime?id=-1"
    ids.forEach(element => {
        query += "&id=" + element
    });
    return requestJSON({
        url: query,
        method: 'GET'
    });
}

export function createReport(id){
    return requestJSON({
        url: BASE_URL + "/Session/report/post/" + id,
        method: 'POST'
    });
}
export function downloadReport(id){
    return requestFile({
        url: BASE_URL + "/Session/report/download/" + id,
        method: 'get'
    });
}
export function deleteSession(id){
    return requestFile({
        url: BASE_URL + "/Session/delete/" + id,
        method: 'DELETE'
    });
}
export function getAudiencePack(id){
    return requestJSON({
        url: BASE_URL + "/AudiencePack/get/" + id,
        method: 'get'
    });
}
export function setConfig(id, request){
    return requestJSON({
        url: BASE_URL + "/Emotional/setConfig/" + id,
        method: 'POST',
        body: JSON.stringify(request)
    });
}

export function getAllAudiencePacks(){
    return requestJSON({
        url: BASE_URL + "/AudiencePack/get",
        method: 'get'
    });
}
export function getUserbyLogin(login){
    return requestJSON({
        url: BASE_URL + "/Profile/get/byLogin/" + login,
        method: 'get'
    });
}

export function updateSession(request){
    return requestJSON({
        url: BASE_URL + "/Session/update",
        method: 'PATCH',
        body: JSON.stringify(request)
    });
}
export function getAllUsers(){
    return requestJSON({
        url: BASE_URL + "/Profile/getAll",
        method: 'get'
    });
}
export function getAllAudiences(){
    return requestJSON({
        url: BASE_URL + "/AudiencePack/Audience/get",
        method: 'get'
    });
}

export function addAduiencePack(request){
    return requestJSON({
        url: BASE_URL + "/AudiencePack/add",
        method: 'POST',
        body: JSON.stringify(request)
    });
}
export function updatePack(request){
    return requestJSON({
        url: BASE_URL + "/AudiencePack/update",
        method: 'PATCH',
        body: JSON.stringify(request)
    });
}
export function deletePack(id){
    return requestFile({
        url: BASE_URL + "/AudiencePack/delete/" + id,
        method: 'DELETE'
    });
}

export function addUser(request){
    return requestJSON({
        url: BASE_URL + "/Auth/register",
        method: 'POST',
        body: JSON.stringify(request)
    });
}
export function deleteUser(id){
    return requestFile({
        url: BASE_URL + "/Profile/delete/" + id,
        method: 'DELETE'
    });
}
export function updateUser(request, id){
    return requestJSON({
        url: BASE_URL + "/Profile/patch/" + id,
        method: 'PATCH',
        body: JSON.stringify(request)
    });
}
export function getUser(id){
    return requestJSON({
        url: BASE_URL + "/Profile/get/" + id,
        method: 'get'
    });
}
export function updatePassword(oldPassword, newPassword, id){
    return requestJSON({
        url: BASE_URL + "/Profile/patch/password/" + id + "?oldPassword=" + oldPassword+"&newPassword=" + newPassword,
        method: 'PATCH'
    });
}