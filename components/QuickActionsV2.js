import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, LayoutAnimation, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


class QuickActionsV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pressStatus: false };
    }

    componentWillMount() {
        //Action Button
        this.actionButtonAnimateHeight = new Animated.Value(85);
        this.actionButtonPlusAnimateRotation = new Animated.Value(0);

        //Action Item One
        this.actionOneAnimateHorizontal = new Animated.Value(0);
        this.actionOneAnimateVertical = new Animated.Value(50);

        //Action Item Two
        this.actionTwoAnimateVertical = new Animated.Value(50)

        //Action Item Three
        this.actionThreeAnimateHorizontal = new Animated.Value(0);
        this.actionThreeAnimateVertical = new Animated.Value(50);

        //Action Overlay
        this.actionOverlayAnimateOpacity = new Animated.Value(0);
    }

    onActionPress = () => {
        Animated.parallel([
            //Action Button
            Animated.spring(this.actionButtonAnimateHeight, {
                toValue: 110,
                friction: 2,
            }),
            Animated.spring(this.actionButtonPlusAnimateRotation, {
                toValue: 1,
                friction: 2,
            }),

            //Action Item One
            Animated.spring(this.actionOneAnimateHorizontal, {
                toValue: -110,
                mass: 3,
                delay: 150,
            }),
            Animated.spring(this.actionOneAnimateVertical, {
                toValue: -110,
                mass: 3,
                delay: 150,
            }),

            //Action Item Two
            Animated.spring(this.actionTwoAnimateVertical, {
                toValue: -160,
                mass: 3,
                delay: 300,
            }),

            //Action Item Three
            Animated.spring(this.actionThreeAnimateHorizontal, {
                toValue: 110,
                mass: 3,
                delay: 450,
            }),
            Animated.spring(this.actionThreeAnimateVertical, {
                toValue: -110,
                mass: 3,
                delay: 450,
            }),

            //Action Overlay
            Animated.timing(this.actionOverlayAnimateOpacity, {
                toValue: 1,
                duration: 500,
            })
        ]).start();
    }
    onToggleActions = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            pressStatus: !this.state.pressStatus
        });

    }
    render() {
        //Action Button
        const animateActionButton = {
            height: this.actionButtonAnimateHeight
        }
        const animateActionButtonPlus = this.actionButtonPlusAnimateRotation.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '135deg']
        })

        //Action Item One
        const animateActionItem1 = {
            transform: [
                {translateX: this.actionOneAnimateHorizontal},
                {translateY: this.actionOneAnimateVertical},
            ]
        }

         //Action Item Two
         const animateActionItem2 = {
            transform: [
                {translateY: this.actionTwoAnimateVertical},
            ]
        }

        //Action Item Three
        const animateActionItem3 = {
            transform: [
                {translateX: this.actionThreeAnimateHorizontal},
                {translateY: this.actionThreeAnimateVertical},
            ]
        }

        //Action Overlay
        const animateActionOverlay = {
            opacity: this.actionOverlayAnimateOpacity
        }

        return (
            <View style={{flex:1, justifyContent: 'flex-end', alignItems:'center'}} pointerEvents='box-none'>

                <Animated.View
                    pointerEvents='box-none'
                    style={[styles.ActionOverlay, animateActionOverlay]}
                />

                <TouchableOpacity style={[styles.ActionItem, animateActionItem1]}>
                    <Icon name='calendar' size={40} color='#EF5595'/>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.ActionItem, animateActionItem2]}>
                    <Icon name='folder' size={40} color='#EF5595'/>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.ActionItem, animateActionItem3]}
                                  onPress={this.onToggleActions}
                >
                    <Icon name='plus-circle' size={40} color='#EF5595'/>
                </TouchableOpacity>

                <Animated.View style={[styles.actionButtonWrap, animateActionButton]} pointerEvents='box-none'>
                    <TouchableOpacity
                        onPress={this.onActionPress}
                        activeOpacity={1}
                        style={styles.ActionButton}
                    >
                        <Animated.View style={{transform: [{rotate: animateActionButtonPlus}] }}>
                            <Icon name='plus' size={50} color='white'style={styles.ActionPlus} />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    ActionButtonWrap: {
        flex:1,
        justifyContent: 'flex-end',
        zIndex:99,
        height: 85,
        width: 85,
    },
    ActionButton: {
        backgroundColor: '#EF5595',
        width: 85,
        height: '100%',
        borderTopRightRadius: 42,
        borderTopLeftRadius: 42,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 0,
        shadowColor: '#EF5595',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.58,
        shadowRadius: 10,
        zIndex:99,
        alignSelf: 'center',
        paddingTop: 17,
    },
    ActionOverlay: {
        flex: 1,
        zIndex:-1,
        position: 'absolute',
        right:0,
        left:0,
        top:0,
        bottom:0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.65)',
    },
    ActionItem: {
        width:80,
        height:80,
        backgroundColor:'white',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex:-1,
    },
    ActionItem1: {
        display:'flex',
        transform: ([{ translateX: -110 }, { translateY: -110 }]),
    },
    ActionItem2: {
        display:'flex',
        transform: ([{ translateY: -160 }]),
    },
    ActionItem3: {
        display:'flex',
        transform: ([{ translateX: 110 }, { translateY: -110 }]),
    }
});

export default QuickActionsV2;