import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import MapView from 'react-native-maps';



export default HotSpotsMap = (props) => {

    return (
        <View style={{flex: 1}}>
            <MapView
                style={{flex: 1}}
                showsUserLocation={true}
                region={{
                    latitude: props.latitude,
                    longitude:props.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {props.items.map((marker, index) => {
                    const coords = {
                        latitude: marker.location.lat,
                        longitude: marker.location.lng,
                    };



                    return (
                        <MapView.Marker
                            coordinate={coords}
                            image={props.markerIcon}
                            title={marker.name}
                            onPress={() =>props.navigation.navigate("SearchDetails",{ businessName: marker.name ,
                                rating:marker.rating,servicesOffered:marker.types,description:marker.description,
                                address:marker.location.address+marker.location.city})}
                        />
                    );
                })}
            </MapView>




        </View>
    );

}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    marker: {width: 20, height: 20, borderRadius: 10, backgroundColor: 'white', borderWidth: 5, borderColor: '#4191AA'}
});
