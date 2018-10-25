import React from 'react';
import { Text, View, StyleSheet, ImageBackground} from 'react-native';
import GeneralStyles from '../Styles/General';


class FeaturedServicesItem extends React.Component {
    render() {
        return (
            <View style={styles.FeaturedServicesItem}>
                <ImageBackground resizeMode='cover' style={{width:'100%', height:'100%', justifyContent: 'flex-end',}} source={require('../assets/FeaturedServicesPhoto1.png')}>
                    <View style={styles.PinkOverlay} />
                    <Text style={styles.FeaturedServicesTitle}>{this.props.BusinessName}</Text>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    FeaturedServicesItem: {
        width:180,
        height:100,
        borderRadius: 10,
        backgroundColor: '#EF5595',
        marginRight:15,
        overflow: 'hidden',
    },
    PinkOverlay: {
        position:'absolute',
        top: 0,
        bottom: 0,
        right:0,
        left: 0,
        width:'100%',
        height: '100%',
        backgroundColor: '#EF5595',
        opacity:.7,
    },
    FeaturedServicesTitle: {
        color: 'white',
        fontSize: 20,
        margin: 10,
    },
});

export default FeaturedServicesItem;