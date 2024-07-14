import { UPDATE_DISTRIBUTOR_ORDER } from "../config/constants";
import updateDistributorOrdersAPI from "../apis/updateDistributorOrders";

const updateDistributorOrdersAction = (order, cb = () => { }) => async dispatch => {
    try {
        dispatch({ type: UPDATE_DISTRIBUTOR_ORDER.REQUEST });
        var response = await updateDistributorOrdersAPI(order);
        console.log(response, 'response');
        if (response.error) {
            dispatch({ type: UPDATE_DISTRIBUTOR_ORDER.FAIL, payload: response });
            cb(response)
        } else {
            dispatch({ type: UPDATE_DISTRIBUTOR_ORDER.SUCCESS, payload: response });
            cb(response);
        }
    }
    catch (e) {
        console.log(e, 'err');
        cb(false);
        dispatch({ type: UPDATE_DISTRIBUTOR_ORDER.FAIL, payload: response });
    }
    finally {
        dispatch({ type: UPDATE_DISTRIBUTOR_ORDER.COMPLETE, payload: response });
    }
};

export { updateDistributorOrdersAction }