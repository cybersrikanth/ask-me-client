import React from "react";
import TextField from "@material-ui/core/TextField";
import { objectResolve } from "../Utils/ObjectResolver";

export const Input = ({ id, field, ...rest }) => {
    const error =
        objectResolve(field.name, rest.form.touched) &&
        objectResolve(field.name, rest.form.errors);
    return (
        <TextField
            {...field}
            {...rest}
            error={Boolean(error)}
            helperText={error}
        />
    );
};
