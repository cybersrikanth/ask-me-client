import Header from "../Components/Header";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { SET_USER } from "../constants";
import { UserService } from "../Service/UserService";
import { AuthContext } from "../Context/AuthContext";
import Loader from "../Components/Loader";

const ContentLayout = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const startLoader = () => setLoading(true);
    const stopLoader = () => setLoading(false);
    const { dispatch, state } = useContext(AuthContext);

    useEffect(() => {
        if (!state.isAuthorized) {
            UserService.Profile(
                startLoader,
                handleProfileSuccess,
                handleProfileError,
                stopLoader
            );
        }
    }, []);

    const handleProfileSuccess = (res) => {
        const user = res.data.data;
        dispatch({ type: SET_USER, payload: user });
    };

    const handleProfileError = (err) => {
        console.log(err);
    };
    return (
        <Fragment>
            <Loader show={loading} />
            <Header />
            {children}
        </Fragment>
    );
};

export default ContentLayout;
