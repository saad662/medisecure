import { ADD_STOCKS, GET_STOCKS } from "../config/constants";

const INITIAL_STATE = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {

        // CREATE STOCKS
        case ADD_STOCKS.REQUEST:
            return { ...state, isLoading: true, error: null };

        case ADD_STOCKS.SUCCESS:
            return { ...state, error: null };

        case ADD_STOCKS.FAIL:
            return { ...state, error: payload.error, loading: false };

        case ADD_STOCKS.COMPLETE:
            return { ...state, isLoading: false };

        // GET STOCKS
        case GET_STOCKS.REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_STOCKS.SUCCESS:
            return { ...state, error: null, stocks: payload.data };

        case GET_STOCKS.FAIL:
            return { ...state, error: payload.error, loading: false, stocks: [] };

        case GET_STOCKS.COMPLETE:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};

