import React from "react";
import {connect} from 'react-redux';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {changeDenseSetting, changeDarkModeSetting, changeShowIdSetting} from "../../../../actions/actions";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    paperSettings: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));


function JokesSettings(props) {

    const classes = useStyles();

    return (
        <Paper className={classes.paperSettings}>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox checked={props.dense}
                                  onChange={(event) => props.changeDenseSetting(event.target.checked)}/>
                    }
                    label="Enable dense"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.showId}
                            onChange={(event) => props.changeShowIdSetting(event.target.checked)}
                        />
                    }
                    label="Show joke id"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.darkMode}
                            onChange={(event) => props.changeDarkModeSetting(event.target.checked)}/>
                    }
                    label="Dark mode"
                />
            </FormGroup>
        </Paper>
    )

}

const mapDispatchToProps = {
    changeDenseSetting,
    changeDarkModeSetting,
    changeShowIdSetting
}

const mapStateToProps = (state) => {
    return {
        dense: state.dense,
        showId: state.showId,
        darkMode: state.darkMode
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JokesSettings)


