import server_url from "../config/serverUrl"
var path = "/medicines/getMedicineByProduction/"
var endpoint = `${server_url}${path}`;

const getMedicinesAPI = (id) => {
    return new Promise((resolve, reject) => {
        fetch(endpoint + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(e => reject(e))
    })
}
export default getMedicinesAPI;