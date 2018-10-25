import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import GeneralStyles from '../Styles/General';

class SearchListingCategoryItem extends React.Component {

    componentWillMount() {
        this.categoryButtonAnimateOpacity = new Animated.Value(.2);
        this.categoryButtonAnimateScale = new Animated.Value(1);
    }

    onCategoryPress = () => {
        Animated.parallel([
            Animated.spring(this.categoryButtonAnimateOpacity, {
                toValue: 1,
                friction: 2,
            }),

            Animated.spring(this.categoryButtonAnimateScale, {
                toValue: 1.1,
                friction: 2,
            }),
        ]).start();
    }

    render() {

        const CategoryActive = {
            transform: [
                {scaleX: this.categoryButtonAnimateScale}, 
                {scaleY: this.categoryButtonAnimateScale}
            ],
            opacity: this.categoryButtonAnimateOpacity,
        }

        return (
            <Animated.View style={CategoryActive}>
                <TouchableOpacity onPress={this.onCategoryPress} style={styles.CategoryButton} activeOpacity={1}>
                    <Text style={{color: 'white'}}>{this.props.Name}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    CategoryButton: {
        backgroundColor: '#EF5595',
        paddingVertical:6,
        paddingHorizontal: 16,
        marginRight: 12,
        marginHorizontal:10,
        borderRadius: 4,
    }
});

export default SearchListingCategoryItem;