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



export default class OnBoarding1 extends Component {
    static navigationOptions = {
        header: null,  gesturesEnabled: false,
    };

    _onDone = () => {
        const {navigate} = this.props.navigation;
        navigate('OnBoarding2')
    };
    _onSkip = () => {
        const {navigate} = this.props.navigation;
        navigate('OnBoarding2')
    };


    render() {
        return (
            <View style={styles.wrap}>
                <Image style={{flex: 1,width:'100%'}}
                       source={require('../../assets/slider2.png')}/>

                <ScrollView style={{flex: 1}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#e55595', margin: 15
                    }}>
                        Your favourite companion {"\n"} is ready to socialize!
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        color: 'grey', margin: 15
                    }}>
                        Welcome to our pet community where you can create pet play dates at local dog parks, patio restaurants or any other cool location of your choosing. Find pet service providers in your locality such as pet groomers, pet boarding or become pet services to other pet owners by registering as a dog walker or pet groomer. Looking to buy a new pet? We got you covered, Find certified pet breeders on here too. Try it out!!
                    </Text>
                </ScrollView>

                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={() => this._onSkip()}
                        style={styles.iconLeftStyle}>
                        <Text style={styles.title}>
                            Skip
                        </Text>
                    </TouchableOpacity>

                    <Image style={{alignItems:'center'}}
                           source={require('../../assets/photoSlider1.png')}/>


                    <TouchableOpacity onPress={() => this._onDone()}
                        style={[styles.iconRightStyle, {bottom: 5}]}>
                       <Text style={styles.title}>
                          Got It!
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
        borderRadius: 5, marginLeft: 150,
        marginRight: 20,
        alignItems:'center',justifyContent:'center'

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
                    fontSize:16,color:'white',marginLeft:10
            },
                iconRightStyle: {
                position: 'absolute', right: 10, bottom: Platform.OS === 'ios' ? 2 : 0,//-3:0
                width: '30%', height: 40, alignItems: 'center', justifyContent: 'center'
            },
                iconLeftStyle: {
                position: 'absolute', left: 0, bottom: 5, zIndex: 2,
                width: '30%', height: 40, alignItems: 'center', justifyContent: 'center'
            },
});