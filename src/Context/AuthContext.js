import React, { createContext, useReducer } from "react";
import { initialState } from "./Store/AuthStore";
import { AuthReducer } from "./Reducer/AuthReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
