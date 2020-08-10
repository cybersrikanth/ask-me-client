import React, { Fragment } from "react";
import { Routes } from "./Routes/Routes";
import { AuthProvider } from "./Context/AuthContext";

function App() {
    return (
        <Fragment>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </Fragment>
    );
}

export default App;
