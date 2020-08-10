import { SET_USER, REMOVE_USER } from "../../constants";

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthorized: true,
            };
        case REMOVE_USER:
            return {
                ...state,
                user: {},
                isAuthorized: false,
            };
        default:
            return state;
    }
};
