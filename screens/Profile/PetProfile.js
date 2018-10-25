import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView, Dimensions, TouchableOpacity,Share
} from 'react-native';
import Header from "../../components/Header";
import MaterialTabs from "react-native-material-tabs";
import GeneralStyles from "../../Styles/General";
import SearchImages from "../../components/SearchImages";
import ModalDropdown from "react-native-modal-dropdown";
import DatePicker from "react-native-datepicker";
import CheckBox from "react-native-checkbox";
import {Camera, ImagePicker, Permissions} from 'expo';

var {height, width} = Dimensions.get('window');


class PetProfile extends React.Component {

    static navigationOptions = {
        header: null, gesturesEnabled: false,
    };
    state = {
        selectedTab: 0, date: ''
    };

    setTab(tab) {
        this.setState({selectedTab: tab});
    }
    _pickImage = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };


    selectedTab() {
     
        if (this.state.selectedTab == 0) {
            return (<View style={{flex: 1}}>
                    <View  style={{height: 40, flexDirection: 'row', justifyContent: 'center'}}>
                        <Image  onPress={this._pickImage} source={require('../../assets/addPhotoIcon.png')}/>
                        <Text onPress={this._pickImage} style={{color: "#EF5595", fontSize: 16, marginLeft: 10}}>
                            Add Photo or Video
                        </Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
                        <SearchImages/>
                    </ScrollView>
                </View>

            )
        }
        if (this.state.selectedTab == 1) {
            return (
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView  style={{flex: 1}} showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
                    <View>
                        <Text style={styles.textLabel}>
                            Pet Species
                        </Text>
                        <View style={styles.ViewShadow}>
                            <ModalDropdown style={{
                                width: '100%', backgroundColor: 'white', height: height * 0.07, justifyContent: 'center'
                            }}
                                           options={['option 1', 'option 2']}
                                           dropdownStyle={{width: '90%', justifyContent: 'center'}}
                                           defaultValue={"Choose one"}
                                           textStyle={{paddingLeft: 10, color: 'grey',}}/>
                            {/*<Image style={styles.dropDown} source={require('../../assets/dropdown.png')}/>*/}
                        </View>
                        <View>
                            <Text style={styles.textLabel}>
                                Pet Breed
                            </Text>
                            <View style={styles.ViewShadow}>
                                <ModalDropdown style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    height: height * 0.07,
                                    justifyContent: 'center'
                                }}
                                               options={['option 1', 'option 2']}
                                               dropdownStyle={{width: '90%'}}
                                               defaultValue={"Must choose species first"}
                                               textStyle={{paddingLeft: 10, color: 'grey'}}/>
                                {/*<Image style={styles.dropDown} source={require('../../assets/dropdown.png')}/>*/}
                             </View>
                        </View>
                        <View>
                            <Text style={styles.textLabel}>
                                Pet Birthdate
                            </Text>
                            <View style={styles.ViewShadow}>
                                <DatePicker
                                    style={{backgroundColor: 'white', width: '100%',}}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1990-01-01"
                                    maxDate="2019-01-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    iconSource={require('../../assets/startTimeFieldIcon.png')}
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 10,
                                            width: 18, height: 18,
                                            marginLeft: 0, alignItems: 'center',
                                        },
                                        dateInput: {
                                            backgroundColor: 'white', borderColor: 'white', paddingRight: '50%',
                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({date: date})
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={{marginTop: 15, marginLeft: 15,}}>
                                Pet Attributes
                            </Text>
                            <Text style={{fontSize: 10, marginLeft: 15, opacity: 0.50}}>
                                Check all that apply
                            </Text>
                            <View style={{
                                marginHorizontal: 15, marginTop: 10, marginBottom: 10
                            }}>

                                <CheckBox
                                    label='Insured'
                                    checkedImage={require('../../assets/check.png')}
                                    uncheckedImage={require('../../assets/uncheck.png')}
                                    onChange={(checked) => console.log('I am checked', checked)}
                                />


                                <CheckBox
                                    label='Fixed'
                                    checkedImage={require('../../assets/check.png')}
                                    uncheckedImage={require('../../assets/uncheck.png')}
                                    onChange={(checked) => console.log('I am checked', checked)}
                                />


                                <CheckBox
                                    label='Fully vaccinated'
                                    checkedImage={require('../../assets/check.png')}
                                    uncheckedImage={require('../../assets/uncheck.png')}
                                    onChange={(checked) => console.log('I am checked', checked)}
                                />

                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <View style={styles.ButtonView}>
                                <Text style={{color: '#FFFFFF', fontSize: 16}}>Edit Pet</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </View>
            )
        }


    }


    render() {
        const {goBack} = this.props.navigation;
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header navigation={this.props.navigation} title={this.props.navigation.state.params.name}/>
                <View style={{
                    alignItems: 'center',
                    paddingBottom: 10,
                    backgroundColor: 'white',
                    zIndex: 999,
                }}>

                    <View style={styles.Circle}>
                        <Image
                            style={{width: 100, height: 100,}}
                            source={this.props.navigation.state.params.image}/>
                    </View>
                    <Text style={{fontSize: 16, color: '#33212D'}}>
                        {this.props.navigation.state.params.name}
                    </Text>
                    <Text style={{fontSize: 14, color: '#33212D'}}>
                        {this.props.navigation.state.params.type}
                    </Text>
                </View>
                <SafeAreaView style={styles.Tabs}>
                    <MaterialTabs
                        items={['Photos & Videos', 'Details',]}
                        selectedIndex={this.state.selectedTab}
                        onChange={this.setTab.bind(this)}
                        barColor="white"
                        indicatorColor="#EF5595"
                        activeTextColor="#EF5595"
                        inactiveTextColor="#33212D"
                    />
                </SafeAreaView>
                <View style={{ backgroundColor: '#F7F9FF',
                    padding: 10,
                    paddingBottom:0,
                    flex: 1,
                    overflow: 'visible'}}>
                    {this.selectedTab()}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    Circle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    Tabs: {
        borderTopColor: 'rgba(217, 214, 216, .2)', borderTopWidth: 2, borderStyle: 'solid', zIndex: 9999, marginTop: -2,
    },
    textLabel: {
        margin: 15
    },
    ViewShadow: {
        flexDirection: 'row', marginHorizontal: 15,flex:1,
        borderColor: '#000', justifyContent: 'center',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: '#e55595',
    },   ButtonView: {
        backgroundColor: '#e55595',
        height: height * 0.07,
        borderRadius: 5, marginBottom: 10,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
});

export default PetProfile;