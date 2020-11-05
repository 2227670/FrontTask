import React from "react";
import {connect} from 'react-redux'
import {loadJokesByCategory} from '../../../../actions/actions'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {Typography} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';

function CategoriesList(props) {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        props.loadJokesByCategory(props.categories[selectedIndex])
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        props.loadJokesByCategory(props.categories[index])
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };


    if (props.loading) {
        return (<LinearProgress/>)
    } else if (props.error) {
        return (<Typography>{props.error}</Typography>)
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <Typography>
                    Choose by category
                </Typography>
                <ButtonGroup
                    variant="contained"
                    color="primary"
                    ref={anchorRef}
                    aria-label="split button">
                    <Button onClick={handleClick}>{props.categories[selectedIndex]}</Button>
                    <Button
                        color="primary"
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon/>
                    </Button>
                </ButtonGroup>
                <Popper open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        style={{"zIndex": 4}}>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu">
                                        {props.categories.map((category, index) => (
                                            <MenuItem
                                                key={category}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    )

}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        loading: state.categoriesLoading,
        error: state.categoriesLoadingError
    }
}

const mapDispatchToProps = {
    loadJokesByCategory
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)


