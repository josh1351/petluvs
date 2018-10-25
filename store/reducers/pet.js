import { 
    FETCH_PETS_FAILED, 
    FETCH_PETS_SUCCESS, 
    FETCH_PETS_START, 
    ADD_PET_START,
    ADD_PET_SUCCESS,
    ADD_PET_FAILED } from '../actions/actionTypes';

const initialState = {
    pets: [],
    errors: null,
    loading: false
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case ADD_PET_START:
            return { ...state, loading: true, errors: null };
        case ADD_PET_SUCCESS:
            let pets = state.pets.concat(action.pet);
            return { ...state, pets: pets, loading: false, errors: null };
        case ADD_PET_FAILED:
            return { ...state, errors: action.errors,  loading: false };
        case FETCH_PETS_START:
            return { ...state, loading: true, errors: null };
        case FETCH_PETS_SUCCESS:
            return { ...state, pets: action.pets, errors: null, loading: false };
        case FETCH_PETS_FAILED:
            return { state, loading: false, errors: action.errors };
        default:
            return state;
    }
};

export default reducer;

