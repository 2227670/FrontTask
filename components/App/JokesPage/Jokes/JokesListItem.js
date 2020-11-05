import React from "react";
import {connect} from 'react-redux';
import {addJokeToFavourites, removeJokeFromFavourites} from '../../../../actions/actions';

import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';


function JokesListItem(props) {
    return (
        <Box>
            <ListItem>
                <ListItemText
                    primary={props.joke}
                    secondary={props.showId ? props.id : null}
                />
                <ListItemSecondaryAction>
                    {props.liked ?
                        <IconButton
                            edge="end" aria-label="delete"
                            onClick={() => props.removeJokeFromFavourites(props.id)}>
                            <DeleteIcon/>
                        </IconButton> :
                        <IconButton
                            edge="end" aria-label="add"
                            onClick={() => props.addJokeToFavourites({
                                id: props.id,
                                value: props.joke
                            })}>
                            <FavoriteIcon/>
                        </IconButton>}
                </ListItemSecondaryAction>
            </ListItem>
        </Box>
    )
}


const mapDispatchToProps = {
    addJokeToFavourites,
    removeJokeFromFavourites
}

const mapStateToProps = (state, ownProps) => {
    return {
        showId: state.showId,
        liked: state.savedJokes.find(joke => joke.id === ownProps.id)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JokesListItem)


