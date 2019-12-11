import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { firebaseApp } from '../components/firebaseConfig.js';
import { FlatList } from 'react-native-gesture-handler';
import User from '../User';

export default class Test extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title")
        }
    }

    componentWillUnmount(){
        return;
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <View>
                <Text>TEST screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
