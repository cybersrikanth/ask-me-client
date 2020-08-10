import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Signin } from "../Pages/Signin";
import { HomeRoutes } from "./HomeRoutes";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" component={Signin} />
                <Route path="/home" component={HomeRoutes} />
                <Redirect from="/" exact to="/home" />
            </Switch>
        </BrowserRouter>
    );
};
