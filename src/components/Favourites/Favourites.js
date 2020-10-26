import React from "react";
import LikedJokesList from "./LikedJokesList/LikedJokesList";

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import JokesSettings from "../App/JokesPage/JokesSettings/JokesSettings";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        'margin-top': theme.spacing(1)
    },
    paperJokes: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

function Favourites() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1} alignItems={"center"} alignContent={"center"}>
                <Grid item xs={12} sm={12}>
                    <Paper>
                        <JokesSettings/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paperJokes}>
                        <LikedJokesList/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Favourites