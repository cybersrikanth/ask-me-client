import { API_PATH } from "../constants";

const { HttpClient } = require("../Utils/httpClient");

const Create = (payload, start, callback, error, next) => {
    start();
    return HttpClient.post(API_PATH.ANSWER, payload)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Update = (id, payload, start, callback, error, next) => {
    start();
    return HttpClient.patch(`${API_PATH.ANSWER}/${id}`, payload)
        .then(callback)
        .catch(error)
        .finally(next);
};

const Delete = (id, start, callback, error, next) => {
    start();
    return HttpClient.delete(`${API_PATH.ANSWER}/${id}`)
        .then(callback)
        .catch(error)
        .finally(next);
};

export const AnswerService = { Create, Delete, Update };
