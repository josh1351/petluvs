import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    AsyncStorage, FlatList,
    Button,
    TouchableOpacity, ImageBackground, Dimensions
} from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import GeneralStyles from '../../Styles/General';
import Header from "../../components/Header";
import PlaydateItem from "../../components/PlaydateItem";
import ReviewItem from '../../components/ReviewItem';
import {ImagePicker, Permissions} from "expo";
var {height, width} = Dimensions.get('window');

import { fetchAllPets } from '../../store/actions';


class ProfileScreen extends React.Component {

    static navigationOptions = {
        header: null, gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            name: '',
            picture: ''
        }
    }

    setTab = selectedTab => {
        this.setState({ selectedTab });
    };
    Array_Items =
        [
            {
                Name: 'Tommy',
                Image: require('../../assets/PetImage.png'),
                Type: 'Pug / Boston Terrier'
            }, {
            Name: 'Tank',
            Image: require('../../assets/PetImage.png'),
            Type: 'Pug / Boston Terrier'
        }, {
            Name: 'Bella',
            Image: require('../../assets/PetImage.png'),
            Type: ''
        }, {
            Name: 'Daisy',
            Image: require('../../assets/PetImage.png'),
            Type: ''
        }, {
            Name: 'Buddy',
            Image: require('../../assets/PetImage.png'),
            Type: ''

        }, {
            Name: 'Lucy',
            Image: require('../../assets/onboarding1.png'),
            Type: ''
        },];


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

    componentDidMount() {
       this.forceUpdate();
        this.getItem();
        this.props.fetchAllPets();
    }


    getItem = async () => {
        try {
            let myname = await AsyncStorage.getItem('name');
            let profileImage = await AsyncStorage.getItem('picture');
            this.setState({name: myname});
            this.setState({picture: profileImage});
        } catch (error) {
            console.log("Error", error)
        }
    }

    selectedTab() {
        if (this.state.selectedTab == 0) {
            return (

                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        flexWrap: 'wrap',
                        overflow: 'visible',
                        justifyContent: 'space-between'
                    }}>
                        <FlatList
                            data={this.Array_Items}
                            numColumns={2}
                            renderItem={({item, index}) => (
                                <View style={styles.MainView}>
                                    <TouchableOpacity   onPress={() => this.props.navigation.navigate("PetProfile",
                                        { name: item.Name ,
                                            type:item.Type,image:item.Image})}>
                                    <ImageBackground resizeMode='cover' style={styles.PetImage} source={item.Image}>
                                        <Text style={styles.PetName}>{item.Name}</Text>
                                        <Text style={styles.PetType}>{item.Type}</Text>
                                    </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
            )
        }
        if (this.state.selectedTab == 1) {
            return (
                <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>

                    <PlaydateItem Name='Frances Hughes' TimeLeft='36' Location='Lake Lane Park' MilesAway='5.6'/>
                    <PlaydateItem Name='Nelle Pope' TimeLeft='45' Location='Linwoodside Dog Park' MilesAway='2'/>
                    <PlaydateItem Name='Bob Snyder' TimeLeft='12' Location='Winchester Grove Park' MilesAway='1.2'/>
                    <PlaydateItem Name='Shelby Smith' TimeLeft='23' Location='Pups N Cups Icecream' MilesAway='5.6'/>
                </ScrollView>
            )
        }
        if (this.state.selectedTab == 2) {
            return (
                <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
                    <ReviewItem Name='Walter Campbell' BusinessName='Pup Suds Pet Grooming'
                                ReviewText="Works perfectly."/>
                    <ReviewItem Name='Loretta French' BusinessName='The Pawsitive Co'
                                ReviewText="I love that I get a nice looking collar and it also helps to feed another animal all at the same time."/>
                    <ReviewItem Name='Walter Campbell' BusinessName='Pup Suds Pet Grooming'
                                ReviewText="Works perfectly."/>
                    <ReviewItem Name='Loretta French' BusinessName='The Pawsitive Co'
                                ReviewText="I love that I get a nice looking collar and it also helps to feed another animal all at the same time."/>
                    <ReviewItem Name='Walter Campbell' BusinessName='Pup Suds Pet Grooming'
                                ReviewText="Works perfectly."/>
                    <ReviewItem Name='Loretta French' BusinessName='The Pawsitive Co'
                                ReviewText="I love that I get a nice looking collar and it also helps to feed another animal all at the same time."/>
                </ScrollView>
            )
        }
    }

    async clearStorage() {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate("LoginScreen");
        } catch (error) {
        }
    }

    render() {
        console.log(this.props.pets);
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>

                <Header navigation={this.props.navigation} title={'Personal Profile'}/>
                <TouchableOpacity

                    onPress={() => this.props.navigation.navigate("EditProfile")}
                >
                    {/*<Text style={{fontSize: 16, textAlign: 'right', margin: 15, color: '#e55595'}}> Edit Profile </Text>*/}


                    <View style={{
                        alignItems: 'center',
                        paddingBottom: 20,
                        backgroundColor: 'white',
                        zIndex: 999,
                    }}>

                        <View style={styles.Circle}>
                            <Image
                                style={{width: 100, height: 100,}}
                                source={require('../../assets/profile.png')}/>
                        </View>
                        <Text style={{fontSize: 18, color: '#33212D'}}>
                            frances Hughes
                        </Text>
                        <TouchableOpacity
                            style={{width: 50, height: 20}}
                            onPress={() => this.clearStorage()}>
                            <Text>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>


                <SafeAreaView style={styles.Tabs}>
                    <MaterialTabs
                        items={['Pets', 'Playdates', 'Reviews',]}
                        selectedIndex={this.state.selectedTab}
                        onChange={this.setTab}
                        barColor="white"
                        indicatorColor="#EF5595"
                        activeTextColor="#EF5595"
                        inactiveTextColor="#33212D"
                    />
                </SafeAreaView>

                <View style={GeneralStyles.ScreenContainer}>
                    {this.selectedTab()}
                </View>
                </ScrollView>
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
        marginBottom: 20,
    },
    MainView: {
        height: (width/2.3),
        width: (width/2.3),
        borderRadius: 6,margin:4,
        overflow: 'hidden',
    },
    Tabs: {
        borderTopColor: 'rgba(217, 214, 216, .2)', borderTopWidth: 2, borderStyle: 'solid', zIndex: 9999, marginTop: -2,
    }, PetName: {
        fontSize: 18,
        color: 'white',

    },
    PetType: {
        fontSize:  12,
        color: 'white',
        opacity: .75,
        marginBottom:5
    },
    PetImage: {
        width: 170,
        height: 170,
        justifyContent: 'flex-end',
        padding:10,
    },

});

const mapStateToProps = (state) => {
    return {
        pets: state.pets.pets
    }
}

export default connect(mapStateToProps, { fetchAllPets })(ProfileScreen);