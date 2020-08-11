import * as yup from "yup";

const Login = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(40).required(),
});

const Signup = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(40).required(),
    confirm: yup.string().required().oneOf(
        [yup.ref("password"), null],
        "Passwords must match"
    ),
});

export const UserValidator = { Login, Signup };
