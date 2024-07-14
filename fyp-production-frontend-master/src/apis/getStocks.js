import server_url from "../config/serverUrl"
var path = "/productionStocks/getStocksByProduction/"
var endpoint = `${server_url}${path}`;

const getStocksAPI = (id) => {
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
export default getStocksAPI;