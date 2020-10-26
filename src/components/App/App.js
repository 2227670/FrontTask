import React, {useEffect} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import {connect} from "react-redux"
import {jokesLoaded, categoriesLoaded} from '../../actions/actions';

import Header from "../Header/Header";
import About from "../About/About";
import Favourites from "../Favourites/Favourites";
import JokesPage from "./JokesPage/JokesPage";

import {Container, Paper} from "@material-ui/core";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';


function App(props) {

    useEffect(() => {
       if(props.categories.length < 1) props.categoriesLoaded()
       if(props.jokes.length < 1) props.jokesLoaded()
    })

    const theme = createMuiTheme({
        palette: {
            type: props.darkMode ? 'dark' : 'light',
        },
        overrides: {
            MuiListItemText: {
                primary:{
                    "padding-right": "3.5em"
                }
            }
        }

    })

    return (
        <ThemeProvider theme={theme}>
            <Paper style={{minHeight: "100vh", "border-radius": "0px"}}>
                <Router>
                    <Container maxWidth='md'>
                        <Header/>
                        <Route path='/' exact component={JokesPage}/>
                        <Route path='/about' exact component={About}/>
                        <Route path='/favourites' exact component={Favourites}/>
                    </Container>
                </Router>
            </Paper>
        </ThemeProvider>
    )
}

const mapDispatchToProps = {
    categoriesLoaded,
    jokesLoaded
}

const mapStateToProps = (state) => {
    return {
        darkMode: state.darkMode,
        jokes: state.jokes,
        categories: state.categories
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

