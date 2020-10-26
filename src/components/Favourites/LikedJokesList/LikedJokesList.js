import React from "react";
import {connect} from 'react-redux'
import LikedJokesListItem from './LikedJokesListItem'

import List from '@material-ui/core/List';
import {Typography} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';


function LikedJokesList({jokes, dense}) {
    return (
        <List dense={dense}>
            {jokes.length > 0 ? jokes.map(joke => {
                    return <LikedJokesListItem key={joke.id} id={joke.id} joke={joke.value}/>
                }) :
                <div>
                    <Typography>You don't have any saved joke</Typography>
                    <Icon>
                        <SentimentVeryDissatisfiedIcon fontSize={"large"}/>
                    </Icon>
                </div>
            }
        </List>
    )
}

const mapStateToProps = (state) => {
    return {
        jokes: state.savedJokes,
        dense: state.dense
    }
}

export default connect(mapStateToProps)(LikedJokesList)


