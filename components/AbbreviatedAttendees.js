import React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import GeneralStyles from '../Styles/General';


class AbbreviatedAttendees extends React.Component {
    render() {
        return (
            <View style={{flexDirection: 'row', marginLeft: 10}}>
                <View style={styles.ProfileCircle}>
                    <Image width='30' source={require('../assets/profile.png')}  /> 
                </View>
                <View style={styles.ProfileCircle}>
                    <Image width='30' source={require('../assets/profile.png')}  /> 
                </View>
                <View style={styles.ProfileCircle}>
                    <Image width='30' source={require('../assets/profile.png')}  /> 
                </View>
                <View style={styles.TruncateCircle}>
                    <Text style={{color:'white'}}>+3</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ProfileCircle: {
      height: 30,
      width: 30,
      borderRadius:20,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -10,
      borderColor: 'white',
      borderWidth: 3,
    },
    TruncateCircle: {
        height: 30,
        width: 30,
        borderRadius:20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: '#EF5595',
      },
    ProfilePhoto: {
        resizeMode: 'contain'
    }
  });

export default AbbreviatedAttendees;