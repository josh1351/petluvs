import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ListView,
    Geolocation,
    ActivityIndicator, AsyncStorage, TouchableHighlight
} from 'react-native';
import { Camera, Permissions } from 'expo';
import {signin, signup,getLocationRequest} from "../../store/actions/index";

import Header from "../../components/Header";
import FlipToggle from 'react-native-flip-toggle-button';
import { ImagePicker } from 'expo';


class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            phone_number: '',
            address:'udyog vihar phase 2',
            loading: false,
            date: "2016-05-15", image: null, isSwitch4On: false,flag:false,
            category1: false,
            category2: false,
            category3: false,
            category4: false,
            category5: false,
            category6: false,
            category7: false,
            breeder:true,
            latitude:'',
            longitude:'',

            url : 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
            items: [
                {
                    category1:
                        {
                            data: { data: 'I am an Pet Breeder', subdata: 'Animal Breeder Information' },
                        },
                    category2:
                        {
                            data: { data: 'I am a Pet Sitter', subdata: 'Pet Sitter Information' },
                        },
                    category3:
                        {
                            data: { data: 'I am a dog breeder', subdata: 'Dog Breeder Information' },
                        },
                    category4:
                        {
                            data: { data: 'I am a Pet Groomer', subdata: 'Pet Groomer Information' },
                        },
                    category5:
                        {
                            data: { data: 'I am a Pet Trainer', subdata: 'Pet Trainer Information' },
                        },
                    category6:
                        {
                            data: { data: 'I want to Foster Pets', subdata: 'Pet Foster Information' },
                        },
                    category7:
                        {
                            data: { data: 'I want to Rescue Animals', subdata: 'Animal Rescue Information' },
                        },
                }
            ],


            listDetailArray: [

                { name: 'Category1', file: require('../../assets/onboarding1.png') },
                { name: 'Category2', file: require('../../assets/onboarding1.png') },
                { name: 'Category3', file: require('../../assets/onboarding1.png') },
                { name: 'Category4', file: require('../../assets/onboarding1.png') },
                { name: 'Category5', file: require('../../assets/onboarding1.png') }],


            categoryArray: [

                { name: 'Category1', },
                { name: 'Category2', },
                { name: 'Category3', },
                { name: 'Category4', },
                { name: 'Category5', }],



        }

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.Array_Items =
            [
                {
                    title: 'Add Pet',
                    file: require('../../assets/addNewPet.png'),
                    color: "#EF5595",

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

        this.myArray=[];
        // this.breeder=true;
        this.updateArray();
        // alert(this.myArray[0]);
        // AsyncStorage.removeItem('@MySuperStore:key');

    }



    isValid=async()=> {
        if( this.state.breeder===true){
            try {
                await AsyncStorage.setItem('@MySuperStore1:key', JSON.stringify(true));
                // alert(this.myArray[0]);
            } catch (error) {
                // Error saving data
            }
        }
        // else if(this.state.category1===true && this.state.category1===false && this.state.category1===false && this.state.category1===false && this.state.category1===false && this.state.category1===false && this.state.category1===false){
        else if( this.state.breeder===false){
            try {
                await AsyncStorage.setItem('@MySuperStore1:key', JSON.stringify(false));
                // alert(this.myArray[0]);
            } catch (error) {
                // Error saving data
            }
        }
        try {
            await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.myArray));
            // alert(this.myArray[0]);
        } catch (error) {
            // Error saving data
        }
        // alert(this.state.breeder)
        const {  email, phone_number ,address } = this.state;
        let valid = false;
        let reg = /\S+@\S+\.\S+/g ;
        if ( email.length > 0 && phone_number.length > 0 && address.length > 0) {
            if(!reg.test(email)) {
                alert('Please enter a valid email address.')
            } else if(phone_number.length < 10 ) {
                alert('phone_number must contain 10 characters.');
            }
            else if(address.length<5){
                alert('address is invalid');
            }
            else {
                valid = true;
            }
        }

        if (email.length === 0) {
            alert('Please enter an email address.');
        } else if (phone_number.length === 0) {
            alert('Please enter a phone_number.');
        }else if(address.length===0){
            alert('Please enter your address.');
        }
        return valid;
    }

    saveHandler = () => {
        let data={
            email:this.state.email,
            phone_number:this.state.phone_number,
            address:this.state.address,
        };
        if(this.isValid()==true){
            this.props.signin(data);
        }
        else{
        }



    };

    renderHeader() {
        return (
            <Header navigation={this.props.navigation} title={'Edit Profile'}
            />
        )

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

    _renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() =>

                this.props.navigation.navigate('SubProfile', { selectedCategory: item.name })
            }
            style={{
                height: 42, marginLeft: '5%'

            }}>
            <Text style={{ fontSize: 14, color: '#222222' }}>
                {item.name}
            </Text>



        </TouchableOpacity>
    );


    addPet=()=>{
        const {navigate} = this.props.navigation;
        navigate('AddPet');


    }

    showData = (data) => {
        // alert(data)
        AsyncStorage.setItem('breeder',"true")
        return (
            <View>
                <View>

                    <View style={{ height: 30,marginTop:20 }}>

                        <Image
                            source={require('../../assets/cross.png')}
                            style={{ left: '5%', top: '10%', height: 10, width: 10,position: 'absolute' }}
                            resizeMode='contain' />

                        <Text style={{ color: 'gray', marginLeft: '10%' }}>
                            AKC Number
                        </Text>
                    </View>

                    <View style={{ height: 30 }}>

                        <Image
                            source={require('../../assets/cross.png')}
                            style={{ left: '5%', top: '10%', height: 10, width: 10, position: 'absolute' }}
                            resizeMode='contain' />

                        <Text style={{ color: 'gray', marginLeft: '10%' }}>
                            AKC Certificate Uploaded
                        </Text>
                    </View>
                    <TouchableHighlight
                        style={{ alignSelf:'flex-end', top:'15%', height: 30, width: 30,position: 'absolute'}}
                        onPress={() => this.props.navigation.navigate('BreederInformation',{data:data})}>
                    <Image
                        source={require('../../assets/edit.png')}

                        resizeMode='contain' />
                    </TouchableHighlight>
                </View>

            </View>
        )
    }
    showOtherCategory = (data) => {
        AsyncStorage.setItem('breeder',"false")
        return (
            <View>
                <View>

                    <View style={{ height: 30,marginTop:20 }}>

                        <Image
                            source={require('../../assets/cross.png')}
                            style={{ left: '5%', top: '10%', height: 10, width: 10,position: 'absolute' }}
                            resizeMode='contain' />

                        <Text style={{ color: 'gray', marginLeft: '10%' }}>
                            Details Available
                        </Text>
                    </View>


                    <TouchableHighlight
                        style={{ alignSelf:'flex-end', top:'15%', height: 30, width: 30,position: 'absolute'}}
                        onPress={() => this.props.navigation.navigate('BreederInformation',{data:data})}>
                        <Image
                            source={require('../../assets/edit.png')}

                            resizeMode='contain' />
                    </TouchableHighlight>
                </View>

            </View>
        )
    }




    getLocationRequest(url, method, header){
        return fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': header
            }
        })
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


            if (response.status === 200) {
                try {
                    response.json()
                        .then(function (data) {
                            console.log(data)
                            _this.setState({
                                loading: false,
                                address: data['results'][0]['formatted_address']
                            })
                            console.log(this.state.address)
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

    saveSelection=async(value,data)=>{
        if(value===true){
            if(!this.myArray[this.myArray.indexOf(data)]) {
                this.myArray.push(data)
                // alert(this.myArray)
                // try {
                //     await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.myArray));
                // } catch (error) {
                //     // Error saving data
                // }
            }
        }
        else if(value===false){
            this.myArray.splice(this.myArray.indexOf(data),1)
            // try {
            //     await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.myArray));
            // } catch (error) {
            //     // Error saving data
            // }
        }
    }
    componentDidMount(){
        // AsyncStorage.clear();
    }
    updateArray=async()=>{
        try {
            const myArray1 = await AsyncStorage.getItem('@MySuperStore:key');
            if (myArray1 !== null) {
                // We have data!!
                this.myArray=JSON.parse(myArray1);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    static navigationOptions = {
        header: null,
    };
    getloc=()=> {
        this.saveLocation();
        this.getLatLong();

    }

    showList = (rowData, sectionID, rowID, highlightRow) => {

        return (
            <View >
                <View style={styles.subMenu}>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('SubProfile', { selectedCategory: rowData.category2.data.data })
                        }
                        style={styles.FlipToggleButton}
                    >
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ width: '80%' ,flexDirection: 'row'}}>
                                <Image  style={{ width: 24, height: 24, }}
                                        source={require('../../assets/breeder.png')} />
                                <Text style={styles.text1}>
                                    I am an Pet Breeder
                                </Text>
                            </View>
                            <View style={{ width: '20%' }}>
                                <FlipToggle
                                    value={this.state.isSwitch4On}
                                    buttonWidth={44}
                                    buttonHeight={25}
                                    buttonRadius={50}
                                    buttonOffColor={'gray'}
                                    sliderOffColor={'#ffffff'}
                                    buttonOnColor={'#EF5595'}
                                    sliderOnColor={'#ffffff'}
                                    onToggle={(value) => {
                                        this.setState({ isSwitch4On: value,breeder:true });

                                        this.saveSelection(value,rowData.category1.data.subdata);
                                        if(value===true){
                                            this.showData()
                                        }

                                    }}
                                    changeToggleStateOnLongPress={false}
                                    onToggleLongPress={() => {
                                        console.log('Long Press');
                                    }}
                                />
                            </View>
                        </View>

                    </TouchableOpacity>
                    {
                        this.state.isSwitch4On == true ?
                            <View style={{marginLeft:25}}>
                                <Text
                                    style={styles.InformationHeader}
                                >{rowData.category1.data.subdata}</Text>
                                {this.showData(rowData.category1.data.subdata)}
                            </View>
                            : null
                    }
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('SubProfile', { selectedCategory: rowData.category2.data.data })
                        }
                        style={styles.FlipToggleButton}
                    >
                        <View style={{ flexDirection: 'row',width: '85%' }}>
                            <Image  style={{ width: 24, height: 24, }}
                                    source={require('../../assets/pet_sitter.png')} />
                            <Text style={styles.text1}>
                                {rowData.category2.data.data}
                            </Text>
                            {
                                this.state.category2 == false ?
                                    <View style={{ width: '20%'}}>
                                        <FlipToggle
                                            value={this.state.category2}
                                            buttonWidth={44}
                                            buttonHeight={25}
                                            buttonRadius={50}
                                            buttonOffColor={'gray'}
                                            sliderOffColor={'#ffffff'}
                                            buttonOnColor={'#EF5595'}
                                            sliderOnColor={'#ffffff'}
                                            onToggle={(value) => {
                                                this.setState({ category2: value,breeder:false  });
                                                this.saveSelection(value,rowData.category2.data.subdata);
                                            }}
                                            changeToggleStateOnLongPress={false}
                                            onToggleLongPress={() => {
                                                console.log('Long Press');
                                            }}
                                        />
                                    </View>
                                    : null
                            }
                            {
                                this.state.category2 == true ?
                                    <View style={{ flexDirection: 'row',marginRight:50  }}>
                                        <View style={{ width: '20%' }}>
                                            <FlipToggle
                                                value={this.state.category2}
                                                buttonWidth={44}
                                                buttonHeight={25}
                                                buttonRadius={50}
                                                buttonOffColor={'gray'}
                                                sliderOffColor={'#ffffff'}
                                                buttonOnColor={'#EF5595'}
                                                sliderOnColor={'#ffffff'}
                                                onToggle={(value) => {
                                                    this.setState({ category2: value,breeder:false  });
                                                    this.saveSelection(value,rowData.category2.data.subdata);
                                                }}
                                                changeToggleStateOnLongPress={false}
                                                onToggleLongPress={() => {
                                                    console.log('Long Press');
                                                }}
                                            />
                                        </View>

                                    </View>

                                    : null
                            }
                            {/*<Text>{rowData.category2.data.subdata}</Text>*/}
                        </View>

                    </TouchableOpacity>

                    {
                        this.state.category2 == true ?
                            <View style={{marginLeft:25}}>
                                <Text
                                    style={styles.InformationHeader}
                                >{rowData.category2.data.subdata}</Text>
                                {this.showOtherCategory(rowData.category2.data.subdata)}
                            </View>
                            : null
                    }

                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('SubProfile', { selectedCategory: rowData.category4.data.data })
                        }
                        style={styles.FlipToggleButton}
                    >
                        <View style={{ flexDirection: 'row',width:'85%' }}>
                            <Image  style={{ width: 24, height: 24, }}
                                    source={require('../../assets/pet_groomer.png')} />
                            <Text style={styles.text1}>
                                {rowData.category4.data.data}
                            </Text>
                            {
                                this.state.category4 == false ?
                                    <View style={{ width: '20%' }}>
                                        <FlipToggle
                                            value={this.state.category4}
                                            buttonWidth={44}
                                            buttonHeight={25}
                                            buttonRadius={50}
                                            buttonOffColor={'gray'}
                                            sliderOffColor={'#ffffff'}
                                            buttonOnColor={'#EF5595'}
                                            sliderOnColor={'#ffffff'}
                                            onToggle={(value) => {
                                                this.setState({ category4: value,breeder:false  });
                                                this.saveSelection(value,rowData.category4.data.subdata);
                                            }}
                                            changeToggleStateOnLongPress={false}
                                            onToggleLongPress={() => {
                                                console.log('Long Press');
                                            }}
                                        />
                                    </View>
                                    : null
                            }
                            {
                                this.state.category4 == true ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '20%' }}>
                                            <FlipToggle
                                                value={this.state.category4}
                                                buttonWidth={44}
                                                buttonHeight={25}
                                                buttonRadius={50}
                                                buttonOffColor={'gray'}
                                                sliderOffColor={'#ffffff'}
                                                buttonOnColor={'#EF5595'}
                                                sliderOnColor={'#ffffff'}
                                                onToggle={(value) => {
                                                    this.setState({ category4: value ,breeder:false });
                                                    this.saveSelection(value,rowData.category4.data.subdata);
                                                }}
                                                changeToggleStateOnLongPress={false}
                                                onToggleLongPress={() => {
                                                    console.log('Long Press');
                                                }}
                                            />
                                        </View>
                                        {/* <Text>{rowData.category4.data.subdata}</Text> */}
                                    </View>
                                    : null
                            }
                        </View>

                    </TouchableOpacity>

                    {
                        this.state.category4 == true ?
                            <View style={{marginLeft:25}}>

                                <Text
                                    style={styles.InformationHeader}
                                >{rowData.category4.data.subdata}</Text>
                                {this.showOtherCategory(rowData.category4.data.subdata)}
                            </View>
                            : null
                    }
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('SubProfile', { selectedCategory: rowData.category5.data.data })
                        }
                        style={styles.FlipToggleButton}
                    >
                        <View style={{ flexDirection: 'row',width:'85%' }}>
                            <Image  style={{ width: 24, height: 24, }}
                                    source={require('../../assets/pet_trainer.png')} />
                            <Text style={styles.text1}>
                                {rowData.category5.data.data}
                            </Text>
                            {
                                this.state.category5 == false ?
                                    <View style={{ width: '20%' }}>
                                        <FlipToggle
                                            value={this.state.category5}
                                            buttonWidth={44}
                                            buttonHeight={25}
                                            buttonRadius={50}
                                            buttonOffColor={'gray'}
                                            sliderOffColor={'#ffffff'}
                                            buttonOnColor={'#EF5595'}
                                            sliderOnColor={'#ffffff'}
                                            onToggle={(value) => {
                                                this.setState({ category5: value,breeder:false  });
                                                this.saveSelection(value,rowData.category5.data.subdata);

                                            }}
                                            changeToggleStateOnLongPress={false}
                                            onToggleLongPress={() => {
                                                console.log('Long Press');
                                            }}
                                        />
                                    </View>
                                    : null
                            }
                            {
                                this.state.category5 == true ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '20%' }}>
                                            <FlipToggle
                                                value={this.state.category5}
                                                buttonWidth={44}
                                                buttonHeight={25}
                                                buttonRadius={50}
                                                buttonOffColor={'gray'}
                                                sliderOffColor={'#ffffff'}
                                                buttonOnColor={'#EF5595'}
                                                sliderOnColor={'#ffffff'}
                                                onToggle={(value) => {
                                                    this.setState({ category5: value ,breeder:false });
                                                    this.saveSelection(value,rowData.category5.data.subdata);

                                                }}
                                                changeToggleStateOnLongPress={false}
                                                onToggleLongPress={() => {
                                                    console.log('Long Press');
                                                }}
                                            />
                                        </View>rr
                                        {/* <Text>{rowData.category5.data.subdata}</Text> */}
                                    </View>
                                    : null
                            }
                        </View>

                    </TouchableOpacity>
                    {
                        this.state.category5 == true ?
                            <View style={{marginLeft:25}}>
                                <Text
                                    style={styles.InformationHeader}>
                                    {rowData.category5.data.subdata}
                                </Text>
                                {this.showOtherCategory(rowData.category5.data.subdata)}
                            </View>
                            : null
                    }

                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('SubProfile', { selectedCategory: rowData.category6.data.data })
                        }
                        style={styles.FlipToggleButton}
                    >
                        <View style={{ flexDirection: 'row',width:'85%' }}>
                            <Image  style={{ width: 24, height: 24, }}
                                    source={require('../../assets/pet_foster.png')} />
                            <Text style={styles.text1}>
                                {rowData.category6.data.data}
                            </Text>
                            {
                                this.state.category6 == false ?
                                    <View style={{ width: '20%' }}>
                                        <FlipToggle
                                            value={this.state.category6}
                                            buttonWidth={44}
                                            buttonHeight={25}
                                            buttonRadius={50}
                                            buttonOffColor={'gray'}
                                            sliderOffColor={'#ffffff'}
                                            buttonOnColor={'#EF5595'}
                                            sliderOnColor={'#ffffff'}
                                            onToggle={(value) => {
                                                this.setState({ category6: value,breeder:false  });
                                                this.saveSelection(value,rowData.category6.data.subdata);

                                            }}
                                            changeToggleStateOnLongPress={false}
                                            onToggleLongPress={() => {
                                                console.log('Long Press');
                                            }}
                                        />
                                    </View>
                                    : null
                            }
                            {
                                this.state.category6 == true ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '20%' }}>
                                            <FlipToggle
                                                value={this.state.category6}
                                                buttonWidth={44}
                                                buttonHeight={25}
                                                buttonRadius={50}
                                                buttonOffColor={'gray'}
                                                sliderOffColor={'#ffffff'}
                                                buttonOnColor={'#EF5595'}
                                                sliderOnColor={'#ffffff'}
                                                onToggle={(value) => {
                                                    this.setState({ category6: value,breeder:false  });
                                                    this.saveSelection(value,rowData.category6.data.subdata);

                                                }}
                                                changeToggleStateOnLongPress={false}
                                                onToggleLongPress={() => {
                                                    console.log('Long Press');
                                                }}
                                            />
                                        </View>
                                        {/* <Text>{rowData.category6.data.subdata}</Text> */}
                                    </View>
                                    : null
                            }
                        </View>

                    </TouchableOpacity>

                    {
                        this.state.category6 == true ?
                            <View style={{marginLeft:25}}>
                                <Text
                                    style={styles.InformationHeader}>
                                    {rowData.category6.data.subdata}</Text>
                                {this.showOtherCategory(rowData.category6.data.subdata)}
                            </View>
                            : null
                    }
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('SubProfile', { selectedCategory: rowData.category7.data.data })
                        }
                        style={styles.FlipToggleButton}
                    >
                        <View style={{ flexDirection: 'row',width:'85%' }}>
                            <Image  style={{ width: 24, height: 24, }}
                                    source={require('../../assets/rescue_animal.png')} />
                            <Text style={styles.text1}>
                                {rowData.category7.data.data}
                            </Text>
                            {
                                this.state.category7 == false ?
                                    <View style={{ width: '20%' }}>
                                        <FlipToggle
                                            value={this.state.category7}
                                            buttonWidth={44}
                                            buttonHeight={25}
                                            buttonRadius={50}
                                            buttonOffColor={'gray'}
                                            sliderOffColor={'#ffffff'}
                                            buttonOnColor={'#EF5595'}
                                            sliderOnColor={'#ffffff'}
                                            onToggle={(value) => {
                                                this.setState({ category7: value,breeder:false  });
                                                this.saveSelection(value,rowData.category7.data.subdata);

                                            }}
                                            changeToggleStateOnLongPress={false}
                                            onToggleLongPress={() => {
                                                console.log('Long Press');
                                            }}
                                        />
                                    </View>
                                    : null
                            }
                            {
                                this.state.category7 == true ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '20%' }}>
                                            <FlipToggle
                                                value={this.state.category7}
                                                buttonWidth={44}
                                                buttonHeight={25}
                                                buttonRadius={50}
                                                buttonOffColor={'gray'}
                                                sliderOffColor={'#ffffff'}
                                                buttonOnColor={'#EF5595'}
                                                sliderOnColor={'#ffffff'}
                                                onToggle={(value) => {
                                                    this.setState({ category7: value ,breeder:false});
                                                    this.saveSelection(value,rowData.category7.data.subdata);

                                                }}
                                                changeToggleStateOnLongPress={false}
                                                onToggleLongPress={() => {
                                                    console.log('Long Press');
                                                }}
                                            />
                                        </View>
                                        {/* <Text>{rowData.category7.data.subdata}</Text> */}
                                    </View>
                                    : null
                            }
                        </View>

                    </TouchableOpacity>
                    {
                        this.state.category7 == true ?
                            <View style={{marginLeft:25}}>
                                <Text
                                    style={styles.InformationHeader}>
                                    {rowData.category7.data.subdata}</Text>
                                {this.showOtherCategory(rowData.category7.data.subdata)}
                            </View>
                            : null
                    }
                </View>


                <View style={[styles.emailAndNumbercontainer,{marginBottom:50,marginLeft:15,elevation:5}]}>
                    <Text style={[styles.text2,{marginBottom:5}]}>
                        My Location
                    </Text>

                    <View style={styles.addressContainer}>
                        <Text style={{width:'60%',color: 'gray',height:'auto'}}>
                            {this.state.address}
                        </Text>
                        <TouchableOpacity
                            style={styles.findMe}
                            onPress={()=>this.getloc()}
                        >
                            <Text style={{marginLeft:6,marginRight: 3,alignItems:'center',color:'#fff'}}>
                                Find Me
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        );
    }

    render() {

        let { image } = this.state;
        const navigate=this.props.navigation;

        let data = [{
            value: 'Banana',
        }, {
            value: 'Mango',
        }, {
            value: 'Pear',
        }];


        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                {this.renderHeader()}
                <View style={styles.seperator}>
                </View>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} removeClippedSubviews={true}>



                    <View style={{
                        alignItems: 'center',
                        paddingBottom: 20,
                        backgroundColor: 'white',
                        zIndex: 999,
                        marginTop: 10
                    }}>

                        <View style={styles.Circle}>
                            <Image
                                style={{ width: 100, height: 100, }}
                                source={require('../../assets/profile.png')} />
                        </View>
                        <Text  onPress={this._pickImage} style={{ fontSize: 18, color: '#e55595' }}>
                            Change Profile Photo
                        </Text>

                    </View>
                    <View style={styles.seperator}>
                    </View>

                    <Text style={styles.textLabel}>
                        Your Pets
                    </Text>

                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}
                                style={{ width: '100%' }}>
                        {this.Array_Items.map((item, key) =>
                            (

                                <View key={key}>

                                    <TouchableOpacity
                                        onPress=
                                            {()=>{if(!key){
                                                this.addPet()}}
                                            }
                                    >
                                        <View style={{
                                            paddingLeft: 10, paddingRight: 10,
                                            paddingBottom: 10
                                        }}

                                        >
                                            <Image source={item.file} style={{ width: 40, height: 40, borderRadius: 40 / 2 }} />
                                            <Text style={{ color: item.color,fontSize:12,marginLeft:4 }}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </ScrollView>
                    <View style={styles.seperator}>
                    </View>

                    <Text style={styles.textLabel}>
                        Account Type
                    </Text>

                    {
                        // this.state.isSwitch4On ?


                        <ListView
                            dataSource={this.ds.cloneWithRows(this.state.items)}
                            scrollEnabled={false}
                            renderRow={this.showList}
                            style={{flex:1}}
                            enableEmptySections

                        />

                        // : null
                    }
                    <View>
                        <Text style={styles.textLabel1}>
                            Email
                        </Text>

                        <View style={styles.ViewShadow
                        }>
                            <TextInput
                                fontSize={14}
                                style={styles.TextInput}
                                placeholder='john@gmail.com'
                                placeholderTextColor='gray'
                                autoCorrect={false} autoCapitalize="none"
                                value={this.state.email}
                                onChange={(text)=>this.setState({email:text})}
                                selectionColor='gray'
                                keyboardType='email-address'
                                underlineColorAndroid='transparent'/>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textLabel1}>
                            phone number
                        </Text>

                        <View style={styles.ViewShadow
                        }>
                            <TextInput
                                fontSize={14}
                                style={styles.TextInput}
                                placeholder='eg:1234567890'
                                placeholderTextColor='gray'
                                keyboardType={"numeric"}
                                value={this.state.phone_number}
                                onChange={(text)=>this.setState({phone_number:text})}
                                autoCorrect={false} autoCapitalize="none"
                                selectionColor='gray'
                                underlineColorAndroid='transparent'/>
                        </View>
                    </View>


                    <View style={styles.saveButtonContainer}>
                        <TouchableOpacity style={styles.saveButton}
                                          onPress={()=>{this.isValid()}}
                        >
                            <View style={{  flex:1,alignItems: 'center', justifyContent: 'center' }}>

                                <Text style={{ color: '#fff', fontSize:17 ,}}>
                                    Save
                                </Text>
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

    textLabel: {
        margin: 16,
        fontSize: 14,
        color:'#33212D'
    },
    Circle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    text1: { color: '#8F858C', marginLeft: '5%', fontSize: 14 ,width:'80%'},
    text2: {
        width: '30%'
    }
    ,
    FlipToggleButton: {
        height: 30, marginLeft: '5%', marginTop: 10
    },
    seperator: {
        height: 2,
        backgroundColor: 'grey',
        opacity: .3
    },
    subMenu: {

        marginLeft: 20,
        marginRight: 20,
        paddingRight:10,
        backgroundColor: '#fff',
        // opacity:.3,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: '#e55595',
        shadowOpacity: 0.5,
        paddingBottom: 8,
        // paddingTop:8,
        borderRadius: 7

    },
    emailAndNumbercontainer: {
        // flexDirection:'row',
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    clubMemberTextInput: {
        width: '95%',
        marginTop: 5,
        height: 50,
        padding: 10,
        fontSize: 20,
        color: '#999',
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1, },
        shadowColor: '#e55595',
        shadowOpacity: 0.5,

    },
    saveButton:{
        height: 50,
        width:'75%',
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


    ButtonView: {
        backgroundColor: '#e55595',
        height: height * 0.07,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    addressContainer:{
        height:50,
        width: '95%',
        borderWidth: 2,
        borderColor:'#fff',
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2, },
        shadowColor: '#e55595',
        shadowRadius:5,
        shadowOpacity: 0.2,
        elevation:5,
        // alignItems:'center',
        justifyContent:'center',
        paddingLeft: 10,marginBottom:10,
        marginLeft:2
    },
    findMe:{
        position:'absolute',
        height:30,
        width:'20%',
        right:20,
        bottom:10,
        backgroundColor:'#e55595',
        // alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    textLabel1: {
        margin: 15,fontSize:14
    },
    ViewShadow:{
        flexDirection: 'row', marginHorizontal: 15,
        borderColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: '#e55595',

    },

    dropDown:{
        position:'absolute',
        right:10,
        alignSelf: 'center'
    },

    TextInput: {
        flex: 1, height: height * 0.07, backgroundColor: '#FFFFFF', color: 'gray',paddingLeft:10
    },
    switchButtonDesc:{ color: '#8F858C', marginLeft: '5%', fontSize: 14 },
    InformationHeader:{marginLeft:25,marginTop:15}


});

export default EditProfile;