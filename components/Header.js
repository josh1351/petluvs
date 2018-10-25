import React from 'react';
import {
    StyleSheet,
    Text, Keyboard,
    View,
    Image, TouchableOpacity,
    Platform
} from 'react-native';



export default Header = (props) => {

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.iconLeftStyle}
                              onPress={() => {
                                  Keyboard.dismiss();
                                  props.navigation.goBack(null)
                              }}>
                <Image
                    source={require('../assets/backIcon.png')}/>
            </TouchableOpacity>
            <Text style={{height: 40, fontSize: 18, color: '#e55595', alignItems: 'center'}}>
               {props.title}
            </Text>
            <TouchableOpacity style={[styles.iconRightStyle, {bottom: 5}]} onPress={props.options}>
                <Image source={require('../assets/notificationIcon.png')}/>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 60,elevation:5
    },
    title: {
        height: 40,
        fontSize: 20,
        color: '#e55595'
    },
    iconRightStyle: {
        position: 'absolute', right: 10, bottom: Platform.OS === 'ios' ? 2 : 0,//-3:0
        width: 50, height: 40, alignItems: 'center', justifyContent: 'center'
    },
    iconLeftStyle: {
        position: 'absolute', left: 0, bottom: 5, zIndex: 2,
        width: 50, height: 40, alignItems: 'center', justifyContent: 'center'
    },

});