import React, {Component} from 'react';

import {
    View, Text, Image, TouchableOpacity, StyleSheet, Keyboard, ActivityIndicator,
    TextInput, ImageBackground, AsyncStorage, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {signin, signup} from "../../store/actions/index";
import {connect} from "react-redux";
import {NavigationActions,StackActions} from 'react-navigation';



 class SignIn extends Component {

    static navigationOptions = {
        header: null,
            gesturesEnabled: false,

    };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            access_token: '',
            loader: false,
            errors: '',
            error: ''
        }
    }

    //need to pass the data
    signInHandler = () => {
        let data={
            email:this.state.email,
            password:this.state.password
        };
        if(this.isValid()==true){
            this.props.signin(data);
        }
        else{
        }
    };

     isValid() {
         const {  email, password } = this.state;
         let valid = false;
         let reg = /\S+@\S+\.\S+/g ;
         // let name_reg = /^[a-zA-Z].*/g;

         if ( email.length > 0 && password.length > 0) {

              if(reg.test(email) === false) {
                 alert('Please enter a valid email address.')
             } else if(password.length < 6 ) {
                 alert('Password must contain 6 characters.');
             } else {
                 valid = true;
             }
         }

          if (email.length === 0) {
             alert('Please enter an email address.');
         } else if (password.length === 0) {
             alert('Please enter a password.');
         }

         return valid;
     }


     componentWillRecieveProps(nextProps) {
         console.log(nextProps);
         this.setState({error:''})
     }


     componentDidUpdate(prevProps, prevState) {

         if(prevProps.errors !== this.props.errors) {
             console.log('errors');
             if(this.props.errors != null) {
                 alert(this.props.errors)
             }
             // this.setState({errors: this.props.errors});
         }

     }

    render() {
        const isEnabled = (this.state.email.length < 1 || this.state.password.length < 1);
        // console.log(this.props.errors);
        return (
            <View style={styles.wrap}>
                <View style={styles.bgWrap}>
                    <Image source={require('../../assets/login.png')} style={styles.bgPhoto}/>
                </View>
                <KeyboardAwareScrollView ref='scroll' extraScrollHeight={10} keyboardOpeningTime={0} extraHeight={50}
                                         keyboardShouldPersistTaps="handled" enableOnAndroid={true} enableResetScrollToCoords={true}
                                         >
                    <View style={styles.container}>

                        <Image source={require('../../assets/loginLogo.png')} style={styles.loginLogo}/>



                            <View style={{marginTop: 10, marginHorizontal: 5}}>

                                <View style={{flexDirection: 'row', marginTop: 350}}>
                                    <View style={{
                                        width: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#FFFFFF'
                                    }}>
                                        <Image source={require('../../assets/user.png')}/>
                                    </View>
                                    <TextInput
                                        fontSize={14}
                                        style={styles.TextInput}
                                        placeholder='Email'
                                        placeholderTextColor='gray'
                                        autoCorrect={false} autoCapitalize="none"
                                        selectionColor='gray'
                                        keyboardType='email-address'
                                        underlineColorAndroid='transparent'
                                        onChangeText={(email) => this.setState({email: email})}/>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: 10,width:'100%'}}>
                                    <View style={{
                                        width: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#FFFFFF'
                                    }}>
                                        <Image source={require('../../assets/lock.png')}/>
                                    </View>
                                    <TextInput
                                        fontSize={14}
                                        style={styles.TextInput}
                                        placeholder='Password'
                                        placeholderTextColor='gray'
                                        autoCorrect={false} autoCapitalize="none"
                                        selectionColor='gray'
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(password) => this.setState({password: password})}/>
                                </View>


                                <TouchableOpacity onPress={() => {this.signInHandler()}} disabled={isEnabled}>
                                    <View style={[styles.ButtonView, {opacity: isEnabled ? 0.5 : 1.0}]}>
                                        {this.state.loader ? <ActivityIndicator
                                            style={{
                                                zIndex: 2,
                                                position: 'absolute',
                                                bottom: 0,
                                                top: 0,
                                                alignSelf: 'center'
                                            }}
                                            color='#FFFFFF' size='large'/> : null
                                        }
                                        <Text style={{color: '#FFFFFF', fontSize: 22}}>Login</Text>
                                    </View>
                                </TouchableOpacity>

                                <Text

                                      style={{color: '#000', textDecorationLine: 'underline', fontSize: 18, marginTop: 8, alignSelf: 'center'}}>
                                    Forgot password?
                                </Text>



                                <Text onPress={() => this.props.navigation.navigate('Register')}
                                      style={{color: '#000', fontWeight: 'bold', fontSize: 18, marginTop: 20, alignSelf: 'center'}}>
                                    New User? Register Here
                                </Text>

                            </View>
                        </View>


                </KeyboardAwareScrollView>

            </View>
        )
    }
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    bgWrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    bgPhoto: {

        alignSelf: 'center',
        flex: 1,
        resizeMode: 'cover',
        bottom: 0,
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    loginLogo: {
        resizeMode: 'contain',
        position: 'absolute',
        top: '10%',
    },


    ButtonView: {
        backgroundColor: '#e55595',
        height: height * 0.07,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    TextInput: {
        flex: 1, height: height * 0.07, backgroundColor: '#FFFFFF', color: 'gray'
    },
});
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        errors: state.auth.errors || null
    }
}

export default connect(mapStateToProps, {signin})(SignIn);
