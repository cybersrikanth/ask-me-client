import { API_PATH } from "../constants";

const { HttpClient } = require("../Utils/httpClient");

const Page = (page, start, callback, error, next) => {
    start();
    return HttpClient.get(`${API_PATH.QUESTION_PAGE}/${page}`)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Read = (id, start, callback, error, next) => {
    start();
    return HttpClient.get(`${API_PATH.QUESTION}/${id}`)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Create = (payload, start, callback, error, next) => {
    start();
    return HttpClient.post(API_PATH.QUESTION, payload)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Update = (id, payload, start, callback, error, next) => {
    start();
    return HttpClient.patch(`${API_PATH.QUESTION}/${id}`, payload)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Delete = (id, start, callback, error, next) => {
    start();
    return HttpClient.delete(`${API_PATH.QUESTION}/${id}`)
        .then(callback)
        .catch(error)
        .finally(next);
};

export const QuestionService = { Page, Read, Create, Update, Delete };
