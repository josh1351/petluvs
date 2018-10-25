import React from 'react';
import { connect } from 'react-redux';
import {Image, StyleSheet, Text, TouchableOpacity, View, Button, TouchableHighlight, Alert,AsyncStorage} from 'react-native';
import { WebBrowser } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import InstagramLogin from 'react-native-instagram-login' ;




const FB_APP_ID = '223988558251666';

import { facebookLogin } from '../../store/actions/index';


class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,  gesturesEnabled: false,
    };

    constructor(props) {
        super(props)
        this.state = {

            userInfo : null,
            name : '',
            picture : '',

        }
    }

    facebookLoginHandler = (props) => {
        this.props.facebookLogin();
        this.onAuthComplete(props);
        };
    instagramLoginHandler = () => {


        this.props.navigation.navigate('OnBoarding1');
    };

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        try {
            if (props.token) {
                this.props.navigation.navigate('OnBoarding1');
            }
        }
        catch (e) {
            console.log(e);

        }

    }



    render() {
        return (
            <View style={styles.wrap}>
                <View style={styles.bgWrap}>
                    <Image source={require('../../assets/login.png')} style={styles.bgPhoto} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.loginWithText}>login with</Text>
                    <Image source={ require('../../assets/loginLogo.png')} style={styles.loginLogo} />


                    <TouchableHighlight style={styles.loginButton} onPress={()=> this.facebookLoginHandler()}>
                        <View>
                            <Icon style={styles.loginButtonIcon} name="facebook-f" size={24} color="#4867AA" />
                            <Text style={[styles.loginButtonText, styles.facebookText]}>Facebook</Text>
                        </View>
                    </TouchableHighlight>


                    <TouchableHighlight style={styles.loginButton} onPress={()=> this.refs.instagramLogin.show()}>
                        <View>
                            <Icon style={styles.loginButtonIcon} name="instagram" size={24} color="#fb3958" />
                            <Text style={[styles.loginButtonText, styles.twitterText]}>Instagram</Text>
                        </View>
                    </TouchableHighlight>
                    <InstagramLogin
                        ref='instagramLogin'
                        redirectUrl='http://www.anyalpha.com'
                        clientId='dbc0926e30814b629a9e954d17278c21'
                        scopes={['public_content+follower_list']}
                        onLoginSuccess={(token) => this.instagramLoginHandler(token)}
                        onLoginFailure={(data) => console.log(data)}
                    />



                    <Text style={[styles.loginButtonText, styles.socialText]}>
                        <Text onPress={() =>
                            this.props.navigation.navigate('SignIn')}
                        >Sign in </Text>
                        | <Text onPress={() =>  this.props.navigation.navigate('Register')}>Create Account</Text>.
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex:1,
        height:'100%',
        width:'100%',
    },
    bgWrap: {
        position:'absolute',
        top: 0,
        left: 0,
        bottom:0,
        width:'100%',
        height:'100%',
    },
    bgPhoto: {

        alignSelf: 'center',
        flex: 1,
        resizeMode: 'cover',
        bottom:0,
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems:'center',
        justifyContent: 'flex-end',
    },
    loginLogo: {

        resizeMode:'contain',
        position: 'absolute',
        top: '10%',
    },
    loginButton: {
        display:'flex',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        alignItems:'stretch',
        justifyContent:'center',
        marginBottom:16,
    },
    loginButtonText: {
        fontSize: 18,
        textAlign:'center',
    },
    loginWithText:{
        fontSize: 14,
        textAlign:'center',
        color:"#8f858c",
        marginBottom:10
    },
    otherSocialNetText: {
        fontSize: 16,
        textAlign:'center',
    },
    socialText: {
        color:"#e55595",
    },
    twitterText: {
        color: "#1DA1F2",
    },
    facebookText: {
        color:"#4867AA",
    },
    loginButtonIcon: {
        position: 'absolute',
        left:20,
        bottom:0,
    }
});

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps, { facebookLogin })(LoginScreen);
