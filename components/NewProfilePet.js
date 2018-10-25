import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

export default NewProfilePet = (props) => {

    return (

        <TouchableOpacity onPress={() => props.navigation.navigate('AddPet')}
            style={styles.Container}>
            <Image style={{width: 75, height: 75, marginBottom:10,}} source={require('../assets/newPet.png')} />
            <Text style={{color: '#EF5595', fontSize: 18, textAlign:'center'}}>Add Pet</Text>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    Container: {
        borderColor: '#EF5595',
        borderRadius: 6,
        borderStyle: 'dashed',
        borderWidth: 2,
        height: (width/2.3),
        width: (width/2.3),
        justifyContent: 'center',
        alignItems: 'center',
    }
});
  
