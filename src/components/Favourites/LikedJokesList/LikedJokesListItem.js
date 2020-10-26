import React, {useState} from "react";
import {connect} from 'react-redux';
import {removeJokeFromFavourites} from '../../../actions/actions';
import {changeJokeText} from '../../../actions/actions';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';


function SavedJokesListItem(props) {

    const [editJoke, setEditJoke] = useState(false)
    const [editJokeText, setEditJokeText] = useState(props.joke)

    const saveJoke = () => {
        props.changeJokeText(editJokeText, props.id)
        setEditJoke(false)
    }

    const handleChange = (event) => {
        setEditJokeText(event.target.value)
    }

    return (
        <div>
            <ListItem>{editJoke ?
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={editJokeText}
                    fullWidth={true}
                    multiline={true}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment:
                            <IconButton onClick={saveJoke}>
                                <SaveIcon/>
                            </IconButton>
                    }}/>
                :
                <div>
                    <ListItemText
                        primary={props.joke}
                        secondary={props.showId ? props.id : null}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => setEditJoke(true)}>
                            <CreateIcon/>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => props.removeJokeFromFavourites(props.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </div>
            }
            </ListItem>
        </div>
    )
}

const mapDispatchToProps = {
    removeJokeFromFavourites,
    changeJokeText
}

const mapStateToProps = (state) => {
    return {
        showId: state.showId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedJokesListItem)