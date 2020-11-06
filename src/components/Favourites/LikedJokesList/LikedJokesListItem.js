import React, {useState} from "react";
import {connect} from 'react-redux';
import {removeJokeFromFavourites} from '../../../actions/actions';
import {changeJokeText} from '../../../actions/actions';

import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';


function SavedJokesListItem(props) {

    const [editJoke, setEditJoke] = useState(false),
        [editJokeText, setEditJokeText] = useState(props.joke),
        [error, setError] = useState(false),
        [errorText, setErrorText] = useState(''),
        [saveBtnStatus, setSaveBtnStatus] = useState(false)


    const saveJoke = () => {
        if (editJokeText !== '') {
            props.changeJokeText(editJokeText, props.id)
            setEditJoke(false)
            setErrorText('')
            setError(false)
        }
    }

    const cancelJokeEditing = () => {
        setEditJoke(false)
        setEditJokeText(props.joke)
    }

    const handleChange = (event) => {
        setEditJokeText(event.target.value)
        if (event.target.value === '') {
            setError(true)
            setSaveBtnStatus(true)
            setErrorText('Cannot be empty')
        } else {
            setError(false)
            setErrorText('')
        }
    }

    return (
        <Box>
            <ListItem>{editJoke ?
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={editJokeText}
                    fullWidth={true}
                    multiline={true}
                    onChange={handleChange}
                    error={error}
                    helperText={errorText}
                    InputProps={{
                        endAdornment: (
                            <Box style={{display: "flex"}}>
                                <IconButton
                                    edge="start"
                                    aria-label="delete"
                                    onClick={cancelJokeEditing}>
                                    <CancelIcon/>
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    disabled={saveBtnStatus}
                                    aria-label="delete"
                                    onClick={saveJoke}>
                                    <SaveIcon/>
                                </IconButton>
                            </Box>
                        )
                    }}/>
                :
                <Box>
                    <ListItemText
                        primary={props.joke}
                        secondary={props.showId ? props.id : null}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="save"
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
                </Box>
            }
            </ListItem>
        </Box>
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