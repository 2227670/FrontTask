import React from "react";
import {connect} from 'react-redux';
import {addJokeToFavourite, removeJokeFromFavourites} from '../../../../actions/actions';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';


function JokesListItem(props) {
    return (
        <div>
            <ListItem>
                <ListItemText
                    primary={props.joke}
                    secondary={props.showId ? props.id : null}
                />
                <ListItemSecondaryAction>
                    {props.liked ? <IconButton
                        edge="end" aria-label="delete"
                        onClick={() => props.removeJokeFromFavourites(props.id)}>
                        <DeleteIcon/>
                    </IconButton> : <IconButton
                        edge="end" aria-label="add"
                        onClick={() => props.addJokeToFavourite(props.id)}>
                        <FavoriteIcon/>
                    </IconButton>}
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )
}


const mapDispatchToProps = {
    addJokeToFavourite,
    removeJokeFromFavourites
}

const mapStateToProps = (state) => {
    return {
        showId: state.showId
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JokesListItem)


