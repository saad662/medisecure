import { LOGIN_PRODUCTION, LOGOUT_PRODUCTION } from "../config/constants";

const INITIAL_STATE = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    user: null
};

export default function reducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        // LOGIN 
        case LOGIN_PRODUCTION.REQUEST:
            return { ...state, isLoading: true, error: null };

        case LOGIN_PRODUCTION.SUCCESS:
            return { ...state, error: null, user: payload.user };

        case LOGIN_PRODUCTION.FAIL:
            return { ...state, error: payload.error, loading: false, user: null };

        case LOGIN_PRODUCTION.COMPLETE:
            return { ...state, isLoading: false };

        //LOGOUT
        case LOGOUT_PRODUCTION.REQUEST:
            return { ...state, isLoading: true, error: null };

        case LOGOUT_PRODUCTION.SUCCESS:
            return { ...state, error: null, user: null };

        case LOGOUT_PRODUCTION.FAIL:
            return { ...state, loading: false, user: null };

        case LOGOUT_PRODUCTION.COMPLETE:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};

