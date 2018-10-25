import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    FlatList,
    ImageBackground,
    AsyncStorage,
    Dimensions,
    ScrollView,
    SafeAreaView,
    Platform
} from 'react-native';

import ImageSlider from 'react-native-image-slider';
import StarRating from 'react-native-star-rating';
import MaterialTabs from 'react-native-material-tabs';

import SearchImages from "../components/SearchImages";


var {height, width} = Dimensions.get('window');
var height1 = (((((height / 2) / height) * 100) + 3) / 100) * height;

const images = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
];
export default class SearchDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {
            distance: '1.2 km',
            closingTime: '8 pm',
            starCount: 0,
            selectedTab: 0,businessName:'',
            servicesOffered:[],
            address:'',description:''

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

         this.setState({selectedTab: tab});
    }

    componentDidMount() {
        this.getItem();
        const {state} = this.props.navigation;
        if(state && state.params) {
            this.setState({servicesOffered: state.params.servicesOffered? state.params.servicesOffered: [],
                businessName: state.params.businessName? state.params.businessName: 'Lake View',
                address: state.params.address? state.params.address: '',
                description:state.params.description?state.params.description:''
            })
        }
    }

    Array_Items =
        [
            {title: 'Dog & Cat Boardings'}, {title: 'Pet Supplies'}, {title: 'Dog Grooming'}, {title: 'Daisy'},
        ];
    Pets_details =
        [
            {
                title: 'Add Pet',
                file: require('../assets/onboarding1.png'),
                pets_owner: 'Frances hughes Chow'
            },
            {
                title: 'Tank',
                file: require('../assets/onboarding1.png'),
                pets_owner: 'Frances Hughes Terrier'
            },
            {
                title: 'Bella',
                file: require('../assets/onboarding1.png'),
                pets_owner: 'Adele Ball Retreiver Mut'
            },
            {
                title: 'Daisy',
                file: require('../assets/onboarding1.png'),
                pets_owner: 'Dustin Wilson'
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

    tabView = () => {
        if (this.state.selectedTab === 0) {
            return (
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}
                            style={{width: '100%'}}>
                    <View style={styles.playdatehost}>
                        <Text style={{fontSize: 11, color: 'black'}}>A domesticated animal is any animal that has been tamed and made fit for a human environment by being consistently kept in captivity and selectively bred over a long enough period of time</Text>
                    </View>
                    <Text style={{marginLeft: 20, marginTop: 20, color: 'grey'}}>Services Offered</Text>

                    {this.state.servicesOffered.map((item, key) =>
                        (
                            <View key={key}>

                                <TouchableOpacity style={{flexDirection: 'row'}}>
                                    <View style={styles.bringPetsSrollview}>
                                        <Text style={{
                                            // color: item.color,
                                            fontSize: 10,
                                            marginLeft: 10
                                        }}>{item}</Text>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))
                    }

                    <Text style={{marginHorizontal: 20, marginTop: 20, color: 'grey'}}>Accessibility</Text>
                    <Text style={{
                        fontSize: 10,
                        marginHorizontal: 20,
                    }}>Wheelchair accessible</Text>
                    <Text style={{marginLeft: 20, marginTop: 20, color: 'grey'}}>Pets Playing</Text>
                    <FlatList
                        data={this.Pets_details}
                        renderItem={({item, index}) => (
                            <View style={{
                                marginHorizontal: 20, marginTop: 10, flexDirection: 'row'}}>
                                <Image source={item.file} style={{width: 35, height: 35, borderRadius: 35 / 2}}/>
                                <View>
                                    <Text style={{fontSize: 12, marginHorizontal: 10,}}>{item.title}</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        marginHorizontal: 10,
                                        color: 'grey'
                                    }}>{item.pets_owner}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </ScrollView>
            );
        }
        if (this.state.selectedTab ===2){
            return(
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}
                            style={{width: '100%'}}>
                    <FlatList
                        data={this.Pets_details}
                        renderItem={({item, index}) => (
                            <View style={{
                                marginTop: 10,}}>
                                <View style={{marginTop: 10,  marginHorizontal: 20,marginRight: 10,flexDirection:'row', }}>
                                    <View style={{width:'70%'}}>
                                    <Text style={{fontSize: 12,textAlign: 'left'}}>{item.title}</Text>
                                    </View>
                                    <View style={{width:'30%'}}>
                                        <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        starSize={15}
                                        starColor={'#fff'}
                                        fullStarColor={'#e55595'}
                                    />
                                    </View>
                                </View>
                                <View style={{marginTop: 10, marginHorizontal: 20}}>
                                    <Text style={{fontSize: 11, color: 'grey'}}>Lorem Ipsum is simply dummy text of the printing
                                        and
                                        typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                        1500s, when an unknown printer took a galley of type and scrambled it to make a type
                                        specimen book. It has survived not only five centuries.</Text>
                                </View>
                                <View style={{width:'100%',height:2,marginTop:10,backgroundColor:'grey',opacity:0.2}}></View>

                            </View>

                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </ScrollView>
            )
        }
        if (this.state.selectedTab ===3) {

            return(<ScrollView showsHorizontalScrollIndicator={false} horizontal={false}>
                <SearchImages/>
            </ScrollView>);

        }
        if (this.state.selectedTab ===1) {
            return(<ScrollView showsHorizontalScrollIndicator={false} horizontal={false}
                               style={{width: '100%'}}>
                    <View style={{marginHorizontal: 20, height:70,flexDirection:'row',alignItems:'center',}}>
                        <Image
                            source={require('../assets/addressIcon.png')}/>
                        <Text style={{ fontSize: 14, color: '#e55595', alignItems: 'center',marginLeft:40}}>
                            {this.state.address}
                        </Text>

                    </View>
                    <View style={{width:'100%',height:2,backgroundColor:'grey',opacity:0.2}}></View>
                    <View style={{marginHorizontal: 20, height:70,flexDirection:'row',alignItems:'center',}}>
                        <Image
                            source={require('../assets/phoneIcon.png')}/>
                        <Text style={{ fontSize: 14, color: '#e55595', alignItems: 'center',marginLeft:40}}>
                            (123) 456-7890
                        </Text>
                    </View>
                    <View style={{width:'100%',height:2,backgroundColor:'grey',opacity:0.2}}></View>
                    <View style={{marginHorizontal: 20, height:70,flexDirection:'row',alignItems:'center',}}>
                        <Image
                            source={require('../assets/websiteIcon.png')}/>
                        <Text style={{ fontSize: 14, color: '#e55595', alignItems: 'center',marginLeft:40}}>
                           www.barknlounge.com
                        </Text>
                    </View>
                    <View style={{width:'100%',height:2,backgroundColor:'grey',opacity:0.2}}></View>
                    <View style={{marginHorizontal: 20, height:70,flexDirection:'row',alignItems:'center',}}>
                        <Image
                            source={require('../assets/emailIcon.png')}/>
                        <Text style={{ fontSize: 14, color: '#e55595', alignItems: 'center',marginLeft:40}}>
                           info@barknlounge.com
                        </Text>
                    </View>
                    <View style={{width:'100%',height:2,backgroundColor:'grey',opacity:0.2}}></View>



                </ScrollView>
            );
        }
    }

    render() {
        const {goBack} = this.props.navigation;


        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.imagesliderContainer}>
                    <ImageSlider
                        loopBothSides
                        images={images}
                        customSlide={({index, item, style, width}) => (
                            // It's important to put style here because it's got offset inside
                            <View key={index} style={[style, styles.customSlide]}>
                                <ImageBackground source={{uri: item,cache: 'force-cache'}} style={styles.customImage}/>
                            </View>
                        )}

                    />
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.iconLeftStyle}
                                          onPress={() => {
                                              Keyboard.dismiss();
                                             goBack();
                                          }}>
                            <Image style={styles.backButton} source={require('../assets/backIcon.png')}/>
                        </TouchableOpacity>
                        <Text style={{height: 40, fontSize: 18, color: '#e55595', alignItems: 'center'}}>

                        </Text>
                        <TouchableOpacity style={[styles.iconRightStyle, {bottom: 5}]}>
                            <Image source={require('../assets/notificationIcon.png')}/>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.content2}>
                    <View style={{flex: 3, paddingLeft: 20}}>
                        <Text style={{color: '#fff',fontSize:12}}>
                            {this.state.businessName}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: '#fff', fontSize: 10, marginTop: 10}}>
                                Boarding
                            </Text>
                            <Text style={{color: '#fff', fontSize: 10, marginTop: 10, marginLeft: 15}}>
                                {this.state.distance}
                            </Text>
                            <Text style={{color: '#fff', fontSize: 10, marginTop: 10, marginLeft: 15}}>
                                Closes{this.state.closingTime}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#fff', fontSize: 10, marginTop: 10, marginLeft: 15}}>
                            {this.state.starCount}.0
                        </Text>
                        <View style={{marginTop: 10, marginRight: 10}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={15}
                                emptyStarColor={'white'}
                                starColor={'white'}
                                fullStarColor={'white'}
                            />
                        </View>
                    </View>

                </View>
                <View style={styles.Tabs}>
                    <MaterialTabs
                        items={['Details','Contacts', 'Reviews', 'Photos']}
                        selectedIndex={this.state.selectedTab}
                        onChange={this.setTab.bind(this)}
                        barColor="white"
                        textStyle={{fontSize:10}}
                        indicatorColor="#EF5595"
                        activeTextColor="#EF5595"
                        inactiveTextColor="#33212D"
                    />
                </View>
                <View style={{flex: 1}}>
                    {this.tabView()}
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
        height: '45%'
    },
    slider: {backgroundColor: '#000', height: 350},
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
        flexDirection: 'row'
    },
    contentText: {color: '#fff'},
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
        position: 'absolute',
        alignItems: 'center',

        // justifyContent: 'flex-end',
        height: 60, elevation: 5,
        top: 10, left: 10,
        backgroundColor: 'red'
    },
    backButton: {
        height: '50%',
        width: '15%',
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
    bringPetsSrollview: {
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 10
    },
    playdatehost: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10
    },
    addPicture: {
        position: 'absolute',
        right: 10,
        backgroundColor: '#fff',
        height: 30,
        width: 30,
        borderWidth: 30,
        borderRadius: 30,
        borderColor: '#fff',
        bottom: height1,

    }
});