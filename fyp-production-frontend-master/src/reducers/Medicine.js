import { CREATE_MEDICINE, GET_MEDICINE } from "../config/constants";

const INITIAL_STATE = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        
        // CREATE MEDICINE
        case CREATE_MEDICINE.REQUEST:
            return { ...state, isLoading: true, error: null };

        case CREATE_MEDICINE.SUCCESS:
            return { ...state, error: null };

        case CREATE_MEDICINE.FAIL:
            return { ...state, error: payload.error, loading: false };

        case CREATE_MEDICINE.COMPLETE:
            return { ...state, isLoading: false };

        // GET MEDICINES
        case GET_MEDICINE.REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_MEDICINE.SUCCESS:
            return { ...state, error: null, medicines: payload.data };

        case GET_MEDICINE.FAIL:
            return { ...state, error: payload.error, loading: false, medicines: [] };

        case GET_MEDICINE.COMPLETE:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};

