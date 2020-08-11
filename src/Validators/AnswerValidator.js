import * as yup from "yup";

const DEFAULT = {
    MIN: 5,
    MAX: 100000,
};

const Create = yup.object({
    answer: yup.string().required().min(DEFAULT.MIN).max(DEFAULT.MAX),
});

export const AnswerValidator = { Create };
