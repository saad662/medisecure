import server_url from "../config/serverUrl"
var path = "/medicines/add"
var endpoint = `${server_url}${path}`;

const createMedicineAPI = (formData) => {
    return new Promise((resolve, reject) => {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(e => reject(e))
    })
}
export default createMedicineAPI;