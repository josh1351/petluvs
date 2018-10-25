import {
    AsyncStorage
} from 'react-native';
import {
    FETCH_PETS_FAILED,
    FETCH_PETS_SUCCESS,
    FETCH_PETS_START,
    ADD_PET_SUCCESS,
    ADD_PET_FAILED,
    ADD_PET_START
} from './actionTypes';

import {
    baseurl,
    token
} from '../../BaseUrl';

export const addPet = (petData) => async dispatch => {
    // let token = await AsyncStorage.getItem('token');

    let {
        name,
        image,
        breed,
        attributes,
        birthday,
        species
    } = petData;

    dispatch({
        type: ADD_PET_START
    });

    try {
        var formData = new FormData();
        if (image !== null) {
            formData.append('file', {
                uri: image,
                type: 'image/jpeg',
                name: `${name}.jpg`
            });
        }
        formData.append('name', name);
        formData.append('breed', breed);
        formData.append('species', species);
        formData.append('birthday', birthday);
        formData.append('insured', attributes.insured);
        formData.append('fixed', attributes.fixed);
        formData.append('fullyVaccinated', attributes.fullyVaccinated);

        let response = await fetch(`${baseurl}/pets`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            body: formData
        });
        let responseJson = await response.json();

        if (response.status == 200) {
            dispatch(addPetSuccess(responseJson));
        } else {
            dispatch(addPetFailed(responseJson.errors));
        }

    } catch (e) {
        console.log('failed to make request' + e);
        let errors = 'Request Failed';
        dispatch(addPetFailed({
            'errors': errors
        }));
    }
};

export const addPetSuccess = (pet) => {
    console.log('success => 78 =>', pet);
    return {
        type: ADD_PET_SUCCESS,
        pet
    };
};

export const addPetFailed = (errors) => {
    console.log('error => 86 =>', errors);
    return {
        type: ADD_PET_FAILED,
        errors
    };
};

export const fetchAllPets = () => async dispatch => {
    // let token = await AsyncStorage.getItem('token');
    dispatch({
        type: FETCH_PETS_START
    });

    try {
        let response = await fetch(`${baseurl}/pets`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        let responseJson = await response.json();
        if (response.status == 200) {
            dispatch(fetchPetsSuccess(responseJson));
        } else {
            // console.log(responseJson.errors);
            dispatch(fetchPetsFailed(responseJson.errors));
        }
    } catch (e) {
        console.log('failed to make request');
        let errors = 'Request Failed';
        dispatch(fetchPetsFailed({
            'errors': errors
        }));
    }
};

export const fetchPetsSuccess = (pets) => {
    return {
        type: FETCH_PETS_SUCCESS,
        pets
    };
};

export const fetchPetsFailed = (error) => {
    return {
        type: FETCH_PETS_FAILED,
        error
    };
};