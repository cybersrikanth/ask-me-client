import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Redirect, Route } from "react-router-dom";
import { LOCAL_PATH, SET_USER } from "../constants";
import { UserService } from "../Service/UserService";

export const ProtectedRoute = ({ Component, auth, props }) => {
    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        UserService.Profile(
            () => {},
            handleProfile,
            () => {}
        );
    }, []);

    const handleProfile = (res) => {
        const data = res.data.data;
        dispatch({ type: SET_USER, payload: data });
    };
    const Default = auth ? (
        <Redirect to={LOCAL_PATH.HOME} />
    ) : (
        <Redirect to={LOCAL_PATH.SIGNIN} />
    );
    return auth === state.isAuthorized ? <Route component={Component} {...props}/>:Default;
};
