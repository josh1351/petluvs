import React from 'react';
import {
    createStackNavigator
} from 'react-navigation';
import LoginScreen from '../../screens/authentication/LoginScreen';
import Register from '../../screens/authentication/Register';
import SignIn from '../../screens/authentication/SignIn';
import OnBoarding1 from "../../screens/onBoarding/OnBoarding1";
import OnBoarding2 from "../../screens/onBoarding/OnBoarding2";
import OnBoarding3 from "../../screens/onBoarding/OnBoarding3";




export default AuthNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen

    },
    Register: {
        screen: Register
    },
    SignIn: {
        screen: SignIn
    },

    OnBoarding1: {
        screen: OnBoarding1
    },
    OnBoarding2: {
        screen: OnBoarding2
    },
    OnBoarding3: {
        screen: OnBoarding3
    },
});