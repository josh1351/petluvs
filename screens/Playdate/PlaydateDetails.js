import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    ActivityIndicator,
    TextInput,
    ImageBackground,
    AsyncStorage,
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    TouchableHighlight,
    Platform
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions,StackActions} from 'react-navigation';
import Header from "../../components/Header";
import ImageSlider from 'react-native-image-slider';
import StarRating from 'react-native-star-rating';
import StarButton from "react-native-star-rating/StarButton";
import MaterialTabs from 'react-native-material-tabs';


var {height, width} = Dimensions.get('window');
var height1=(((((height/2)/height)*100)+3)/100)*height;

export default class PlaydateDetails extends Component {


    constructor(props){
        super(props);
        this.state={
            distance:'1.2 km',
            closingTime:'8 pm',
            starCount: 3.5,
            selectedTab:0,
        }
    }

    static navigationOptions = {
        header: null,  gesturesEnabled: false,
    };
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    setTab(tab) {
        this.setState({});
        // this.setState({selectedTab: tab});


    }
\
    componentDidMount() {
        this.getItem();

    }
    Array_Items =
        [
            {
                title: 'Tommy',
                file: require('../../assets/onboarding1.png'),
                color: "gray",
                location:'Lake Lane Park'
            },
            {
                title: 'Tank',
                file: require('../../assets/onboarding1.png'),
                color: "gray",
                location:'Linwoodside Dog Park'
            },
            {
                title: 'Bella',
                file: require('../../assets/onboarding1.png'),
                color: 'gray',
                location:'Winchester Grove Park'
            },
            {
                title: 'Daisy',
                file: require('../../assets/onboarding1.png'),
                color: 'gray',
                location:'Linwoodside Dog Park'
            },
            {
                title: 'Buddy',
                file: require('../../assets/onboarding1.png'),
                color: 'gray',
                location:'Winchester Grove Park'
            },
            {
                title: 'Lucy',
                file: require('../../assets/onboarding1.png'),
                color: 'gray',
                location:'Pups N Cups Icecream'
            },

        ];

    getItem = async () => {
        try {
            let myname = await AsyncStorage.getItem('name');
            let profileImage = await AsyncStorage.getItem('picture');
            this.setState({name: myname});
            this.setState({picture: profileImage});


        } catch (error) {
            console.log("Error", error)
        }
    };

