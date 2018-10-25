import React,{Component} from'react';
import {View,WebView} from 'react-native';

export default class Website extends Component{
    static navigationOptions={
        header:true,
        headerVisible: true
    }
    render(){
        return(
            <View style={{flex:1}}>
                <WebView
                    source={{uri :'https://www.petluvs.com/'}}
                    style={{marginTop: 20}}
                    // source={{ html: '' }}

                />
            </View>
        );
    }
}