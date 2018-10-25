import {
    CREATE_PLAYDATE_START,
    CREATE_PLAYDATE_SUCCESS,
    CREATE_PLAYDATE_FAILED,
    FETCH_PLAYDATES_START,
    FETCH_PlAYDATES_SUCCESS,
    FETCH_PLAYDATES_FAILED,
  
} from '../actions/actionTypes';

const initialState = {
    playdates: [],
    errors: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PLAYDATE_START:
            return { ...state, loading: true, errors: null };
        case CREATE_PLAYDATE_SUCCESS:
            let playdates = state.playdates.concat(action.playdate);
            return { ...state, loading: false, errors: null, playdates: playdates };
        case CREATE_PLAYDATE_FAILED:
            return { ...state, loading: false, errors: action.errors };
        case FETCH_PLAYDATES_START:
            return { ...state, loading: true, errors: null };
        case FETCH_PLAYDATES_SUCCESS:
            return { ...state, playdates, errors: null, loading: false };
        case FETCH_PLAYDATES_FAILED:
            return { state, loading: false, errors: action.errors };
        default:
            return state;
    }
};

export default reducer;

