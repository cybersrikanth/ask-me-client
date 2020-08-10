import React, { useState, useEffect } from "react";
import {
    Card,
    Grid,
    CardHeader,
    makeStyles,
    CardContent,
    Button,
    TextareaAutosize,
} from "@material-ui/core";
import Loader from "../Components/Loader";
import { Formik, Form, Field } from "formik";
import { Input } from "../Components/Input";
import { TextArea } from "../Components/TextArea";
import { ChipsArray } from "../Components/ChipsArray";
import { QuestionValidator } from "../Validators/QuestionValidator";
import { QuestionService } from "../Service/QuestionService";

const useStyles = makeStyles({
    header: {
        textAlign: "center",
    },
    questionContainer: {
        margin: "auto",
    },
    questionCard: {
        padding: "1rem",
    },
});

export const AskQuestion = (props) => {
    const id = props.match.params.id;
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
    });
    const startLoader = () => setLoading(true);
    const stopLoader = () => setLoading(false);
    const [tags, setTags] = useState([]);
    const classes = useStyles();

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
        setInitialValues({
            title: data.title,
            description: data.description,
        });
    };
    const handleQuestionError = (err) => {
        console.log(err);
    };

    const handleAsk = (value) => {
        const payload = {
            ...value,
            tagId: tags.map((item) => item.label),
        };
        if (id) {
            QuestionService.Update(
                id,
                { question: payload },
                startLoader,
                handleAskSuccess,
                handleAskError,
                stopLoader
            );
        } else {
            QuestionService.Create(
                { question: payload },
                startLoader,
                handleAskSuccess,
                handleAskError,
                stopLoader
            );
        }
    };

    const handleAskSuccess = (res) => {
        const data = res.data.data;
        console.log(data);
    };

    const handleAskError = (err) => {
        console.log(err);
    };

    const handleTagAdd = (value, { resetForm }) => {
        resetForm();
        if (value.hashTag) {
            setTags((prev) =>
                prev.concat({ key: new Date().valueOf(), label: value.hashTag })
            );
        }
    };

    return (
        <Card>
            <Loader show={loading} />
            <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                    <CardHeader
                        className={classes.header}
                        title="Ask Question"
                    />
                </Grid>
                <CardContent>
                    <Grid item xs={10} className={classes.questionContainer}>
                        <Card className={classes.questionCard}>
                            <Grid container direction="column" spacing={3}>
                                <Formik
                                    onSubmit={handleAsk}
                                    initialValues={initialValues}
                                    validationSchema={QuestionValidator.create}
                                    enableReinitialize
                                >
                                    {() => (
                                        <Form>
                                            <Grid
                                                container
                                                direction="column"
                                                spacing={2}
                                            >
                                                <Grid item>
                                                    <Field
                                                        name="title"
                                                        component={TextArea}
                                                        rowsMin={3}
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        type="text"
                                                        autoFocus
                                                        label="Title"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Field
                                                        name="description"
                                                        component={TextArea}
                                                        rowsMin={10}
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        type="text"
                                                        label="Description"
                                                    />
                                                </Grid>
                                                {id ? null : (
                                                    <Grid item xs={12}>
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <ChipsArray
                                                                    chips={tags}
                                                                    setChips={
                                                                        setTags
                                                                    }
                                                                />
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Formik
                                                                    enableReinitialize
                                                                    initialValues={{
                                                                        hashTag:
                                                                            "",
                                                                    }}
                                                                    validationSchema={
                                                                        QuestionValidator.tag
                                                                    }
                                                                    onSubmit={
                                                                        handleTagAdd
                                                                    }
                                                                >
                                                                    <Form>
                                                                        <Field
                                                                            name="hashTag"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            disabled={
                                                                                tags.length >=
                                                                                5
                                                                            }
                                                                            type="text"
                                                                            fullWidth
                                                                            label="HashTag"
                                                                        />
                                                                    </Form>
                                                                </Formik>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                )}
                                                <Grid item>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        mb={2}
                                                    >
                                                        Ask
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </Grid>
                        </Card>
                    </Grid>
                </CardContent>
            </Grid>
        </Card>
    );
};
