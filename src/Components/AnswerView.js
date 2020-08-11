import React, { useContext } from "react";
import { Grid, makeStyles, Divider } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { timeSince } from "../Utils/TimeSince";
import { AnswerService } from "../Service/AnswerService";

const useStyles = makeStyles({
    textArea: {
        whiteSpace: "pre-line",
        fontSize: "large",
    },
    email: {
        color: "#7979f2",
        cursor: "pointer",
    },
    edit: {
        cursor: "pointer",
    },
    grey: {
        color: "grey",
    },
});
export const AnswerView = ({
    children,
    handleDelete = () => {},
    handleEdit = () => {},
    startLoader = () => {},
    stopLoader = () => {},
}) => {
    const { state } = useContext(AuthContext);
    const classes = useStyles();

    const deleteAnswer = (id) => {
        AnswerService.Delete(
            id,
            startLoader,
            () => handleDelete(id),
            handleDelteAnswerError,
            stopLoader
        );
    };

    const handleDelteAnswerError = (err) => {
        console.log(err);
    };
    return (
        <>
            <Grid container>
                <Grid item xs={11}>
                    <span className={classes.email}>
                        {children.userId.email}
                    </span>{" "}
                    <span className={classes.grey}>
                        ({timeSince(new Date(children.createdAt))} ago...){" "}
                        {children.edited && "(edited)"}
                    </span>
                </Grid>
                <Grid item xs={1}>
                    {state.isAuthorized &&
                        state.user._id === children.userId._id && (
                            <>
                                <EditIcon
                                    className={classes.edit}
                                    onClick={handleEdit}
                                />
                                <DeleteIcon
                                    className={classes.edit}
                                    onClick={() => deleteAnswer(children._id)}
                                />
                            </>
                        )}
                </Grid>
                <Grid item xs={12}>
                    <pre className={classes.textArea}>{children.answer}</pre>
                </Grid>
            </Grid>
            <Divider />
        </>
    );
};
