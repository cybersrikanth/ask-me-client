import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../Pages/Home";
import ContentLayout from "../Layouts/ContentLayout";
import { Question } from "../Pages/Question";
import { AskQuestion } from "../Pages/AskQuestion";
import { AuthContext } from "../Context/AuthContext";

export const HomeRoutes = (props) => {
    const { state } = useContext(AuthContext);
    return (
        <ContentLayout>
            <Switch>
                <Route
                    path={`${props.match.url}/question/:id`}
                    exact
                    component={Question}
                />
                {state.isAuthorized && (
                    <Route
                        path={`${props.match.url}/ask`}
                        exact
                        component={AskQuestion}
                    />
                )}
                {state.isAuthorized && (
                    <Route
                        path={`${props.match.url}/ask/:id`}
                        exact
                        component={AskQuestion}
                    />
                )}
                <Route path="/" component={Home} />
            </Switch>
        </ContentLayout>
    );
};
