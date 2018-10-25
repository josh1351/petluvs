import { combineReducers } from 'redux';

import auth from './auth';
import pets from './pet';
import playDates from './playDates';

export default combineReducers({
	auth,
	pets,
	playDates
});