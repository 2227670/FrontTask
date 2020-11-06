import React from "react";

import CategoriesList from "./Categories/CategoriesList";
import JokesSearch from "./JokesSearch/JokesSearch";
import JokesList from "./Jokes/JokesList";
import RandomJokes from "./RandomJokes/RandomJokes";
import JokesSettings from "./JokesSettings/JokesSettings";

import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        'margin-top': theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    paperJokes: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
    }
}));

function JokesPage(){
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Grid container spacing={1} alignItems={"center"} alignContent={"center"}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className={classes.paper}>
                        <CategoriesList/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className={classes.paper}>
                        <RandomJokes/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.paper}>
                        <JokesSearch/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper >
                        <JokesSettings/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paperJokes}>
                        <JokesList/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default JokesPage