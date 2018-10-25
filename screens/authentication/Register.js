import React from 'react';
import {connect} from 'react-redux';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
     ActivityIndicator,
    TextInput, Dimensions
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {signup} from '../../store/actions/index';


class Register extends React.Component {
    static navigationOptions = {
        header: null,  gesturesEnabled: false,
    };

    constructor(props) {
        super(props)
        this.state = {
            email: '', password: '', cPassword: '',
            loader: false, msg: '', errors: ''
        };
    }


    canBeSubmitted() {
        return (
            (
                (this.state.email.trim() === '') ||
                (this.state.password.trim() === '')
                // || (this.state.cPassword.trim === '')
            )
        )
    }


    //need to pass the data
    signupHandler = () => {
        let data = {
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.cPassword
        };
        if (this.isValid() == true) {
            this.props.signup(data);
        }
        else {
        }

    };

    isValid() {
        const {email, password, cPassword} = this.state;
        let valid = false;
        let reg = /\S+@\S+\.\S+/g;
        // let name_reg = /^[a-zA-Z].*/g;

        if (email.length > 0 && password.length > 0 && cPassword.length > 0) {

            if (reg.test(email) === false) {
                alert('Please enter a valid email address.')
            } else if (password.length < 6) {
                alert('Password must contain 6 characters.');
            } else if (password !== cPassword) {
                alert('Password and confirm Password must be same');
            }

            else {
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

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.errors == null)
    //     {
    //
    //     }
    //    else{
    //         alert(this.props.errors);
    //     }
    // }

    render() {
        const isEnabled = this.canBeSubmitted();
        return (
            <View style={styles.wrap}>
                <View style={styles.bgWrap}>
                    <Image source={require('../../assets/login.png')} style={styles.bgPhoto}/>
                </View>
                <KeyboardAwareScrollView ref='scroll' extraScrollHeight={10} keyboardOpeningTime={0} extraHeight={80}
                                         keyboardShouldPersistTaps="handled" enableOnAndroid={true}
                                         enableResetScrollToCoords={true}>

                    <View style={styles.container}>

                        <Image source={require('../../assets/loginLogo.png')} style={styles.loginLogo}/>

                        <View style={{marginTop: 10, marginHorizontal: 5}}>
                            {/*{this.props.errors?*/}
                            {/*<View>*/}
                            {/*<Text>*/}
                            {/*{this.props.errors}*/}
                            {/*</Text>*/}
                            {/*</View>: ''}*/}

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
                            <View style={{flexDirection: 'row', marginTop: 10, width: '100%'}}>
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
                            <View style={{flexDirection: 'row', marginTop: 10, width: '100%'}}>
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
                                    placeholder='Confirm Password'
                                    placeholderTextColor='gray'
                                    autoCorrect={false} autoCapitalize="none"
                                    selectionColor='gray'
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(cPassword) => this.setState({cPassword: cPassword})}/>
                            </View>


                            <TouchableOpacity
                                onPress={() => this.signupHandler()}
                                disabled={isEnabled}>
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
                                    <Text style={{color: '#FFFFFF', fontSize: 22}}>Register</Text>
                                </View>
                            </TouchableOpacity>


                            <Text onPress={() => this.props.navigation.navigate('SignIn')}
                                  style={{
                                      color: '#000',
                                      fontWeight: 'bold',
                                      fontSize: 18,
                                      marginTop: 20,
                                      alignSelf: 'center'
                                  }}>
                                Existing User? Sign In
                            </Text>

                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    wrap: {flex: 1, height: '100%', width: '100%'},
    bgWrap: {position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%', height: '100%',},
    bgPhoto: {alignSelf: 'center', flex: 1, resizeMode: 'cover', bottom: 0,},
    container: {flex: 1, padding: 20, alignItems: 'center', justifyContent: 'flex-end',},
    loginLogo: {resizeMode: 'contain', position: 'absolute', top: '10%',},
    textInput: {borderWidth: 1, height: 55, borderRadius: 4, marginTop: 5, fontSize: 18, paddingLeft: 7},
    marginBottom: {width: '100%', margin: 15},
    textInputmargin: {width: '100%', margin: 15, marginTop: 350},
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
export default connect(mapStateToProps, {signup})(Register);
