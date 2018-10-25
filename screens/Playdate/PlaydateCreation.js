import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
    View, Text, Image, TouchableOpacity, StyleSheet, Keyboard, ActivityIndicator,
    TextInput, ImageBackground, AsyncStorage, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions,StackActions} from 'react-navigation';
import Header from "../../components/Header";
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioButton from '../../components/RadioButton';
import EditProfile from '../Profile/EditProfile';

import { createPlaydate } from '../../store/actions';

class PlaydateCreation extends Component{


    constructor(props){
        super(props);
        this.state={
            isDateTimePickerVisible1: false,
            isDateTimePickerVisible2: false,
            dateStart:'',
            timeStart:'',
            dateEnd:'',
            timeEnd:'',
            isChecked1: true,
            isChecked2: false,
            date1:'',
            date2:'',

        }
    }

    componentWillMount(){
        this.getloc();
    }

    PlaydateCreationHandler () {
        // console.log(this.state);
        // console.log(this.props);
        this.props.createPlaydate(this.state);
    }

    componentWillReceiveProps(nextProps) {
        console.log('Component will receive props', nextProps);
        let { loading, errors } = nextProps;

        if (loading === false && errors === null) {
            this.props.navigation.navigate('Profile');
        }
    };

    getLocationRequest(url, method, header) {
        return fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': header
            }
        })
    }
    getloc=()=> {
        this.saveLocation();
        this.getLatLong();

    }
    getLatLong() {
        var _this = this
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // console.log();
                // console.log(position);
                _this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                _this.saveLocation()
                // console.log('this.state.latitude'+this.state.latitude+'longitude'+this.state.longitude)
            },
            (error) => { console.log(error); },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
        );
    }


    saveLocation = async () => {
        let _this = this;
        if (this.state.latitude && this.state.longitude) {
            console.log('this.state.latitude '+this.state.latitude+'this.state.longitude'+this.state.longitude)
            this.setState({ loading: true });
            let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
            let response = await this.getLocationRequest(url + this.state.latitude + ',' + this.state.longitude + '&key=AIzaSyBMr6Ee1JudyIZH0Q2yvh8aoqFA6kmHS0Q');
            // let response = await auth.getLocationRequest(url + this.state.latitude + ',' + this.state.longitude + '&key=AIzaSyBMr6Ee1JudyIZH0Q2yvh8aoqFA6kmHS0Q');
            // let response=_this.getAddressHandler();

            if (response.status === 200) {
                try {
                    response.json()
                        .then(function (data) {
                            console.log(data)
                            _this.setState({
                                loading: false,
                                address: data['results'][0]['formatted_address']
                            })
                            alert(this.state.address)
                        })
                } catch (error) {
                    this.setState({ loading: false })
                    alert("There was an error saving your contract.")
                }
            } else {
                console.log('saveLocation failed'+response);
            }
        }
        else {
            _this.getLatLong();
            // alert('Please wait trying to fetch your location.' + this.state.address+'hello')
        }


    }

    static navigationOptions = {
        header: null,
    };
    bringPets=()=>{
        return( <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}
                            style={{ width: '100%' }}>
            {this.Array_Items.map((item, key) =>
                (
                    <View key={key}>

                        <TouchableOpacity >
                            <View style={styles.bringPetsSrollview}>
                                <Image source={item.file} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                <Text style={{ color: item.color,fontSize:10,alignSelf: 'center' }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
            }
        </ScrollView>);
    }

    // _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });
    // _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

    _hideDateTimePicker1 = (date) => {
        this.setState({ isDateTimePickerVisible1: !this.state.isDateTimePickerVisible1 });
        //                            alert(date)
    }
    _hideDateTimePicker2 = (date) => {
        this.setState({ isDateTimePickerVisible2: !this.state.isDateTimePickerVisible2 });
        //                            alert(date)
    }

    _handleDatePicked1 = (date) => {
        // console.log('A date has been picked: ', date);
        this._hideDateTimePicker1();
        console.log(date);
        this.setState({dateStart:this.getFormattedDate(date),timeStart:this.getFormattedTime(date)})

    };
    _handleDatePicked2 = (date) => {
        console.log('A date has been picked: ', this.getFormattedDate(date));
        this._hideDateTimePicker2();
        this.setState({dateEnd:this.getFormattedDate(date),timeEnd:this.getFormattedTime(date)})
    };

    getFormattedDate=(date)=>{
        var today = date;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();


        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    getFormattedTime=(date)=>{
        var today= date;
        var hh = today.getHours();
        var MM = today.getMinutes();
        today = hh + ':' + MM ;
        return today;

    }
    playdateLocation=()=>{
        return(
            <View style={styles.playdateLocation}>
                <View style={{
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF'
                }}>
                    <TouchableOpacity
                        // style={styles.findMe}
                        onPress={()=>this.getloc()}
                    >
                        <Image source={require('../../assets/locationFieldIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <Text style={{width:'75%',color: 'gray',height:'auto',fontSize:13}}>
                        {this.state.address}
                    </Text>
                </ScrollView>
                <TouchableOpacity
                    style={styles.findMe}
                    onPress={()=>this.getloc()}
                >
                    <Text style={{marginLeft:6,marginRight: 3,alignItems:'center',color:'#fff'}}>
                        Find Me
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
    notifyFriends=()=>{
        return(
            <View style={styles.playdateLocation}>
                <View style={{
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF'
                }}>
                    <Image source={require('../../assets/notifyIcon.png')}/>
                </View>
                <View style={{alignItems:'center',flex:1,justifyContent:'center'}}>
                    <Text style={{width:'100%',color: 'gray',height:'auto',fontSize:13}}>
                        Your friends
                    </Text>
                </View>


            </View>
        );
    }

    playdateTiming=()=>{
        return(
            <View style={styles.playdateTiming}>
                <View style={styles.datetimeContainerStart}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>this._hideDateTimePicker1()}
                        >
                            <Image
                                style={styles.calender}
                                source={require('../../assets/startTimeFieldIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dateTime}>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible1}
                            onConfirm={this._handleDatePicked1}
                            onCancel={this._hideDateTimePicker1}
                            mode={'datetime'}
                        />
                        <View>
                            <Text style={{alignSelf: 'center',color:'grey',fontSize:14}}>
                                {this.state.dateStart}
                            </Text>
                            <Text style={{alignSelf: 'center',color:'grey',fontSize:14}}>
                                StartTime:{this.state.timeStart}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:30}}>
                        -
                    </Text>
                </View>
                <View style={styles.datetimeContainerend}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>this._hideDateTimePicker2()}
                        >
                            <Image
                                style={styles.calender}
                                source={require('../../assets/startTimeFieldIcon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dateTime}>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible2}
                            onConfirm={this._handleDatePicked2}
                            onCancel={this._hideDateTimePicker2}
                            mode={'datetime'}
                        />
                        <View>
                            <Text style={{alignSelf: 'center',color:'grey',fontSize:14}}>
                                {this.state.dateEnd}
                            </Text>
                            <Text style={{alignSelf: 'center',color:'grey',fontSize:14}}>
                                EndTime:{this.state.timeEnd}
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }

    statusCheck=()=>{
        return(
            <View>
                <TouchableOpacity
                    onPress={()=> {
                        this.setState({isChecked1: !this.state.isChecked1})
                        if (this.state.isChecked2) {
                            this.setState({isChecked2: false})
                        }
                    }
                    }
                >
                    <View>
                        <View style={styles.radioButton1}>
                            <RadioButton isChecked={this.state.isChecked1}/>
                            <Text style={{fontSize:20,color:this.state.isChecked1?'#e55595':'grey',paddingLeft:10}}>Public</Text>
                        </View>
                        <Text style={{fontSize:8.5,marginLeft:30,marginRight:10,color:'grey'}}>
                            Your Playdate will be accessible by any user in your proximity. This setting will also allow your playdate to be shown on the home screen of the Petluvs.
                        </Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{this.setState({isChecked2:!this.state.isChecked2,})
                        if(this.state.isChecked1){
                            this.setState({isChecked1:false})
                        }
                    }}

                >
                    <View>
                        <View style={styles.radioButton1}>
                            <RadioButton isChecked={this.state.isChecked2}/>
                            <Text style={{fontSize:20,color:this.state.isChecked2?'#e55595':'grey',paddingLeft:10}}>Private</Text>
                        </View>
                        <Text style={{fontSize:10,marginLeft:30,color:'grey'}}>
                            Your playdate will be accessibke to the users that you invite.
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    Array_Items =
        [
            {
                title: 'Tommy',
                file: require('../../assets/onboarding1.png'),
                color: "gray"
            },
            {
                title: 'Tank',
                file: require('../../assets/onboarding1.png'),
                color: "gray"
            },
            {
                title: 'Bella',
                file: require('../../assets/onboarding1.png'),
                color: 'gray'
            },
            {
                title: 'Daisy',
                file: require('../../assets/onboarding1.png'),
                color: 'gray'
            },
            {
                title: 'Buddy',
                file: require('../../assets/onboarding1.png'),
                color: 'gray'
            },
            {
                title: 'Lucy',
                file: require('../../assets/onboarding1.png'),
                color: 'gray'
            },

        ];



    render(){
        return(
            <View style={{flex:1}}>
                <Header title={'Playdate Creation'} navigation={this.props.navigation}/>

                <ScrollView style={styles.mainContainer}>
                <View style={{ height: 3, backgroundColor: '#E6FFFD'}}>

                </View >
                <View style={styles.bringPetsContainer}>
                    <Text style={styles.bringPetsText}>
                        Which pets are you bringing?
                    </Text>
                    {this.bringPets()}
                </View>
                <View style={styles.playdateLocationContainer}>
                    <Text style={{marginLeft:20,marginBottom: 10,fontSize:15}}>
                        Where?
                    </Text>
                    {this.playdateLocation()}
                </View>
                <View style={styles.playdateLocationContainer}>
                    <Text style={{marginLeft:20,marginBottom: 10,fontSize:15}}>
                        When?
                    </Text>
                    {this.playdateTiming()}
                </View>
                <View style={styles.statusContainer}>
                    <Text style={{marginLeft:20,fontSize:15}}>
                        Status
                    </Text>
                    <View style={styles.radioButtonContainer}>
                        {this.statusCheck()}
                    </View>
                </View>
                <View style={styles.notifyFriendsContainer}>
                    <View>
                        <Text style={{fontSize:15,marginLeft:20,marginBottom: 10,marginTop:10}}>
                            Notify your friends
                        </Text>
                    </View>
                    {this.notifyFriends()}
                </View>
                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={this.PlaydateCreationHandler.bind(this)}>
                        <View style={{  flex:1,alignItems: 'center', justifyContent: 'center' }}>

                            <Text style={{ color: '#fff', fontSize:16 ,}}>
                                Create Playdate
                            </Text>
                        </View>

                    </TouchableOpacity>

                </View>
            </ScrollView>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#fff'
    },
    bringPetsContainer:{

    },
    bringPetsText :{
        marginTop:20,
        paddingLeft: 20,
        marginBottom: 10,
        fontSize:15
    },
    bringPetsSrollview:{
        marginLeft: 20
    },
    playdateLocation:{
        height:40,
        width: '95%',
        borderWidth: 2,
        borderColor:'#fff',
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1, },
        elevation:5,
        shadowColor: '#e55595',
        shadowOpacity: 0.5,
        // alignItems:'center',
        justifyContent:'space-between',
        paddingLeft: 5,
        marginLeft:20,
        marginRight: 20,
        flexDirection: 'row'
    },
    playdateLocationContainer:{
        marginTop: 20,
        marginRight: 20
    },
    dateTime:{
        flex:1,
        height:'75%',
        // backgroundColor:'red'
    },
    calender:{
        marginLeft:5
    },
    datetimeContainerStart:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor:'#fff',
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: '#e55595',
        shadowOpacity: 0.5,
        elevation:5,
        // margin:5
    },
    datetimeContainerend:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor:'#fff',
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: '#e55595',
        shadowOpacity: 0.5,
        elevation:5,
        // marginLeft:10
    },
    playdateTiming:{
        height:50,
        width: '95%',
        borderWidth: 2,
        borderColor:'#fff',
        backgroundColor: '#fff',
        justifyContent:'space-between',
        paddingLeft: 5,
        marginLeft:20,
        marginRight: 20,
        flexDirection: 'row'
    },
    statusContainer:{
        height:'17%',
        // backgroundColor:'red',
        marginTop:20,

    },
    radioButtonContainer:{
        marginLeft:20,
        marginTop:10
    },
    radioButton1:{
        flexDirection:'row',
        alignItems:'center'

    },
    notifyFriendsContainer:{

        marginTop: 20,
        marginRight: 20,
    },
    saveButton:{
        height: 50,
        width:'90%',
        borderRadius:10,
        backgroundColor:'#e55595',
        opacity:.9,
        marginBottom:20

    },
    saveButtonContainer:{
        alignSelf:'flex-end',
        alignItems:'center',
        justifyContent:'flex-start',
        height:'10%',
        width:'100%',
        marginBottom:10,
        marginTop:10

    },
});

const mapStateToProps = (state) => {
    return {
        loading: state.playDates.loading,
        errors: state.playDates.errors
    }
}

export default connect(mapStateToProps, { createPlaydate })(PlaydateCreation);