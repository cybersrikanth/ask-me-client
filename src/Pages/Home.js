import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    Grid,
    CardHeader,
    CardContent,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { QuestionService } from "../Service/QuestionService";
import Loader from "../Components/Loader";
import { QuestionView } from "../Components/QuestionView";
import { useHistory } from "react-router-dom";
import { LOCAL_PATH } from "../constants";
import { AuthContext } from "../Context/AuthContext";
import { Search } from "../Components/Search";

const useStyles = makeStyles({
    header: {
        display: "flex",
        textAlign: "center",
        margin: "auto",
    },
    add: {
        display: "flex",
        padding: "25px",
        justifyContent: "end",
    },
    addIcon: {
        borderRadius: "50%",
        background: "#3f51b5",
        color: "#FFF",
        width: "35px",
        height: "35px",
        position: "absolute",
        cursor: "pointer",
    },
    loadButton: {
        cursor: "pointer",
        color: "blue",
        textAlign: "center",
    },
    endCard: {
        color: "grey",
        textAlign: "center",
    },
    questionContainer: {
        margin: "auto",
    },
    questionCard: {
        padding: "1rem",
    },
});
const useQuestions = (page, startLoader, stopLoader) => {
    const [questions, setQuestions] = useState([]);
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        const init = () => {
            QuestionService.Page(
                page,
                startLoader,
                handlePageSuccess,
                handlePageFail,
                stopLoader
            );
        };
        init();
    }, [page]);

    const handlePageSuccess = (res) => {
        const data = res.data.data;
        if (!data.length) return setIsOver(true);
        const curLen = questions.length;
        const newQuestions = data.map((item, index) => ({
            _id: item._id,
            title: item.title,
            description: item.description.slice(0, 100),
            answers: item.answerId.length,
            userId: item.userId,
            tagId: item.tagId,
            date: new Date(item.createdAt),
            count: curLen + index + 1,
            edited: item.edited,
        }));
        console.log(data);
        setQuestions((prev) => prev.concat(newQuestions));
    };
    const handlePageFail = (err) => {
        console.log(err);
    };
    return { questions, isOver };
};

export const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const startLoader = () => setLoading(true);
    const stopLoader = () => setLoading(false);
    const [searchResult, setSearchResult] = useState(null);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const questions = useQuestions(page, startLoader, stopLoader);
    const { state } = useContext(AuthContext);

    return (
        <Card>
            <Loader show={loading} />
            <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Search
                                keyword={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onComplete={setSearchResult}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CardHeader
                                title={
                                    searchResult
                                        ? "Search Results"
                                        : "Recent Questions"
                                }
                                className={classes.header}
                            />
                        </Grid>

                        <Grid item xs={3} className={classes.add}>
                            {state.isAuthorized && (
                                <AddIcon
                                    className={classes.addIcon}
                                    onClick={() => history.push(LOCAL_PATH.ASK)}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                {!searchResult ? (
                    <CardContent>
                        <Grid
                            item
                            xs={10}
                            className={classes.questionContainer}
                        >
                            <Card className={classes.questionCard}>
                                {questions.questions.map((item, index) => (
                                    <QuestionView key={index} question={item} />
                                ))}
                            </Card>
                        </Grid>
                        {questions.isOver ? (
                            <div className={classes.endCard}>
                                No questions to load
                            </div>
                        ) : (
                            <div
                                className={classes.loadButton}
                                onClick={() => setPage((page) => page + 1)}
                            >
                                load more
                            </div>
                        )}
                    </CardContent>
                ) : (
                    <CardContent>
                        <Grid
                            item
                            xs={10}
                            className={classes.questionContainer}
                        >
                            {searchResult.map((item, index) => (
                                <QuestionView key={index} question={item} />
                            ))}
                            {!searchResult.length && (
                                <Typography>
                                    No result for <b>{keyword}</b>
                                </Typography>
                            )}
                        </Grid>
                    </CardContent>
                )}
            </Grid>
        </Card>
    );
};
