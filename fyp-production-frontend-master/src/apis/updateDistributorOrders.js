import server_url from "../config/serverUrl"
var path = "/orders/update"
var endpoint = `${server_url}${path}`;

const updateDistributorOrderAPI = (formData) => {
    return new Promise((resolve, reject) => {
        fetch(endpoint, {
            method: 'PUT',
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
export default updateDistributorOrderAPI;