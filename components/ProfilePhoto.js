import React from 'react';
import { Image, View, StyleSheet } from 'react-native';


class ProfilePhoto extends React.Component {
    render() {
        return (
            <View style={styles.Circle}>
               <Image width='40' source={require('../assets/profile.png')}  /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Circle: {
      height: 40,
      width: 40,
      borderRadius:20,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ProfilePhoto: {
        resizeMode: 'contain'
    }
  });

export default ProfilePhoto;