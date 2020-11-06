import axios from 'axios'
import store from '../store'

export const CATEGORIES_LOADING_STARTED = "CATEGORIES_LOADING_STARTED";
export const CATEGORIES_LOADING_ENDED = 'CATEGORIES_LOADING_ENDED';
export const CATEGORIES_LOADING_ERROR = 'CATEGORIES_LOADING_ERROR';
export const JOKES_LOADING_STARTED = 'JOKES_LOADING_STARTED';
export const JOKES_LOADING_ENDED = 'JOKES_LOADING_ENDED';
export const JOKES_LOADING_ERROR = 'JOKES_LOADING_ERROR';
export const ADD_JOKE = 'ADD_JOKE';
export const REMOVE_JOKE = 'REMOVE_JOKE';
export const JOKE_CHANGED = 'JOKE_CHANGED';
export const DENSE_CHANGED = 'DENSE_CHANGED';
export const DARK_MODE_CHANGED = 'DARK_MODE_CHANGED';
export const SHOW_ID_CHANGED = 'SHOW_ID_CHANGED';


const loadCategories = () => {
    return dispatch => {
        dispatch(GetCategoriesStarted())
        axios.get('https://api.chucknorris.io/jokes/categories')
            .then((result) => {
                dispatch(GetCategoriesSuccess(result.data))
            }).catch(error => {
            dispatch(GetCategoriesFailure(error.response ? error.response.data.message : 'Network error'))
        })
    }
}

const GetCategoriesStarted = () => ({
    type: CATEGORIES_LOADING_STARTED
})
const GetCategoriesSuccess = result => ({
    type: CATEGORIES_LOADING_ENDED,
    payload: result
})
const GetCategoriesFailure = error => ({
    type: CATEGORIES_LOADING_ERROR,
    payload: error
})

const loadJokesByCategory = (category) => {
    return dispatch => {
        dispatch(GetJokesStarted())
        let jokes = [],
            queryFailed = 0;
        (function fetchApi() {
            axios.get('https://api.chucknorris.io/jokes/random?category=' + category)
                .then((result) => {
                    if (isNewJoke(jokes, result.data.id)) {
                        jokes.push({
                            value: result.data.value,
                            id: result.data.id
                        })
                    } else {
                        ++queryFailed
                    }
                    if (queryFailed >= 6) {
                        dispatch(GetJokesEnded(jokes))
                    } else {
                        fetchApi()
                    }
                }).catch(error => {
                dispatch(GetJokesFailure(error.response ? error.response.data.message : 'Network error'))
            })
        }());
    }
}

function loadJokesRandomly() {
    return dispatch => {
        dispatch(GetJokesStarted())
        let jokes = []
        for (let i = 0; i <= 7; i++) {
            axios.get('https://api.chucknorris.io/jokes/random')
                .then((result) => {
                    if (isNewJoke(jokes, result.data.id)) {
                        jokes.push({
                            value: result.data.value,
                            id: result.data.id
                        })
                    }
                    if (i === 7) dispatch(GetJokesEnded(jokes))
                }).catch(error => {
                dispatch(GetJokesFailure(error.response ? error.response.data.message : 'Network error'))
            })
        }
    }
}

function searchJokes(query) {
    return dispatch => {
        dispatch(GetJokesStarted())
        let jokes = []
        axios.get('https://api.chucknorris.io/jokes/search?query=' + query.trim())
            .then((result) => {
                if (result.data.result.length > 0) {
                    result.data.result.forEach(joke => {
                        if (isNewJoke(jokes, joke.id)) {
                            jokes.push({
                                value: joke.value,
                                id: joke.id
                            })
                        }
                    })
                    dispatch(GetJokesEnded(jokes))
                } else dispatch(GetJokesEnded(null))
            }).catch(error => {
            dispatch(GetJokesFailure(error.response ? error.response.data.message : 'Network error'))
        })
    }
}

function isNewJoke(jokes, newJokeId) {
    let newJoke = true;
    jokes.forEach(joke => {
        if (joke.id === newJokeId) {
            newJoke = false
        }
    })
    return newJoke
}

const GetJokesStarted = () => ({
    type: JOKES_LOADING_STARTED,
})
const GetJokesEnded = result => ({
    type: JOKES_LOADING_ENDED,
    payload: result
})
const GetJokesFailure = result => ({
    type: JOKES_LOADING_ERROR,
    payload: result
})

const addJokeToFavourites = newJoke => {
    return dispatch => {
        dispatch(MoveJokeToFavourites(newJoke))
    }
}

const MoveJokeToFavourites = newJoke => ({
    type: ADD_JOKE,
    payload: newJoke
})

const removeJokeFromFavourites = (changedJokeId) => {
    return dispatch => {
        dispatch(RemoveJokeFromFavourites(changedJokeId))
    }
}

const RemoveJokeFromFavourites = jokeId => ({
    type: REMOVE_JOKE,
    payload: jokeId
})

const changeJokeText = (savedJoke, savedJokeId) => {
    return dispatch => {
        let savedJokes = [...store.getState().savedJokes]
        savedJokes.forEach(joke => {
            if (joke.id === savedJokeId) {
                joke.value = savedJoke
            }
        })
        dispatch(ChangeJokeValue(savedJokes))
    }
}

const ChangeJokeValue = savedJokes => ({
    type: JOKE_CHANGED,
    payload: savedJokes
})

const changeDenseSetting = (dense) => {
    return dispatch => {
        dispatch(ChangeDense(dense))
    }
}

const ChangeDense = status => ({
    type: DENSE_CHANGED,
    payload: status
})

const changeDarkModeSetting = (darkMode) => {
    return dispatch => {
        dispatch(ChangeDarkMode(darkMode))
    }
}

const ChangeDarkMode = status => ({
    type: DARK_MODE_CHANGED,
    payload: status
})

const changeShowIdSetting = (showId) => {
    return dispatch => {
        dispatch(changeShowId(showId))
    }
}

const changeShowId = status => ({
    type: SHOW_ID_CHANGED,
    payload: status
})


export {
    loadCategories,
    loadJokesRandomly,
    loadJokesByCategory,
    searchJokes,
    addJokeToFavourites,
    removeJokeFromFavourites,
    changeJokeText,
    changeDenseSetting,
    changeDarkModeSetting,
    changeShowIdSetting
}




