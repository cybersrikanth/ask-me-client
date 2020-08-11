import React, { useEffect, useState, useContext } from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextArea } from "./TextArea";
import { AnswerValidator } from "../Validators/AnswerValidator";
import { AnswerService } from "../Service/AnswerService";
import { AuthContext } from "../Context/AuthContext";

const useStyles = makeStyles({
    header: {
        textAlign: "center",
    },
    buttons: {
        justifyContent: "space-evenly",
    },
    questionContainer: {
        margin: "auto",
    },
    questionCard: {
        padding: "1rem",
    },
});

export const PostAnswer = ({
    questionId = undefined,
    answer = undefined,
    initialValues = { answer: "" },
    startLoader = () => {},
    stopLoader = () => {},
    onComplete = () => {},
    getData = () => {},
}) => {
    const classes = useStyles();
    const [initialValue, setInitialValue] = useState(initialValues);
    const { state } = useContext(AuthContext);
    const handleSubmit = (values) => {
        const payload = {
            answer: {
                ...values,
                questionId,
            },
        };
        if (questionId) {
            console.log("question", payload);
            AnswerService.Create(
                payload,
                startLoader,
                handleAnswerSuccess,
                handleAnswerError,
                stopLoader
            );
        }
        if (answer) {
            console.log("answer", payload);
            AnswerService.Update(
                answer._id,
                payload,
                startLoader,
                handleAnswerSuccess,
                handleAnswerError,
                stopLoader
            );
        }
    };

    useEffect(() => {
        if (answer) {
            setInitialValue({
                answer: answer.answer,
            });
        }
    }, [answer]);

    const handleAnswerSuccess = (res) => {
        const data = res.data.data;
        data.userId = state.user;
        onComplete();
        getData(data);
    };

    const handleAnswerError = (err) => {
        console.log(err);
        onComplete();
    };
    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValue}
            validationSchema={AnswerValidator.Create}
            enableReinitialize
        >
            {() => (
                <Form>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Field
                                name="answer"
                                component={TextArea}
                                rowsMin={10}
                                style={{
                                    width: "100%",
                                }}
                                type="text"
                                autoFocus
                                label="Your Answer"
                            />
                        </Grid>
                        <Grid container spacing={4} className={classes.buttons}>
                            <Grid item xs={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    mb={2}
                                    onClick={handleAnswerError}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    mb={2}
                                >
                                    Submit Answer
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};
