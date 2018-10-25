import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Image,ScrollView,
    Text,
    TouchableOpacity,
    Keyboard,
    Platform
} from 'react-native';


var {height, width} = Dimensions.get('window');



export default class OnBoarding3 extends Component {
    static navigationOptions = {
        header: null,  gesturesEnabled: false,
    };

    _onDone = () => {
        const {navigate} = this.props.navigation;
        navigate('App')
    };
    _onSkip = () => {
        const {navigate} = this.props.navigation;
        navigate('App')
    };


    render() {
        return (
            <View style={styles.wrap}>
                <Image style={{flex: 1,width:'100%'}}
                       source={require('../../assets/slider1.png')}/>

                <ScrollView style={{flex: 1}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#e55595', margin: 15
                    }}>
                        Add all your little friends {"\n"} to your profile!
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        color: 'grey', margin: 15
                    }}>
                        Tell us about your pets, information about vaccinations, type, breed  gives pet friends trust to connect.
                        Don’t worry, your data is confidential  unless you add other pets as friends.
                        Then they will see each other information. Add all your pets. Have fun
                    </Text>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddPet")}>
                        <View style={styles.ButtonView}>

                            <Text style={{color: '#FFFFFF', fontSize: 12, textAlign: 'center',marginLeft:5,alignSelf: 'center',paddingRight: 5,paddingTop: 4}}>Lets,setup my first pet!</Text>
                        </View>
                    </TouchableOpacity>




                </ScrollView>

                <View style={styles.bottomView}>
                    <TouchableOpacity  onPress={() => this._onSkip()} style={styles.iconLeftStyle}>
                        <Text style={styles.title}>
                            Skip
                        </Text>
                    </TouchableOpacity>

                    <Image style={{alignItems:'center'}}
                           source={require('../../assets/photoSlider2.png')}/>


                    <TouchableOpacity  onPress={() => this._onDone()} style={[styles.iconRightStyle, {bottom: 5}]}>
                        <Text numberOfLines={1} style={styles.title}>
                           I'll do this later
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    wrap: {
        flex: 1,

    },
    ButtonView: {
        backgroundColor: '#e55595',
        height: 25,
        borderRadius: 5,
        marginRight: 20,
        alignSelf: 'flex-end',bottom:5

    },

    bottomView:{

        width: '100%',
        height: 50,
        backgroundColor: '#e55595',
        justifyContent: 'center',
        flexDirection:'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 60,elevation:5, position: 'absolute',
        bottom: 0
    },
    title: {
        fontSize:16,color:'white',marginLeft:10,
    },
    iconRightStyle: {
        position: 'absolute', right: 10, bottom: Platform.OS === 'ios' ? 2 : 0,//-3:0
        width: '40%', height: 40, alignItems: 'center', justifyContent: 'center',
    },
    iconLeftStyle: {
        position: 'absolute', left: 0, bottom: 5, zIndex: 2,
        width: '30%', height: 40, alignItems: 'center', justifyContent: 'center'
    },
});