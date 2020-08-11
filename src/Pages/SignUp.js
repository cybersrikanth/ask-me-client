import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Input } from "../Components/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Loader from "../Components/Loader";
import { makeStyles, Card, CardHeader, Typography } from "@material-ui/core";
import { UserValidator } from "../Validators/UserValidator";
import { UserService } from "../Service/UserService";
import { TOKEN, LOCAL_PATH } from "../constants";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    link: {
        color: "blue",
        cursor: "pointer",
    },
    container: {
        width: "30%",
        height: "60%",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
        margin: "auto",
        padding: "2rem",
        marginTop: "5%",
    },
    center: {
        textAlign: "center",
    },
});
export const Signup = () => {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const handleSignup = (values) => {
        const payload = { user: values };
        UserService.Signup(
            payload,
            startLoading,
            handleLoginSuccess,
            handleLoginError,
            stopLoading
        );
    };

    const handleLoginSuccess = (res) => {
        const token = res.data.data;
        localStorage.setItem(TOKEN, token);
        history.push(LOCAL_PATH.SIGNIN);
    };
    const handleLoginError = (error) => {
        console.log(error);
    };

    const initialValues = {
        email: "",
        password: "",
        confirm: "",
    };
    return (
        <Card className={classes.container}>
            <Formik
                onSubmit={handleSignup}
                initialValues={initialValues}
                validationSchema={UserValidator.Signup}
            >
                {() => (
                    <Form>
                        <Loader show={loading} />
                        <Grid container direction="column" spacing={6}>
                            <Grid item xs={12}>
                                <CardHeader
                                    className={classes.center}
                                    title="Ask-Me"
                                />
                            </Grid>
                            <Grid item>
                                <Field
                                    name="email"
                                    component={Input}
                                    type="email"
                                    fullWidth
                                    autoFocus
                                    label="Email Address"
                                />
                            </Grid>
                            <Grid item>
                                <Field
                                    name="password"
                                    type="password"
                                    component={Input}
                                    fullWidth
                                    label="Password"
                                />
                            </Grid>
                            <Grid item>
                                <Field
                                    name="confirm"
                                    type="password"
                                    component={Input}
                                    fullWidth
                                    label="Confirm Password"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    mb={2}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Already have an account?{" "}
                                    <span
                                        className={classes.link}
                                        onClick={() =>
                                            history.push(LOCAL_PATH.SIGNIN)
                                        }
                                    >
                                        login
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Take me to home page{" "}
                                    <span
                                        className={classes.link}
                                        onClick={() =>
                                            history.push(LOCAL_PATH.HOME)
                                        }
                                    >
                                        Home
                                    </span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};
