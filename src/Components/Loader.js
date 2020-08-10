import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";

import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        minHeight: "100%",
        background: "black",
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 10000,
        opacity: 0.4,
    },
});

function Loader({ show = false }) {
    const classes = useStyles();
    const loaderComponent = (
        <div className={classes.container}>
            <CircularProgress m={2} color="secondary" />
        </div>
    );
    return <Fragment>{show && loaderComponent}</Fragment>;
}

export default Loader;
