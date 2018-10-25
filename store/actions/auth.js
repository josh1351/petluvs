import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { LOGIN_FAILED, LOGIN_SUCCESS } from './actionTypes';
// import { AUTH_FAILED, AUTH_SUCCESS, AUTH_START, AUTH_LOGOUT } from './actionTypes';

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('token');

    if(token) {
        //Login is done

        dispatch({ type: LOGIN_SUCCESS, token: token })
    }else {
        doFacebookLogin(dispatch);
    }
};


const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('223988558251666', {
        permissions: ['public_profile', 'email']

    });

    if (type === 'cancel') {
        return dispatch({ type: LOGIN_FAILED });
    }

    return axios.post('https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)', { access_token: token })
        .then(async response => {
            console.log(response.data.picture.data.url);
            await  AsyncStorage.setItem('name', response.data.name);
            await   AsyncStorage.setItem('picture', response.data.picture.data.url);
            await AsyncStorage.setItem('token', token);



            dispatch({ type: LOGIN_SUCCESS, token: token })
        })
        .catch(error => {
            dispatch({ type: LOGIN_FAILED })
        })
}
//Signup
    export const signup = (data) => async dispatch => {
    fetch('http://34.237.144.110:8000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((responseJson) => {

                if(responseJson.token)
                {
                    AsyncStorage.setItem('token', responseJson.token);
                    dispatch({ type: LOGIN_SUCCESS, token: responseJson })
                } else {
                    dispatch({ type: LOGIN_FAILED, errors: 'Error while login'})
                }
            })
            .catch((e) => {

                dispatch({ type: LOGIN_FAILED, errors:'Error while login' });
            });
    }
//Signin
export const signin = (data) => async dispatch => {
    fetch('http://34.237.144.110:8000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
        body:
            JSON.stringify(data)

            }).then((response) => response.json())
                .then((responseJson) => {

                    if(responseJson.user.token)
                    {
                        console.log(responseJson.user.token);
                        AsyncStorage.setItem('token', responseJson.user.token);
                        dispatch({ type: LOGIN_SUCCESS, token: responseJson.user.token })
                    } else {
                        dispatch({ type: LOGIN_FAILED, errors: "error while login"});
                    }
                })
        .catch((e) => {

            dispatch({ type: LOGIN_FAILED, errors:"error while login"});
        });
    }

    //Logout
        export const logout = () => async dispatch => {
       try {
                await AsyncStorage.removeItem('token');
                dispatch({ type: AUTH_LOGOUT })
            }catch(e) {
                console.log('Error removing token', e)
            }
    }
//Loding state while authentication
export const authStart = () => {
     return {
                type: AUTH_START
        };
    };

    //Success Authentication
        export const authSuccess = (token) => {
     return {
                type: LOGIN_SUCCESS,
                token: token
        }
    }

    //Fail Authenticate
        export const authFail = (error) => {
       return {
                type: AUTH_FAILED,
                error: error
        };
    };
