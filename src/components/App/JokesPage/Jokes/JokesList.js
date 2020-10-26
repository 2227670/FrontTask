import React from "react";
import {connect} from 'react-redux'
import JokesListItem from './JokesListItem'

import List from '@material-ui/core/List';
import {Typography} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import Icon from "@material-ui/core/Icon";
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import ErrorIcon from '@material-ui/icons/Error';



function JokesList(props) {

    if (props.loading) {
        return (<LinearProgress/>)
    } else if (props.error) {
        return (
            <div>
                <Typography>{props.error}</Typography>
                <Icon>
                    <ErrorIcon fontSize={"large"}/>
                </Icon>
            </div>)
    }

    return (
        <List dense={props.dense}>
            {props.jokes ? props.jokes.map(joke => {
                    return <JokesListItem key={joke.id} id={joke.id} liked={joke.liked} joke={joke.value}/>
                }) :
                <div>
                    <Typography>Can't find anything</Typography>
                    <Icon>
                        <TransferWithinAStationIcon fontSize={"large"}/>
                    </Icon>
                </div>}
        </List>
    )

}

const mapStateToProps = (state) => {
    return {
        jokes: state.jokes,
        loading: state.jokesLoading,
        error: state.jokesLoadingError,
        dense: state.dense
    }
}

export default connect(mapStateToProps)(JokesList)


