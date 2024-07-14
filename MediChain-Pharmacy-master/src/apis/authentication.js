const url = "http://localhost:8080";

export const login = (creds) => {
    return fetch(`${url}/distributors/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(creds)
    })
};
export const addStock = (creds) => {
    return fetch(`${url}/orders/add`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(creds)
    })
};
export const addOrder = (creds) => {
    return fetch(`${url}/CustomerOrders/add`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(creds)
    })
};
export const updateOrder = (creds) => {
    return fetch(`${url}/CustomerOrders/update`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(creds)
    })
};
export const getCurrentUser = (authToken) => {
    return fetch(`${url}/distributor/currentUser`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization" : `Basic ${authToken}`
        },
    })
};
export const registerUser = (creds) => {
    return fetch(`${url}/distributors/register` , {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(creds),
    })
};
export const getAllProduction = (authToken) => {
    return fetch(`${url}/productions/getAll`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Basic ${authToken}`
        },
    })
};
export const getAllMedicines = (authToken) => {
    return fetch(`${url}/getAllMedicines`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Basic ${authToken}`
        },
    })
};
export const getMedicine = (Id) => {
    return fetch(`${url}/getMedicine/${Id}`), {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    }
};