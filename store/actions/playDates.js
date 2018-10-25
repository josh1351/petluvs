import {
    AsyncStorage
} from 'react-native';

import {
    CREATE_PLAYDATE_START,
    CREATE_PLAYDATE_SUCCESS,
    CREATE_PLAYDATE_FAILED,
    FETCH_ALL_PLAYDATES,
    FETCH_PLAYDATES_START,
    FETCH_PlAYDATES_SUCCESS,
    FETCH_PLAYDATES_FAILED

} from './actionTypes';

import {
    baseurl,
    token
} from '../../BaseUrl';

// Creating a playdate
export const createPlaydate = (playDateData) => async dispatch => {

    const playdate = {
        "pets": "5bbf8a7e642fe7829b24e972",
        "place": "560 oak branch circle",
        "startTime": "12-08-2018",
        "endTime": "12-09-2018",
        "status": "public",
        "nofityFriends": true
    };

    dispatch({
        type: CREATE_PLAYDATE_START
    });

    try {
        let response = await fetch(`${baseurl}/playdates`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(playdate)
        });

        let responseJson = await response.json();

        if (response.status == 200) {
            dispatch(createPlaydateSuccess(responseJson));
        } else {
            dispatch(createPlaydateFailed(responseJson.errors));
        }
    } catch (e) {
        console.log('failed to make request' + e);
        let errors = 'Request Failed when creating playdate';
        dispatch(createPlaydateFailed({
            'errors': errors
        }));
    }
};

// Create playdate success
export const createPlaydateSuccess = (playdate) => {
    console.log('success => 58 =>', playdate);
    return {
        type: CREATE_PLAYDATE_SUCCESS,
        playdate
    };
};

// Create playdate failed
export const createPlaydateFailed = (errors) => {
    console.log('error => 66 =>', errors);
    return {
        type: CREATE_PLAYDATE_FAILED,
        errors
    };
};

// Updating a playdate
export const updatePlaydate = (playDateData) => async dispatch => {
    console.log(playDateData);
};

// Delete a playdate
export const deletePlaydate = (playDateData) => async dispatch => {
    console.log(playDateData);
};

// Fetch All Playdates
export const fetchPlaydates = () => async dispatch => {
    try {
        let response = await fetch(`${baseurl}/playdates`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        let responseJson = await response.json();
        if (response.status == 200) {
            // console.log(responseJson);
           dispatch(fetchPlaydateSuccess(responseJson))
        } else {
            // console.log(responseJson.errors);
            dispatch(fetchPetsFailed(responseJson.errors));
        }
    } catch (e) {
        console.log('failed to make request');
        let errors = 'Request Failed';
        dispatch(fetchPetsFailed({'errors': errors}));
    }
};

export const fetchPlaydatesSuccess = (playdate) => {
    console.log('success => 13 =>', playdate);
    return {
        type: FETCH_PlAYDATES_SUCCESS,
        playdate
    };
};

// Playdate Failed
export const fetchPlaydatesFailed = (errors) => {
    console.log('success => 14 =>', errors);
    return {
        type: FETCH_PLAYDATES_FAILED,
        errors
    };
};

// Fetch one Playdate with id
export const fetchPlaydate = () => async dispatch => {
    console.log(playDateData);
};