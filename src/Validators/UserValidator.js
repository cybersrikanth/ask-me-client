import * as yup from "yup";

const Login = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(40).required(),
});

export const UserValidator = { Login };
