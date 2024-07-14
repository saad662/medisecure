import registerAPI from "../apis/register";
import { REGISTER_PRODUCTION } from "../config/constants";

const register = (formData, cb = () => { }) => async dispatch => {
    try {
        dispatch({ type: REGISTER_PRODUCTION.REQUEST });
        var response = await registerAPI(formData);
        console.log(response, 'response');
        dispatch({ type: REGISTER_PRODUCTION.SUCCESS, payload: response });
        cb(response);
    }
    catch (e) {
        console.log(e, 'err');
        cb(false);
        dispatch({ type: REGISTER_PRODUCTION.FAIL, payload: response });
    }
    finally {
        dispatch({ type: REGISTER_PRODUCTION.COMPLETE, payload: response });
    }
};
export default register;
