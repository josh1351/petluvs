import React from 'react';
import { Image, View, StyleSheet, TextInput, LayoutAnimation, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class SearchBar extends React.Component {

    componentWillMount() {
        this.searchBarAnimateScale = new Animated.Value(1);
    }

    onSearchBarFocus = () => {
        Animated.parallel([
            Animated.spring(this.searchBarAnimateScale, {
                toValue: 1.1,
                friction: 2,
            }),
        ]).start();
    }

    onSearchBarBlur = () => {
        Animated.parallel([
            Animated.spring(this.searchBarAnimateScale, {
                toValue: 1,
                friction: 2,
            }),
        ]).start();
    }

    render() {

        const onSearchBarFocus = {
            transform: [
                {scaleX: this.searchBarAnimateScale}, 
                {scaleY: this.searchBarAnimateScale}
            ]
        }

        return (
            <Animated.View
                style={[styles.SearchBar, onSearchBarFocus]}
            >
                <Icon name="search" size={26} color='#56C1EF' />
                <TextInput onFocus={this.onSearchBarFocus} underlineColorAndroid='transparent' onBlur={this.onSearchBarBlur}
                           placeholder={this.props.name} style={{flex:1, marginLeft:10,}} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    SearchBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#451B2D',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.19,
        shadowRadius: 21,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginVertical: 20,
        marginHorizontal: 40,
        borderRadius: 8,
    },
    SearchBarActive: {
        transform: ([{ scaleX: 1.1 }, { scaleY: 1.1 }]),
        shadowColor: '#451B2D',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.23,
        shadowRadius: 25,
    }
});

export default SearchBar;