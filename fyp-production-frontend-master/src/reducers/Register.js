import { REGISTER_PRODUCTION } from "../config/constants";

const INITIAL_STATE = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_PRODUCTION.REQUEST:
            return { ...state, isLoading: true, error: null };

        case REGISTER_PRODUCTION.SUCCESS:
            return { ...state, error: null, };

        case REGISTER_PRODUCTION.FAIL:
            return { ...state, error: payload.error, loading: false };

        case REGISTER_PRODUCTION.COMPLETE:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

