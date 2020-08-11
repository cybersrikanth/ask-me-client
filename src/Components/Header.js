import React, { useState, useContext } from "react";
import Loader from "./Loader";

import {
    Grid,
    Menu,
    MenuItem,
    AppBar,
    IconButton,
    Toolbar,
    makeStyles,
} from "@material-ui/core";

import { PowerSettingsNew as Power } from "@material-ui/icons";

import { useHistory } from "react-router-dom";
import { LOCAL_PATH, TOKEN, REMOVE_USER } from "../constants";
import { AuthContext } from "../Context/AuthContext";
import { UserService } from "../Service/UserService";

const useStyles = makeStyles({
    authLink: {
        cursor: "pointer",
    },
});

function UserMenu() {
    const history = useHistory();
    const classes = useStyles();
    const { state, dispatch } = useContext(AuthContext);
    const [anchorMenu, setAnchorMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const startLoader = () => setLoading(true);
    const stopLoader = () => setLoading(false);

    const toggleMenu = (event) => {
        setAnchorMenu(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorMenu(null);
    };

    const triggerLogout = () => {
        closeMenu();
        UserService.Signout(
            startLoader,
            handleLogout,
            handleLogout,
            stopLoader
        );
    };

    const handleLogout = (res) => {
        dispatch({ type: REMOVE_USER });
        localStorage.removeItem(TOKEN);
        history.push(LOCAL_PATH.SIGNIN);
    };

    return (
        <React.Fragment>
            <Loader show={loading} />
            {state.isAuthorized ? (
                <>
                    <IconButton
                        aria-owns={
                            Boolean(anchorMenu) ? "menu-appbar" : undefined
                        }
                        aria-haspopup="true"
                        onClick={toggleMenu}
                        color="inherit"
                    >
                        <Power />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorMenu}
                        open={Boolean(anchorMenu)}
                        onClose={closeMenu}
                    >
                        {/* <MenuItem onClick={closeMenu}>Profile</MenuItem> */}
                        <MenuItem onClick={triggerLogout}>Sign out</MenuItem>
                    </Menu>
                </>
            ) : (
                <div
                    className={classes.authLink}
                    onClick={() => history.push(LOCAL_PATH.SIGNIN)}
                >
                    Login
                </div>
            )}
        </React.Fragment>
    );
}

const Header = () => {
    const { state } = useContext(AuthContext);
    return (
        <React.Fragment>
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <Grid item xs={6}>{ state.isAuthorized && `Welcome, ${state.user.email}`} </Grid>
                    <Grid container alignItems="center">
                        <Grid item xs />
                        <Grid item>
                            <UserMenu />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Header;
