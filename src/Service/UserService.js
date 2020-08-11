import { API_PATH } from "../constants";

const { HttpClient } = require("../Utils/httpClient");

const Signup = (payload, start, callback, error, next) => {
    start();
    return HttpClient.post(API_PATH.SIGNUP, payload)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Signin = (payload, start, callback, error, next) => {
    start();
    return HttpClient.post(API_PATH.SIGNIN, payload)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Profile = (start, callback, error, next) => {
    start();
    return HttpClient.get(API_PATH.PROFILE)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Signout = (start, callback, error, next) => {
    start();
    return HttpClient.post(API_PATH.SIGNOUT)
        .then(callback)
        .catch(error)
        .finally(next);
};

export const UserService = { Signin, Profile, Signout, Signup };
