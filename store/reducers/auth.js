import { LOGIN_FAILED, LOGIN_SUCCESS } from '../actions/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			console.log(action.token);
			return { ...state, token: action.token, errors: null };
		case LOGIN_FAILED:
			return { ...state, token: null, errors: action.errors };
		default:
			return state;
	}
}

export default reducer;