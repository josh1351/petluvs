import React from 'react';
import { Provider } from 'react-redux';
import {View, StyleSheet, StatusBar, SafeAreaView, Dimensions, AsyncStorage} from 'react-native';
import Navigation from './components/Navigation/Navigation';
import store from './store/configureStore';




class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        }
        console.disableYellowBox = true;
    }


  render() {
        return (

	    <Provider store={store}>
            <SafeAreaView style={{flex:1}}>
	        <Navigation />
            </SafeAreaView>

	    </Provider>
    );
  }
}

export default App;