    tabView=()=>{
        if(this.state.selectedTab===0){
            return(
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}
                            style={{ width: '100%' }}>
                    <View style={styles.playdatehost}>
                        <Image source={require('../../assets/onboarding1.png')} style={{ width: 40, height: 40, borderRadius:40/2}} />
                        <View style={{alignItems:'center'}}>
                            <Text style={{marginLeft:20,marginTop:5}}>Frances Hughes</Text>
                            <Text style={{fontSize:10,color:'grey'}}>Playdate host</Text>
                        </View>
                    </View>
                    <Text style={{marginLeft:20,marginTop:10,color:'grey'}}>Pets Attending</Text>
                    {this.Array_Items.map((item, key) =>
                        (
                            <View key={key}>

                                <TouchableOpacity >
                                    <View style={styles.bringPetsSrollview}>
                                        <Image source={item.file} style={{ width: 30, height: 30, borderRadius:30/2 }} />
                                        <View>
                                            <Text style={{ color: item.color,fontSize:10,marginLeft:10 }}>{item.title}</Text>
                                            <Text style={{ color: item.color,fontSize:10,alignSelf: 'center',marginLeft:10 }}>{item.location} </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
            );
        }

        return(
            <View>
                <View style={{height:'10%',width:'100%',justifyContent:'flex-end'}}>
                    <Text style={{fontSize:20,marginLeft:'5%'}}>
                        American Kennel Club Number
                    </Text>
                </View>
            </View>
        );

    }


    render() {
        const {goBack} = this.props.navigation;
        const images = [
            'https://placeimg.com/640/640/nature',
            'https://placeimg.com/640/640/people',
            'https://placeimg.com/640/640/animals',
            'https://placeimg.com/640/640/beer',
        ];

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.imagesliderContainer}>

                    <ImageSlider
                        loopBothSides
                        // autoPlayWithInterval={3000}
                        images={images}
                        customSlide={({index, item, style, width}) => (
                            // It's important to put style here because it's got offset inside
                            <View key={index} style={[style, styles.customSlide]}>
                                <ImageBackground source={{uri: item}} style={styles.customImage}/>
                            </View>
                        )}

                    />
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.iconLeftStyle}
                                          onPress={() => {
                                              Keyboard.dismiss();
                                              goBack();
                                          }}>
                            <Image style={styles.backButton}source={require('../../assets/backIcon.png')}/>
                        </TouchableOpacity>
                        <Text style={{height: 40, fontSize: 18, color: '#e55595', alignItems: 'center'}}>

                        </Text>
                        <TouchableOpacity style={[styles.iconRightStyle, {bottom: 5}]} >
                            <Image source={require('../../assets/notificationIcon.png')}/>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.content2}>
                    <View style={{flex:3,paddingLeft: 20}}>
                        <Text style={{color:'#fff'}}>
                            Lake Lan Park
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#fff',fontSize:10,marginTop: 10}}>
                                Boarding
                            </Text>
                            <Text style={{color:'#fff',fontSize:10,marginTop: 10,marginLeft:15}}>
                                {this.state.distance}
                            </Text>
                            <Text style={{color:'#fff',fontSize:10,marginTop: 10,marginLeft:15}}>
                                Closes{this.state.closingTime}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{color:'#fff',fontSize:10,marginTop: 10,marginLeft:15}}>
                            {this.state.starCount}.0
                        </Text>
                        <View style={{marginTop: 10,marginRight:10}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={15}
                                starColor={'#fff'}
                                fullStarColor={'white'}
                            />
                        </View>
                    </View>

                </View>
                <View style={styles.Tabs}>
                    <MaterialTabs
                        items={['Playdate Details', 'Messaging']}
                        selectedIndex={this.state.selectedTab}
                        onChange={this.setTab.bind(this)}
                        barColor="white"
                        indicatorColor="#EF5595"
                        activeTextColor="#EF5595"
                        inactiveTextColor="#33212D"
                    />
                </View>
                <View style={{flex:1}}>
                    {this.tabView()}
                </View>
                <View style={styles.addPicture}>

                    <Image source={require('../../assets/joinPlaydateIcon.png')} style={{ position:'absolute',left:-13,top:-10,width: 30, height: 30,}} />

                </View>
            </SafeAreaView>
        )

    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    imagesliderContainer: {
        height:'45%'
    },
    slider: { backgroundColor: '#000', height: 350 },
    content1: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content2: {
        width: '100%',
        height: '10%',
        // marginTop: 10,
        backgroundColor: '#e55595',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    contentText: { color: '#fff' },
    buttons: {
        zIndex: 1,
        height: 15,
        // marginTop: -25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        margin: 3,
        width: 15,
        height: 15,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
        opacity: 1,
        color: 'red',
    },
    customSlide: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: '100%',
        height: '100%',
    },
    Tabs: {
        borderTopColor: 'rgba(217, 214, 216, .2)',
        borderTopWidth: 2,
        borderStyle: 'solid',
        zIndex: 9999,
        marginTop: -2,
    },
    header: {
        position:'absolute',
        alignItems: 'center',

        // justifyContent: 'flex-end',
        height: 60, elevation:5,
        top:10, left:10,
        backgroundColor:'red'
    },
    backButton:{
        height:'50%',
        width:'15%',
    },
    title: {
        height: 40,
        fontSize: 20,
        color: '#e55595'
    },
    iconRightStyle: {
        position: 'absolute', right: 10, bottom: Platform.OS === 'ios' ? 2 : 0,//-3:0
        width: 50, height: 40, alignItems: 'center', justifyContent: 'center'
    },
    iconLeftStyle: {
        position: 'absolute', left: 0, bottom: 5, zIndex: 2,
        width: 50, height: 40, alignItems: 'center', justifyContent: 'center'
    },
    bringPetsSrollview:{
        marginLeft: 20,
        flexDirection:'row',
        marginTop:10
    },
    playdatehost:{
        flexDirection:'row',
        marginLeft:20,
        marginTop:10
    },
    addPicture:{
        position:'absolute',
        right:10,
        backgroundColor:'#fff',
        height:30,
        width:30,
        borderWidth:30,
        borderRadius:30,
        borderColor:'#fff',
        bottom:height1,

    }
});