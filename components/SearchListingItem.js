import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GeneralStyles from '../Styles/General';
import Icon from 'react-native-vector-icons/MaterialIcons';

class SearchListingItem extends React.Component {
    render() {
        return (
            <View style={styles.SearchListingItemContainer}>
                <View>
                    <Text style={GeneralStyles.h1}>{this.props.Name}</Text>
                    <Text style={{opacity:.5,}}>{this.props.Type}  {this.props.Distance} mi  {this.props.ClosingTime}pm</Text>
                </View>
                <View>
                    <Text style={styles.Rating}>{this.props.Rating}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name='star' size={15} color='#56C1EF' />
                        <Icon name='star' size={15} color='#56C1EF' />
                        <Icon name='star' size={15} color='#56C1EF' />
                        <Icon name='star-border' size={15} color='#56C1EF' />
                        <Icon name='star-border' size={15} color='#56C1EF' />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    SearchListingItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        marginBottom: 2,
        shadowColor: '#451B2D',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 7,
    },
    Rating: {
        color: '#56C1EF',
        fontSize: 16,
        textAlign: 'right',
    }
});

export default SearchListingItem;