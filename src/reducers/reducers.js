const initialState = {
    categories: [],
    categoriesLoading: false,
    categoriesLoadingError: null,
    jokes: [],
    savedJokes: [],
    jokesLoading: false,
    jokesLoadingError: null,
    dense: false,
    showId: false,
    darkMode: false
}

const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'CATEGORIES_LOADING_STARTED':
            return {
                ...state,
                categoriesLoading: true
            };
        case 'CATEGORIES_LOADING_ENDED':
            return {
                ...state,
                categories: action.payload,
                categoriesLoading: false
            };
        case 'CATEGORIES_LOADING_ERROR':
            return {
                ...state,
                categoriesLoadingError: action.payload,
                categoriesLoading: false
            };
        case 'JOKES_LOADING_STARTED':
            return {
                ...state,
                jokesLoading: true
            };
        case 'JOKES_LOADING_ENDED':
            return {
                ...state,
                jokes: action.payload,
                jokesLoadingError: null,
                jokesLoading: false
            };
        case 'JOKES_LOADING_ERROR':
            return {
                ...state,
                jokes: null,
                jokesLoadingError: action.payload,
                jokesLoading: false
            };
        case 'JOKE_LIKED':
            return {
                ...state,
                jokes: action.payload.jokes,
                savedJokes: action.payload.savedJokes
            };
        case 'JOKE_UNLIKED':
            return {
                ...state,
                jokes: action.payload.jokes,
                savedJokes: action.payload.savedJokes
            };
        case 'JOKE_CHANGED':
            return {
                ...state,
                savedJokes: action.payload
            };
        case 'DENSE_CHANGED':
            return {
                ...state,
                dense: action.payload
            };
        case 'DARK_MODE_CHANGED':
            return {
                ...state,
                darkMode: action.payload
            };
        case 'SHOW_ID_CHANGED':
            return {
                ...state,
                showId: action.payload
            };
        default:
            return state
    }
}

export default reducer



