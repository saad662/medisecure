import addStockAPI from "../apis/addStock";
import getStockAPI from "../apis/getStocks";
import { ADD_STOCKS, GET_STOCKS } from "../config/constants";

const addStockAction = (formData, cb = () => { }) => async dispatch => {
    try {
        dispatch({ type: ADD_STOCKS.REQUEST });
        var response = await addStockAPI(formData);
        console.log(response, 'response');
        if (response.error) {
            dispatch({ type: ADD_STOCKS.FAIL, payload: response });
            cb(response)
        } else {
            dispatch({ type: ADD_STOCKS.SUCCESS, payload: response });
            cb(response);
        }
    }
    catch (e) {
        console.log(e, 'err');
        cb(false);
        dispatch({ type: ADD_STOCKS.FAIL, payload: response });
    }
    finally {
        dispatch({ type: ADD_STOCKS.COMPLETE, payload: response });
    }
};
const getStocksAction = (productionId, cb = () => { }) => async dispatch => {
    try {
        dispatch({ type: GET_STOCKS.REQUEST });
        var response = await getStockAPI(productionId);
        console.log(response, 'response');
        if (response.error) {
            dispatch({ type: GET_STOCKS.FAIL, payload: response });
            cb(response)
        } else {
            dispatch({ type: GET_STOCKS.SUCCESS, payload: response });
            cb(response);
        }
    }
    catch (e) {
        console.log(e, 'err');
        cb(false);
        dispatch({ type: GET_STOCKS.FAIL, payload: response });
    }
    finally {
        dispatch({ type: GET_STOCKS.COMPLETE, payload: response });
    }
};
export {
    addStockAction,
    getStocksAction
};
