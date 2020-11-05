import React, {useEffect} from "react";
import {connect} from 'react-redux'
import JokesListItem from './JokesListItem'

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import TablePagination from '@material-ui/core/TablePagination';
import {Typography} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import Icon from "@material-ui/core/Icon";
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import ErrorIcon from '@material-ui/icons/Error';


function JokesList(props) {

    useEffect(() => {
        setPage(0)
        setRowsPerPage(10)
    }, [props.jokes])

    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    if (props.loading) {
        return (<LinearProgress/>)
    } else if (props.error) {
        return (
            <Box>
                <Typography>{props.error}</Typography>
                <Icon>
                    <ErrorIcon fontSize={"large"}/>
                </Icon>
            </Box>)
    }

    return (
        <Box>
            {props.jokes ?
                <Box>
                    <List dense={props.dense}>
                        {props.jokes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(joke => {
                            return <JokesListItem
                                key={joke.id}
                                id={joke.id}
                                joke={joke.value}/>
                        })}
                    </List>
                    <TablePagination
                        component="div"
                        count={props.jokes.length}
                        page={page}
                        onChangePage={handleChangePage}
                        labelRowsPerPage="Jokes per page"
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box> :
                <Box>
                    <Typography>Can't find anything</Typography>
                    <Icon>
                        <TransferWithinAStationIcon fontSize={"large"}/>
                    </Icon>
                </Box>}
        </Box>
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


