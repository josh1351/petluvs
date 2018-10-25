import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../../screens/HomeScreen';
import HotSpotsScreen from '../../screens/HotSpotsScreen';
import ServicesScreen from '../../screens/ServicesScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import EditProfile from '../../screens/Profile/EditProfile';
import PlaydateCreation from "../../screens/Playdate/PlaydateCreation";
import PlaydateDetails from "../../screens/Playdate/PlaydateDetails";
import QuickActions from "../QuickActions";
import SearchDetails from "../../screens/SearchDetails";
import Website from "../../screens/Website";
import PlaydateItem from "../PlaydateItem";
import CreateBreederEvent from "../../screens/CreateBreederEvent";
import AddPet from "../../screens/AddPet";
import BreederInformation from "../../screens/BreederInformation";
import PetProfile from "../../screens/Profile/PetProfile"



const TabBar = new createBottomTabNavigator({

      Home: { screen: HomeScreen },
      HotSpots: { screen: HotSpotsScreen,},
        ActionModal: {
            screen: () => null, // Empty screen
            navigationOptions: ({navigation}) => ({
                tabBarIcon:
                    <View >
                          <QuickActions navigation={navigation}/>
                    </View>
            })
        },
      Services: { screen: ServicesScreen },
      Profile: { screen: ProfileScreen },
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home`;
                } else if (routeName === 'HotSpots') {
                    iconName = `paw`;
                } else if (routeName === 'ActionModal') {
                    iconName = `plus`;

                }
                else if (routeName === 'Services') {
                    iconName = `tags`;
                } else if (routeName === 'Profile') {
                    iconName = `user`;
                }
                let iconSize;
                if (routeName === 'Home') {
                    iconSize = 25;
                } else if (routeName === 'HotSpots') {
                    iconSize = 25;
                } else if (routeName === 'ActionModal') {
                    iconSize = 50;
                } else if (routeName === 'Services') {
                    iconSize = 25;
                } else if (routeName === 'Profile') {
                    iconSize = 25;
                }
if(routeName==='Services'){
    // return(<Icon name='home' size={iconSize} color={tintColor}/>);
    return(<Image style={{tintColor:tintColor}}
        source={require('../../assets/servicesInactive.png')}
        resizeMode='contain' />)
}
if(routeName==='HotSpots'){
                    // return(<Icon name='home' size={iconSize} color={tintColor}/>);
                    return(<Image style={{tintColor:tintColor}}
                                  source={require('../../assets/hotspotsInactive.png')}
                                  resizeMode='contain' />)
                }
else{
    return(<Icon name={iconName} size={iconSize} color={tintColor}/>);
}


            },
        }),
        tabBarOptions: {
            activeTintColor: '#56C1EF',
            inactiveTintColor: '#D9D6D8',
            showLabel: false,
            lazyLoad: true,
            style: {
                backgroundColor: 'white',
                borderTopWidth: 0,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: -2},
                shadowOpacity: 0.05,
                shadowRadius: 15,
            },
        },
    }

  );

export default routeNavigator = createStackNavigator({
    tabBar: {
        screen: TabBar,
        headerMode: 'none', navigationOptions: {header: null,  gesturesEnabled: false}
        },
    AddPet:{
        screen:AddPet
    },
    Website:{
        screen:Website
    },
    EditProfile: {screen: EditProfile},
    PlaydateDetails: {screen: PlaydateDetails},
    PlaydateCreation: {screen: PlaydateCreation},
    CreateBreederEvent:{screen:CreateBreederEvent},
    SearchDetails: {screen: SearchDetails},
    BreederInformation:{screen:BreederInformation},
    Services: { screen: ServicesScreen },
    PetProfile:{screen:PetProfile},
    PlaydateItem: {screen: PlaydateItem}},{
    headerMode: 'none', navigationOptions: {headerVisible: false,  gesturesEnabled: false,}

});

