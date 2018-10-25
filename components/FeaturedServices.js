import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import GeneralStyles from '../Styles/General';
import FeaturedServicesItem from '../components/FeaturedServicesItem'


class FeaturedServices extends React.Component {
    render() {
        return (
            <View style={{marginBottom: 40, marginTop:10,}}>
                <Text style={[GeneralStyles.h2, {marginBottom: 10,}]}>
                    Featured Services
                </Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{overflow:'visible'}}>
                    <FeaturedServicesItem BusinessName='Custom Pet Collars' />
                    <FeaturedServicesItem BusinessName='Pet Friendly Shopping' />
                    <FeaturedServicesItem BusinessName='Another Pet Service' />
                    <FeaturedServicesItem BusinessName='Yet Another Pet Service' />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default FeaturedServices;