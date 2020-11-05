import React from "react";
import {connect} from 'react-redux'
import {loadJokesRandomly} from "../../../../actions/actions";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Typography} from "@material-ui/core";


function RandomJokes(props) {

    const handleButtonClick = () => {
        props.loadJokesRandomly()
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <Typography>
                    or use this button
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonClick}>Get random jokes</Button>
            </Grid>
        </Grid>
    );
}

const mapDispatchToProps = {
    loadJokesRandomly
}

export default connect(null, mapDispatchToProps)(RandomJokes)