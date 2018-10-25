import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Text,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';





class QuickActions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pressStatus: false,petProfile:false,breeder:''};
        this.breeder='';
        this.updateArray();
    }
    updateArray=async()=>{
        try {
            var myArray1 = await AsyncStorage.getItem('@MySuperStore1:key');
            if (myArray1 !== null) {
                // We have data!!
                this.setState({breeder:JSON.parse(myArray1)});
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    onToggleActions = () => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            pressStatus: !this.state.pressStatus
        });
    }
    getItem = async () => {
        try {
            let myname = await AsyncStorage.getItem('breeder');

            this.setState({petProfile: myname});
            // alert(this.state.petProfile)
        } catch (error) {
            console.log("Error", error)
        }
    }
    componentDidMount(){
        this.getItem();
    }
    navigateToPetServices=()=>{
        (this.state.breeder===true)? [this.props.navigation.navigate("CreateBreederEvent"),this.onToggleActions()]:
        [this.props.navigation.navigate("Services"),this.onToggleActions()]
    }
iconText=()=>{
        // if(this.myArray.length===1 && this.myArray[0]==='Animal Breeder Information'){
        if(this.state.breeder===true){
            return(
                <Text style={{
                    color: 'white', paddingTop: 70,
                    position: 'absolute',textAlign:'center',
                    zIndex: 999,fontSize:12
                }}>
                    Create{"\n"}
                    Breeder Event
                    {/*{this.myArray}*/}
                </Text>
            )}
            else{
            return(
                <Text style={{
                    color: 'white', paddingTop: 70,
                    position: 'absolute',textAlign:'center',
                    zIndex: 999,fontSize:12
                }}>
                    Find{"\n"}
                     Pet Services

                </Text>
            );

        }


}

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}} pointerEvents='box-none'>
                <View style={{flex: 1, justifyContent: 'flex-end', zIndex: 99}} pointerEvents='box-none'>
                    <TouchableOpacity
                        activeOpacity={1}
                        // onPress={this.onToggleActions}
                        style={(this.state.pressStatus) ? [styles.ActionButton, styles.ActionButtonActive] : styles.ActionButton}
                    >
                        <Icon name='plus' size={50} color='white'
                       onPress={this.onToggleActions}
                       style={(this.state.pressStatus) ? [styles.ActionPlusActive] : styles.ActionPlus}
                       />


                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("PlaydateCreation"),this.onToggleActions()}}
                    style={(this.state.pressStatus) ? [styles.ActionItem, styles.ActionItem1,] : styles.ActionItem}
                >

                    <Image source={require('../assets/createPlaydateButton.png')}/>
                    <Text style={{
                        color: 'white', paddingTop: 40,
                        position: 'absolute',
                        zIndex: 999,fontSize:12
                    }}>
                        Create Playdate
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        {
                            
                           this.navigateToPetServices()
                        }
                }}
                                  style={(this.state.pressStatus) ? [styles.ActionItem, styles.ActionItem2, {paddingBottom: 20}] : styles.ActionItem}
                >
                    <Image style={{alignSelf: 'center', marginTop: 40}}
                           source={require('../assets/createBreederEventButton.png')}/>
                    {this.iconText()}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        {
                            this.props.navigation.navigate("AddPet"),this.onToggleActions();
                        }}}
                    style={(this.state.pressStatus) ? [styles.ActionItem, styles.ActionItem3, {paddingBottom: 20}] : styles.ActionItem}
                >
                    <Image style={{alignSelf: 'center', marginTop: 60}} source={require('../assets/addPetIcon.png')}/>
                    <Text style={{
                        color: 'white', paddingTop: 60,
                        position: 'absolute',fontSize:12,
                        zIndex: 999,
                    }}>
                        Add Pet
                    </Text>
                </TouchableOpacity>
                <View
                    pointerEvents='box-none'
                    onPress={this.onToggleActions}
                    style={(this.state.pressStatus) ? [styles.ActionOverlay, styles.ActionOverlayActive] : styles.ActionPlus}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    ActionButton: {
        backgroundColor: '#EF5595',
        width: 85,
        height: 85,
        borderTopRightRadius: 42,
        borderTopLeftRadius: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        shadowColor: '#EF5595',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.58,
        shadowRadius: 10,
        zIndex: 99,
        alignSelf: 'center',
    },
    ActionButtonActive: {
        height: 110,
        justifyContent: 'flex-start',
        paddingTop: 17,
    },
    ActionPlusActive: {
        transform: ([{rotateX: '30deg'}, {rotateZ: '0.785398rad'}]),
        overflow: 'visible'
    },
    ActionOverlay: {
        flex: 1,
        width: 1000,
        height: 1000

    },
    ActionOverlayActive: {
        flex: 1, position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    ActionItem: {
        width: 0,
        height: 0,
        backgroundColor: 'white',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 999,
        display: 'none',
    },
    ActionItem1: {
        display: 'flex',
        transform: ([{translateX: -110}, {translateY: -110}]),
    },
    ActionItem2: {
        display: 'flex',
        transform: ([{translateY: -160}]),
    },
    ActionItem3: {
        display: 'flex',
        transform: ([{translateX: 110}, {translateY: -110}]),
    }
});

export default QuickActions;


 