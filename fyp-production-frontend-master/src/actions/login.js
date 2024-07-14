import loginAPI from "../apis/login";
import { LOGIN_PRODUCTION } from "../config/constants";

const loginAction =
  (formData, cb = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_PRODUCTION.REQUEST });
      const response = await loginAPI(formData);
      console.log(response, "response");
      if (response.error) {
        dispatch({ type: LOGIN_PRODUCTION.FAIL, payload: response });
        cb(response);
      } else {
        dispatch({ type: LOGIN_PRODUCTION.SUCCESS, payload: response });
        cb(response);
      }
    } catch (e) {
      console.log(e, "err");
      const errorResponse = {
        error: true,
        message: "Network error or server is down",
      };
      dispatch({ type: LOGIN_PRODUCTION.FAIL, payload: errorResponse });
      cb(errorResponse);
    } finally {
      dispatch({ type: LOGIN_PRODUCTION.COMPLETE });
    }
  };

export default loginAction;
