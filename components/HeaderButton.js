import React, { Component } from 'react';
import { View, TouchableOpacity,Text, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { DrawerActions } from 'react-navigation';

export default class HeaderButton extends Component {
    render() {
        return (
            <View style={styles.button}>
                <TouchableOpacity>
                    <AntDesign.Button style={{ paddingTop: Constants.statusBarHeight, paddingLeft: 20, height: 80 }} size={30} name="bars" backgroundColor="#1eb6fe" color="#fff" onPress={() => { this.props.navigation.dispatch(DrawerActions.openDrawer()); }} >QUIZDANCE APP HELLO</AntDesign.Button>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(30,182,254,0.2)',
        borderBottomColor: 'rgba(30,182,254,0.45)',
        borderBottomWidth: 2.5,
    }
})