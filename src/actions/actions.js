import axios from 'axios'
import store from '../store'


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
    type: 'CATEGORIES_LOADING_STARTED'
})
const GetCategoriesSuccess = result => ({
    type: 'CATEGORIES_LOADING_ENDED',
    payload: result
})
const GetCategoriesFailure = error => ({
    type: 'CATEGORIES_LOADING_ERROR',
    payload: error
})

const loadJokes = (category = null) => {
    return dispatch => {
        dispatch(GetJokesStarted())
        let jokes = [],
            savedJokes = [...store.getState().savedJokes],
            path = null
        category ? path = '?category=' + category : path = ''
        for (let i = 0; i <= 7; i++) {
            axios.get('https://api.chucknorris.io/jokes/random' + path)
                .then((result) => {
                    if (isNewJoke(jokes, result.data.id)) {
                        jokes.push({
                            value: result.data.value,
                            id: result.data.id,
                            liked: isNewJoke(savedJokes, result.data.id) ? false : true
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
        let jokes = [],
            jokesStorageFull = false,
            savedJokes = [...store.getState().savedJokes]
        axios.get('https://api.chucknorris.io/jokes/search?query=' + query.trim())
            .then((result) => {
                if (result.data.result.length > 0) {
                    result.data.result.forEach(joke => {
                        if (!jokesStorageFull && isNewJoke(jokes, joke.id)) {
                            jokes.push({
                                value: joke.value,
                                id: joke.id,
                                liked: isNewJoke(savedJokes, joke.id) ? false : true
                            })
                            if (jokes.length > 5) {
                                jokesStorageFull = true
                                dispatch(GetJokesEnded(jokes))
                            }
                        }
                    })
                    if (!jokesStorageFull) dispatch(GetJokesEnded(jokes))
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
    type: 'JOKES_LOADING_STARTED',
})
const GetJokesEnded = result => ({
    type: 'JOKES_LOADING_ENDED',
    payload: result
})
const GetJokesFailure = result => ({
    type: 'JOKES_LOADING_ERROR',
    payload: result
})

const addJokeToFavourites = (changedJokeId) => {
    return dispatch => {
        let jokes = [...store.getState().jokes]
        let savedJokes = [...store.getState().savedJokes]
        jokes.forEach(joke => {
            if (joke.id === changedJokeId) {
                joke.liked = !joke.liked
                savedJokes.push({
                    value: joke.value,
                    id: joke.id
                })
            }
        })
        dispatch(MoveJokeToFavourites({jokes, savedJokes}))
    }
}

const MoveJokeToFavourites = jokes => ({
    type: 'JOKE_LIKED',
    payload: jokes
})

const removeJokeFromFavourites = (changedJokeId) => {
    return dispatch => {
        let jokes = [...store.getState().jokes]
        let savedJokes = [...store.getState().savedJokes]
        jokes.forEach(joke => {
            if (joke.id === changedJokeId) {
                joke.liked = !joke.liked
            }
        })
        let removeJoke = savedJokes.map(function (joke) {
            return joke.id
        }).indexOf(changedJokeId)
        savedJokes.splice(removeJoke, 1)
        dispatch(RemoveJokeFromFavourites({jokes, savedJokes}))
    }
}

const RemoveJokeFromFavourites = jokes => ({
    type: 'JOKE_LIKED',
    payload: jokes
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
    type: 'JOKE_CHANGED',
    payload: savedJokes
})

const changeDenseSetting = (dense) => {
    return dispatch => {
        dispatch(ChangeDense(dense))
    }
}

const ChangeDense = status => ({
    type: 'DENSE_CHANGED',
    payload: status
})

const changeDarkModeSetting = (darkMode) => {
    return dispatch => {
        dispatch(ChangeDarkMode(darkMode))
    }
}

const ChangeDarkMode = status => ({
    type: 'DARK_MODE_CHANGED',
    payload: status
})

const changeShowIdSetting = (showId) => {
    return dispatch => {
        dispatch(changeShowId(showId))
    }
}

const changeShowId = status => ({
    type: 'SHOW_ID_CHANGED',
    payload: status
})


export {
    loadCategories,
    loadJokes,
    searchJokes,
    addJokeToFavourites,
    removeJokeFromFavourites,
    changeJokeText,
    changeDenseSetting,
    changeDarkModeSetting,
    changeShowIdSetting
}




