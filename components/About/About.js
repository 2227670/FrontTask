import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    paper: {
        'margin-top': theme.spacing(1),
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

function About() {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Typography>Unfortunately there is nothing interesting here</Typography>
        </Paper>
    );
}

export default About