import React from 'react';
import {Text, View, ScrollView, Image, Dimensions, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Header from "../components/Header";

class BreederInformation extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null, gesturesEnabled: false,
    };


    renderHeader() {
        return (
            <Header navigation={this.props.navigation} title={this.props.navigation.state.params.data}
            />
        )
    }
    saveProfile(){
        if(this.props.navigation.state.params.data == 'Animal Breeder Information'){
            return(<Text style={{color: '#FFFFFF', fontSize: 16}}>Save Breeder Profile</Text>)
        }
        else{
            return(<Text style={{color: '#FFFFFF', fontSize: 16}}>Save Profile</Text>)
        }
    }
    americanKennelNo(){
            return(<Text style={styles.textLabel}>Enter Details</Text>)
      
    }


    render() {

        return (

            <View style={{flex: 1, backgroundColor: '#fff'}}>
                {this.renderHeader()}
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} removeClippedSubviews={true}>

                    <View>
                        {this.americanKennelNo()}

                        <View style={styles.ViewShadow
                        }>
                            <TextInput
                                fontSize={14}
                                style={styles.TextInput}
                                placeholder='DN12345678'
                                placeholderTextColor='gray'
                                multiline={true}
                                autoCorrect={false} autoCapitalize="none"
                                selectionColor='gray'
                                keyboardType='email-address'
                                underlineColorAndroid='transparent'/>
                        </View>


                        <TouchableOpacity>
                            <View style={styles.profileImage}>
                            <Text style={{color:'#e55595'}}>upload images</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}>

                            <View style={styles.ButtonView}>{}
                                {this.saveProfile()}
                                  </View>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </View>

        );
    }
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: '100%',
        width: '100%',
    },
    textLabel: {
        margin: 15
    },
    ViewShadow: {
        flexDirection: 'row', marginHorizontal: 15,
        borderColor: '#000', justifyContent: 'center',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: '#e55595',

    },
    TextInput: {
        flex: 1, height: height * 0.21, backgroundColor: '#FFFFFF', color: 'gray', paddingLeft: 10,alignItems:'flex-start'
    },
    profileImage: {
        // flex: 1,
        // resizeMode: 'contain',
        borderColor:'#e55595',
        borderStyle: 'dashed',
        width: '85%',height:60,borderRadius:10,
        alignItems: 'center',borderWidth:1,
        marginTop: 30,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    ButtonView: {
        backgroundColor: '#e55595',
        height: height * 0.07,
        borderRadius: 5, marginBottom: 10, marginTop: 50,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },

});

export default BreederInformation;
