import React, {useState} from "react";
import {connect} from 'react-redux'
import {searchJokes} from '../../../../actions/actions'

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";


function JokesSearch(props) {

    const [searchValue, setSearchValue] = useState('')

    const handleChange = (event) => {
        setSearchValue(event.target.value)
    }

    const handleClick = () => {
        props.searchJokes(searchValue)
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            props.searchJokes(searchValue)
        }
    }

    return (
        <Box>
            <TextField
                id="standard-basic"
                label="Search something"
                onChange={handleChange}
                onKeyUp={handleKeyPress}
                InputProps={{
                    endAdornment:
                        <IconButton onClick={handleClick}>
                            <SearchIcon/>
                        </IconButton>
                }}/>
        </Box>
    );
}

const mapDispatchToProps = {
    searchJokes
}

export default connect(null, mapDispatchToProps)(JokesSearch)