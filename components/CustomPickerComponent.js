import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings,
    CustomPickerActions
} from 'react-native-custom-picker'


export default class CustomPickerComponent extends Component {

    constructor(props) {
        super(props)
        this.state={
        }

    }

    renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <Text style={{ margin: 0, fontSize: 22, textAlign: 'center', marginTop: 10, marginBottom: 10, color: '#5A5A5A' }}>
                    Select Category
                </Text>
            </View>
        )
    }

    renderFooter(action) {
        return (
            <TouchableOpacity
                style={styles.footerContainer}
                onPress={() => {
                    Alert.alert('Close Dropdown', "Are you sure?", [
                        {
                            text: 'Yes',
                            onPress: action.close.bind(this)
                        }
                    ])
                }}
            >
                <View style={styles.button3} >
                    <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Done</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderField(settings) {
        const { selectedItem, defaultText, getLabel, clear } = settings
        return (
            <View>
                {!selectedItem && <Text style={{marginLeft:'5%'}}>{defaultText}</Text>}
                {selectedItem && (
                    <View style={styles.innerContainer}>
                        <Text style={{color:'#222222'}}>
                            {getLabel(selectedItem)}
                        </Text>
                    </View>
                )}
            </View>
        )
    }

    renderOption(settings) {
        const { item, getLabel } = settings
        return (
            <View style={styles.optionContainer}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.innerContainer}>
                        <Text style={{ color: '#222222' }}>{getLabel(item)}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={{  width: '100%' ,backgroundColor:'#ffffff' }}>
                    <View>
                        <Image style={{ position:'absolute',left:'85%',top:'70%',bottom:'10%',height:10,width:18 }} source={require('../assets/yellowback-icon.png')} />
                        <CustomPicker
                            placeholder={this.props.placeholder}
                            options={this.props.options}
                            getLabel={item => item.name}
                            fieldTemplate={this.renderField}
                            optionTemplate={this.renderOption}
                            headerTemplate={this.renderHeader}
                            footerTemplate={this.renderFooter}
                            onValueChange={value => {
                                console.log('Selected Item', value ? JSON.stringify(value) : 'No item were selected!')
                            }}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#E8E8E8',
        fontSize: 22,
        textAlign: 'center'
    },
    footerContainer: {
        backgroundColor: '#ffffff',
        fontSize: 22,
        textAlign: 'center'
    },
    innerContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
    },
    optionContainer: {
        padding: 2,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.8,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    scrollContainer: {
        backgroundColor: '#ffffff'
    },
    button3: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#00AFEA',
        width: '80%',
        height: 45,
        padding: 0,
        marginLeft: '10%',
        marginRight: '10%',
        justifyContent: 'center',
        borderWidth:1,
        borderRadius: 4,
        borderColor:'#00687E',
        textAlign: 'center'
    },
});