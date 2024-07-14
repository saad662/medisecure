import createAction from "../helpers/redux_action_generator";

export const REGISTER_PRODUCTION = createAction('REGISTER_PRODUCTION');
export const LOGIN_PRODUCTION = createAction('LOGIN_PRODUCTION');
export const LOGOUT_PRODUCTION = createAction('LOGOUT_PRODUCTION');
export const CREATE_MEDICINE = createAction('CREATE_MEDICINE');
export const GET_MEDICINE = createAction('GET_MEDICINE');
export const ADD_STOCKS = createAction('ADD_STOCKS');
export const GET_STOCKS = createAction('GET_STOCKS');
export const GET_DISTRIBUTOR_ORDERS = createAction('GET_DISTRIBUTOR_ORDERS');
export const UPDATE_DISTRIBUTOR_ORDER = createAction('UPDATE_DISTRIBUTOR_ORDER');
