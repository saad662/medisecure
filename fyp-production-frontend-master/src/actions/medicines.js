import createMedicineAPI from "../apis/createMedicine";
import getMedicinesAPI from "../apis/getMedicines";
import { CREATE_MEDICINE, GET_MEDICINE } from "../config/constants";

const createMedicineAction = (formData, cb = () => { }) => async dispatch => {
    try {
        dispatch({ type: CREATE_MEDICINE.REQUEST });
        var response = await createMedicineAPI(formData);
        console.log(response, 'response');
        if (response.error) {
            dispatch({ type: CREATE_MEDICINE.FAIL, payload: response });
            cb(response)
        } else {
            dispatch({ type: CREATE_MEDICINE.SUCCESS, payload: response });
            cb(response);
        }
    }
    catch (e) {
        console.log(e, 'err');
        cb(false);
        dispatch({ type: CREATE_MEDICINE.FAIL, payload: response });
    }
    finally {
        dispatch({ type: CREATE_MEDICINE.COMPLETE, payload: response });
    }
};
const getMedicinesAction = (productionId, cb = () => { }) => async dispatch => {
    try {
        dispatch({ type: GET_MEDICINE.REQUEST });
        var response = await getMedicinesAPI(productionId);
        console.log(response, 'response');
        if (response.error) {
            dispatch({ type: GET_MEDICINE.FAIL, payload: response });
            cb(response)
        } else {
            dispatch({ type: GET_MEDICINE.SUCCESS, payload: response });
            cb(response);
        }
    }
    catch (e) {
        console.log(e, 'err');
        cb(false);
        dispatch({ type: GET_MEDICINE.FAIL, payload: response });
    }
    finally {
        dispatch({ type: GET_MEDICINE.COMPLETE, payload: response });
    }
};
export {
    createMedicineAction,
    getMedicinesAction
};
