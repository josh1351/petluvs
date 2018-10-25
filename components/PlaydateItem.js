import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity,Share } from 'react-native';
import GeneralStyles from '../Styles/General';
import ProfilePhoto from '../components/ProfilePhoto';
import AbbreviatedAttendees from '../components/AbbreviatedAttendees';
import LocationPhoto1 from '../assets/LocationPhoto1.png'
import {Image} from "react-native-expo-image-cache";
import {CacheManager} from "react-native-expo-image-cache";
import { withNavigation } from 'react-navigation';


class PlaydateItem extends React.Component {
    _onClick() {
        if (this.props.navigator && this.props.navigator.pop) { 
            this.props.navigator.pop();
        }
        else {
            console.warn('Warning: _onBack requires navigator property to function. Either modify the onBack prop or pass a navigator prop');
        }
    }

    render() {
        return (
            <View style={[GeneralStyles.Card, {marginBottom:24,}]} >
                <View style={styles.Header}>
                    <ProfilePhoto />
                    <View style={{paddingLeft:15}}>
                        <Text style={GeneralStyles.h1}>{this.props.Name}</Text>
                        <Text style={{opacity:.5,}}>Started a playdate</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                        <View style={styles.TimeBubble}>
                            <Text style={styles.TimeText}>{this.props.TimeLeft} Min left</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.PhotoSection}>
                <TouchableOpacity style={{width:'100%',height:"100%"}} onLongPress={() => {
                                          Share.share({
                                            title:"Shared via Petluvs",
                                            message: "Shared via Petluvs",
                                            url:'../assets/LocationPhoto1.png',
                                       });}}>
                    <ImageBackground resizeMode='cover' style={styles.LocationPhoto} source={require('../assets/LocationPhoto1.png')}>
                        <Text style={styles.LocationText}>{this.props.Location}</Text>
                        <Text style={styles.MilesAwayText}>{this.props.MilesAway} Miles Away</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={styles.ActionSection}>
                    <AbbreviatedAttendees />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PlaydateDetails')}
                        style={{backgroundColor: '#EF5595', paddingVertical:8, paddingHorizontal:25, borderRadius: 4, justifyContent:'center', alignItems:'center'}}>
                        <Text  style={{color: 'white', fontSize: 16}}>Join</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Header: {
        padding: 15,
        flexDirection: 'row',
    },
    TimeBubble: {
        backgroundColor: 'rgba(335, 64, 94, .2)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    TimeText: {
        color: '#EF5595',
        fontSize: 14,
    },
    PhotoSection: {
        alignSelf: 'stretch',
        height: 200,
        alignItems:'stretch',
    },
    LocationPhoto: {
       flex: 1,
       width: null,
       height: null,
       justifyContent: 'flex-end',
       padding:20,
    },
    LocationText: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    MilesAwayText: {
        opacity: 0.75,
        fontSize: 18,
        color: '#FFFFFF',
    },
    ActionSection: {
        padding:15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default withNavigation(PlaydateItem);