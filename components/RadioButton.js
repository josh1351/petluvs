import React, {Component} from 'react';

import {
    View, Text, Image, TouchableOpacity, StyleSheet, Keyboard, ActivityIndicator,
    TextInput, ImageBackground, AsyncStorage, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView
} from 'react-native';

class RadioButton extends Component{
    constructor(props){
        super(props);
        this.state={
            buttonChecked:true,
        }
    }
    isChecked=()=>{
        // if(this.state.buttonChecked) {
            return (

                <View style={styles.RadioButton}>

                </View>
            );
        }

    render(){
        return(

        <View style={[{
            height: 20,
            width: 20,
            borderRadius: 12,
            borderWidth: 2,
            // borderColor: 'grey',
            borderColor: this.props.isChecked?'#e55595':'grey',
            alignItems: 'center',
            justifyContent: 'center',
        }, this.props.style]}>
            {
                this.props.isChecked ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#e55595',
                    }}/>
                    : null
            }
        </View>
        );
    }
}
const styles=StyleSheet.create({
    RadioButtonContainer:{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor:'#e55595',
    },
    // RadioButton:{
    //     height: 10,
    //     width: 10,
    //     // borderRadius: 5,
    //     borderColor:'#e55595',
    // }
});
export default RadioButton;