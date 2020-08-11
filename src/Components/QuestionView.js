import React from "react";
import { Grid, makeStyles, Divider } from "@material-ui/core";
import { timeSince } from "../Utils/TimeSince";
import { useHistory } from "react-router-dom";
import { LOCAL_PATH } from "../constants";

const useStyles = makeStyles({
    title: {
        fontWeight: "bold",
    },
    email: {
        color: "#7979f2",
        cursor: "pointer",
    },
    viewButton: {
        color: "blue",
        cursor: "pointer",
    },
    grey: {
        color: "grey",
    },
    sinceNow: {
        float: "right",
        color: "grey",
    },
    margin: {
        marginBottom: "1rem",
    },
    count: {
        textAlign: "center",
        fontSize: "1.5rem",
    },
    tags: {
        color: "#8500c1",
        cursor: "pointer",
    },
});

export const QuestionView = ({ question }) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={1} className={classes.count}>
                <div>{question.count}</div>
            </Grid>
            <Grid item xs={11}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs={12}>
                        <span className={classes.title}>{question.title}</span>
                        <span className={classes.email}>
                            {" "}
                            ({question.userId && question.userId.email})
                        </span>{" "}
                        {question.edited && (
                            <span className={classes.grey}>(edited)</span>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {question.description}...
                    </Grid>
                    <Grid item xs={12}>
                        <span
                            className={classes.viewButton}
                            onClick={() =>
                                history.push(
                                    `${LOCAL_PATH.QUESTION}/${question._id}`
                                )
                            }
                        >
                            Read More...
                        </span>
                        {" | "}
                        <span className={classes.grey}>
                            (
                            {question.answers ||
                                (question.answerId &&
                                    question.answerId.length)}{" "}
                            answers)
                        </span>
                        {" | "}
                        {question.tagId &&
                            question.tagId.map((tag, index) => (
                                <span key={index} className={classes.tags}>
                                    {" "}
                                    #{tag.name}
                                </span>
                            ))}
                        <span className={classes.sinceNow}>
                            {timeSince(
                                question.date || new Date(question.createdAt)
                            )}{" "}
                            ago...
                        </span>
                    </Grid>
                    <Divider className={classes.margin} />
                </Grid>
            </Grid>
        </Grid>
    );
};
