import { API_PATH } from "../constants";

const { HttpClient } = require("../Utils/httpClient");

const Search = (keyword, start, callback, error, next) => {
    start();
    return HttpClient.get(`${API_PATH.SEARCH}?keyword=${keyword}`)
        .then(callback)
        .catch(error)
        .finally(next);
};

export const SearchService = { Search };
