import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { DrawerActions } from 'react-navigation';

export default class HeaderButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <FontAwesome.Button style={{ paddingTop: Constants.statusBarHeight, paddingLeft: 20 }} size={30} name="bars" backgroundColor="#ccc" color="black" onPress={() => { this.props.navigation.dispatch(DrawerActions.openDrawer()); }} />
                </TouchableOpacity>
            </View>
        )
    }
}
