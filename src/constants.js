export const BASE_URI = "http://localhost:50000/api";
export const TOKEN = "token";

export const API_PATH = {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    SIGNOUT: "user/signout",
    PROFILE: "/user/profile",
    QUESTION_PAGE: "/question/page",
    QUESTION: "/question",
    ANSWER: "/answer",
    SEARCH: "/question/search"
};

export const LOCAL_PATH = {
    SIGNUP: "/signup",
    SIGNIN: "/signin",
    HOME: "/home",
    QUESTION: "/home/question",
    ASK: "/home/ask",
    ANSWER_CREATE: "/home/answer/create",
    ANSWER_EDIT: "/home/answer/edit",
};

// Context API
export const SET_USER = "set_user";
export const REMOVE_USER = "remove_user";
