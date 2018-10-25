import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GeneralStyles from '../Styles/General';
import SearchListingCategoryItem from '../components/SearchListingCategoryItem'

class SearchListingCategories extends React.Component {
    render() {
        return (
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{overflow: 'visible', paddingLeft: 20, paddingBottom: 20, paddingRight: 60,}}>
                    <SearchListingCategoryItem Name='Pet Trainers' />
                    <SearchListingCategoryItem Name='Pet Sitters' />
                    <SearchListingCategoryItem Name='Pet Groomers' />
                    <SearchListingCategoryItem Name='Pet Boarding' />
                    <SearchListingCategoryItem Name='Pet Daycare' />
                    <SearchListingCategoryItem Name='Pet Friendly Restaurants' />
                    <SearchListingCategoryItem Name='Animal Rescue Services' />
                    <SearchListingCategoryItem Name='Pet Fosters' />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    CategoryButton: {
        backgroundColor: '#EF5595',
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 4,
    }
});

export default SearchListingCategories;