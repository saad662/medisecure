import { GET_DISTRIBUTOR_ORDERS } from "../config/constants";
import getDistributorOrdersAPI from "../apis/getDistributorOrders";

const getDistributorOrdersAction = (productionId, cb = () => { }) => async dispatch => {
    try {
        dispatch({ type: GET_DISTRIBUTOR_ORDERS.REQUEST });
        var response = await getDistributorOrdersAPI(productionId);
        console.log(response, 'response');
        if (response.error) {
            dispatch({ type: GET_DISTRIBUTOR_ORDERS.FAIL, payload: response });
            cb(response)
        } else {
            dispatch({ type: GET_DISTRIBUTOR_ORDERS.SUCCESS, payload: response });
            cb(response);
        }
    }
    catch (e) {
        console.log(e, 'err');
        cb(false);
        dispatch({ type: GET_DISTRIBUTOR_ORDERS.FAIL, payload: response });
    }
    finally {
        dispatch({ type: GET_DISTRIBUTOR_ORDERS.COMPLETE, payload: response });
    }
};

export { getDistributorOrdersAction }