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



export default class OnBoarding2 extends Component {
    static navigationOptions = {
        header: null,  gesturesEnabled: false,
    };

    _onDone = () => {
        const {navigate} = this.props.navigation;
        navigate('OnBoarding3')
    };
    _onSkip = () => {
        const {navigate} = this.props.navigation;
        navigate('OnBoarding3')
    };


    render() {
        return (
            <View style={styles.wrap}>
                <Image style={{flex: 1,width:'100%'}}
                       source={require('../../assets/slider3.png')}/>

                <ScrollView style={{flex: 1}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#e55595', margin: 10
                    }}>
                        Are you an animal {"\n"} breeder?
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        color: 'grey', margin: 10
                    }}>
                        Registering yourself as an Animal breeder is real simple. Use your AKC registration number to
                        build your credibility or if you don’t have one no sweat. Others users can still search you or
                        you can create breeding events to find other breeders, create play date events to meet your
                        litter. Check it out!
                    </Text>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")} >
                        <View style={styles.ButtonView}>

                            <Text style={{color: '#FFFFFF', fontSize: 12, textAlign: 'center',marginLeft:5,alignSelf: 'center',paddingRight: 5,paddingTop: 4}}>Yes,setup my breeder
                                profile!</Text>
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
                           source={require('../../assets/photoSlider.png')}/>


                    <TouchableOpacity onPress={() => this._onDone()} style={[styles.iconRightStyle, {bottom: 5}]}>
                        <Text style={styles.title}>
                            Nope
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