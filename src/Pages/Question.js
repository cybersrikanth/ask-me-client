import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    makeStyles,
    Divider,
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import Loader from "../Components/Loader";
import { QuestionService } from "../Service/QuestionService";
import { AuthContext } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { LOCAL_PATH } from "../constants";
import { AnswerView } from "../Components/AnswerView";
import { PostAnswer } from "../Components/PostAnswer";

const useStyles = makeStyles({
    header: {
        textAlign: "center",
    },
    questionContainer: {
        margin: "auto",
    },
    rightButton: {
        color: "blue",
        cursor: "pointer",
        float: "right",
        fontWeight: "bolder",
    },
    questionCard: {
        padding: "1rem",
    },
    title: {
        fontWeight: "bold",
    },
    textArea: {
        whiteSpace: "pre-line",
        fontSize: "large",
    },
    tags: {
        color: "#8500c1",
        cursor: "pointer",
    },
    edit: {
        cursor: "pointer",
    },
    email: {
        color: "#7979f2",
        cursor: "pointer",
    },
});

const useQuestion = (id, startLoader, stopLoader) => {
    const [question, setQuestion] = useState({});

    useEffect(() => {
        if (id) {
            QuestionService.Read(
                id,
                startLoader,
                handleQuestionSuccess,
                handleQuestionError,
                stopLoader
            );
        }
    }, [id]);

    const handleQuestionSuccess = (res) => {
        const data = res.data.data;
        setQuestion(data);
    };
    const handleQuestionError = (err) => console.log(err);

    const handleAnswerDelete = (id) => {
        setQuestion((prev) => ({
            ...prev,
            answerId: prev.answerId.filter((item) => item._id !== id),
        }));
    };
    const handleAnswerAdd = (answer) => {
        setQuestion((prev) => ({
            ...prev,
            answerId: [answer].concat(prev.answerId),
        }));
    };
    const handleAnswerEdit = (answer) => {
        setQuestion((prev) => ({
            ...prev,
            answerId: prev.answerId.map((item) =>
                item._id === answer._id ? answer : item
            ),
        }));
    };

    return { question, handleAnswerDelete, handleAnswerAdd, handleAnswerEdit };
};

export const Question = (props) => {
    const classes = useStyles();
    const id = props.match.params.id;
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [underEdit, setUnderEdit] = useState(undefined);
    const [showEditor, setShowEditor] = useState({ show: false });
    const startLoader = () => setLoading(true);
    const stopLoader = () => setLoading(false);
    const { state } = useContext(AuthContext);

    const {
        question,
        handleAnswerDelete,
        handleAnswerAdd,
        handleAnswerEdit,
    } = useQuestion(id, startLoader, stopLoader);

    const deleteQuestion = (id) => {
        QuestionService.Delete(
            id,
            startLoader,
            handleDeleteSuccess,
            handleDeleteError,
            stopLoader
        );
    };
    const handleDeleteSuccess = (res) => {
        history.push(LOCAL_PATH.HOME);
    };
    const handleDeleteError = (err) => {
        console.log(err);
    };

    return (
        <Card>
            <Loader show={loading} />
            <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                    <CardHeader className={classes.header} title="Ask-Me" />
                </Grid>
                <CardContent>
                    {question.answerId && (
                        <Grid
                            item
                            xs={10}
                            className={classes.questionContainer}
                        >
                            <Card className={classes.questionCard}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <div className={classes.title}>
                                                    {question.title}
                                                </div>
                                                <span className={classes.email}>
                                                    ({question.userId.email})
                                                </span>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {state.isAuthorized &&
                                                    state.user._id ===
                                                        question.userId._id && (
                                                        <>
                                                            <EditIcon
                                                                className={
                                                                    classes.edit
                                                                }
                                                                onClick={() =>
                                                                    history.push(
                                                                        `${LOCAL_PATH.ASK}/${question._id}`
                                                                    )
                                                                }
                                                            />
                                                            <DeleteIcon
                                                                className={
                                                                    classes.edit
                                                                }
                                                                onClick={() =>
                                                                    deleteQuestion(
                                                                        question._id
                                                                    )
                                                                }
                                                            />
                                                        </>
                                                    )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <pre className={classes.textArea}>
                                            {question.description}
                                        </pre>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {question.tagId.map((tag, index) => (
                                            <span
                                                key={index}
                                                className={classes.tags}
                                            >
                                                {" "}
                                                #{tag.name}
                                            </span>
                                        ))}
                                        {state.isAuthorized && (
                                            <div
                                                className={classes.rightButton}
                                                onClick={() =>
                                                    setShowEditor({
                                                        show: true,
                                                        questionId:
                                                            question._id,
                                                    })
                                                }
                                            >
                                                Add Answer
                                            </div>
                                        )}
                                    </Grid>
                                    <Divider />
                                    <Grid item xs={12}>
                                        <div className={classes.title}>
                                            Answers:
                                        </div>
                                    </Grid>
                                    {showEditor.show && (
                                        <Grid item xs={12}>
                                            <PostAnswer
                                                {...showEditor}
                                                onComplete={() =>
                                                    setShowEditor({
                                                        show: false,
                                                    })
                                                }
                                                getData={handleAnswerAdd}
                                                startLoader={startLoader}
                                                stopLoader={stopLoader}
                                            />
                                        </Grid>
                                    )}
                                    {question.answerId.map((item, index) =>
                                        underEdit !== item._id ? (
                                            <AnswerView
                                                key={index}
                                                startLoader={startLoader}
                                                stopLoader={stopLoader}
                                                handleDelete={
                                                    handleAnswerDelete
                                                }
                                                handleEdit={() =>
                                                    setUnderEdit(item._id)
                                                }
                                            >
                                                {item}
                                            </AnswerView>
                                        ) : (
                                            <PostAnswer
                                                key={index}
                                                answer={item}
                                                getData={handleAnswerEdit}
                                                onComplete={() =>
                                                    setUnderEdit(null)
                                                }
                                                startLoader={startLoader}
                                                stopLoader={stopLoader}
                                            />
                                        )
                                    )}
                                    {!question.answerId.length && (
                                        <Grid item xs={12}>
                                            <div className={classes.title}>
                                                No answers found
                                            </div>
                                        </Grid>
                                    )}
                                </Grid>
                            </Card>
                        </Grid>
                    )}
                </CardContent>
            </Grid>
        </Card>
    );
};
