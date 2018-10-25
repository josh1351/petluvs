import React from 'react';
import { Text, View, StyleSheet, ScrollView,FlatList,TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import GeneralStyles from '../Styles/General';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchListingCategories from '../components/SearchListingCategories';
import SearchListingItem from '../components/SearchListingItem';
import { withNavigation } from 'react-navigation';

class SearchListing extends React.Component {
    render() {
        return (
            <View>
                <SearchListingCategories style={{marginRight: 40}}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.props.data}
                        renderItem={({item, index}) => (
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate("SearchDetails")}>
                            <SearchListingItem Name={item.name} Type={item.Type} Distance={item.Distance} ClosingTime={item.ClosingTime} Rating={item.Rating}/>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default withNavigation(SearchListing);