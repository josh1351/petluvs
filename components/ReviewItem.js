import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import GeneralStyles from '../Styles/General';
import ProfilePhoto from '../components/ProfilePhoto'
import Icon from 'react-native-vector-icons/MaterialIcons';


class ReviewItem extends React.Component {
    render() {
        return (
            <View style={[GeneralStyles.Card, {marginBottom:24, padding:15,}]} >
                <View style={{ flexDirection: 'row'}}>
                    <ProfilePhoto />
                    <View style={{paddingLeft:15}}>
                        <Text style={GeneralStyles.h1}>{this.props.Name}</Text>
                        <Text style={{opacity:.5,}}>Reviewed {this.props.BusinessName}</Text>
                    </View>
                </View>
                <View>
                    <View style={{flexDirection: 'row', marginTop:14}}>
                        <Icon name='star' size={15} color='#56C1EF' />
                        <Icon name='star' size={15} color='#56C1EF' />
                        <Icon name='star' size={15} color='#56C1EF' />
                        <Icon name='star-border' size={15} color='#56C1EF' />
                        <Icon name='star-border' size={15} color='#56C1EF' />
                    </View>
                    <Text style={styles.ReviewText}>{this.props.ReviewText}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ReviewText: {
        color: '#8F858C',
    }
});

export default ReviewItem;