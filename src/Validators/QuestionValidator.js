const yup = require("yup");

const DEFAULT = {
    TITLE_MIN: 5,
    TITLE_MAX: 255,
    DESC_MIN: 5,
    DESC_MAX: 10000,
};
const TAG = /^[a-zA-Z0-9_]*$/;

const create = yup.object({
    title: yup
        .string()
        .required()
        .min(DEFAULT.TITLE_MIN)
        .max(DEFAULT.TITLE_MAX),
    description: yup
        .string()
        .required()
        .min(DEFAULT.DESC_MIN)
        .max(DEFAULT.DESC_MAX),
});

const tag = yup.object({
    hashTag: yup.string().min(1).max(20).matches(TAG, "invalid tag"),
});

const update = yup.object({
    title: yup
        .string()
        .required()
        .min(DEFAULT.TITLE_MIN)
        .max(DEFAULT.TITLE_MAX),
    description: yup
        .string()
        .required()
        .min(DEFAULT.DESC_MIN)
        .max(DEFAULT.DESC_MAX),
});

export const QuestionValidator = { create, update, tag };
