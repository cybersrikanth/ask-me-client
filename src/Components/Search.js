import React, { useEffect } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { SearchService } from "../Service/SearchService";

const useStyles = makeStyles({
    search: {
        borderRadius: "2px",
        position: "relative",
        width: "100%",
    },
    searchIconWraper: {
        width: "50px",
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        marginLeft: "40px",
    },
});

export const Search = ({
    keyword = "",
    onChange = () => {},
    onComplete = () => {},
}) => {
    const classes = useStyles();

    useEffect(() => {
        if (
            String(keyword) &&
            (String(keyword)[0] !== "#" || String(keyword).length > 1)
        ) {
            SearchService.Search(
                escape(keyword),
                () => {},
                (res) => handleResponse(res, keyword)
            );
        }
        if (!keyword) onComplete(null);
    }, [keyword]);
    const handleResponse = (res, keyword) => {
        const data = res.data.data;
        let result = [];
        if (String(keyword)[0] === "#") {
            result=data
        } else {
            result = data;
        }
        onComplete(result);
    };
    return (
        <div className={classes.search}>
            <div className={classes.searchIconWraper}>
                <SearchIcon />
            </div>
            <TextField
                InputProps={{
                    className: classes.input,
                }}
                value={keyword}
                rowsMax={2}
                onChange={onChange}
                placeholder="Search topics"
            />
        </div>
    );
};
