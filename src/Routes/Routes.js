import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Signin } from "../Pages/Signin";
import { HomeRoutes } from "./HomeRoutes";
import { Signup } from "../Pages/SignUp";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/home" component={HomeRoutes} />
                <Redirect from="/" exact to="/home" />
            </Switch>
        </BrowserRouter>
    );
};
