import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import {connect} from "react-redux"
import {loadJokes, loadCategories} from '../../actions/actions';

import Header from "../Header/Header";
import About from "../About/About";
import Favourites from "../Favourites/Favourites";
import JokesPage from "./JokesPage/JokesPage";

import {Container, Paper} from "@material-ui/core";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';


function App(props) {

    useEffect(() => {
        props.categoriesLoaded()
        props.loadJokes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const theme = createMuiTheme({
        palette: {
            type: props.darkMode ? 'dark' : 'light',
        },
        overrides: {
            MuiListItemText: {
                primary: {
                    "padding-right": "3.8em"
                }
            },
            MuiBottomNavigationAction: {
                root: {
                    "&$selected": {
                        "color": props.darkMode ? "#f50057" : "#3f51b5"
                    }
                },
                label: {
                    "color": props.darkMode ? "#ffffff" : "#3f51b5"
                }
            },
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Paper style={{minHeight: "100vh", borderRadius: "0px"}}>
                <Router>
                    <Container maxWidth='md'>
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={JokesPage}/>
                            <Route exact path="/about" component={About}/>
                            <Route exact path="/favorites" component={Favourites}/>
                            <Route render={() => <Redirect to={{pathname: "/"}}/>}/>
                        </Switch>
                    </Container>
                </Router>
            </Paper>
        </ThemeProvider>
    )
}

const mapDispatchToProps = {
    categoriesLoaded: loadCategories,
    loadJokes
}

const mapStateToProps = (state) => {
    return {
        darkMode: state.darkMode,
        jokes: state.jokes,
        categories: state.categories,
        jokesLoadingError: state.jokesLoadingError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

