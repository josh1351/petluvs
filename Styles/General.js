import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    //Containers
    ScreenContainer: {
      backgroundColor: '#F7F9FF',
      padding: 20,
      paddingBottom:0,
      flex: 1,
      overflow: 'visible'
    },
    Card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#451B2D',
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.18,
        shadowRadius: 21,
        width: '100%',
    },

    //Typography
    h1: {
        fontSize: 18,
        color: '#33212D',
    },
    h2: {
        color: '#D9D6D8',
        fontSize: 20,
    }
  });