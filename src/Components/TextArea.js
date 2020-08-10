import React from "react";
import { TextareaAutosize, InputLabel, makeStyles } from "@material-ui/core";
import { objectResolve } from "../Utils/ObjectResolver";

const useStyles = makeStyles({
    error: {
        color: "red",
    },
});

export const TextArea = ({ id, field, label, ...rest }) => {
    const classes = useStyles();
    const error =
        objectResolve(field.name, rest.form.touched) &&
        objectResolve(field.name, rest.form.errors);
    return (
        <div>
            <InputLabel>{label}</InputLabel>
            <TextareaAutosize
                {...field}
                {...rest}
            />
            {Boolean(error) ? (
                <InputLabel className={classes.error}>{error}</InputLabel>
            ):null}
        </div>
    );
};
