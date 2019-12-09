import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Test extends Component {
    constructor(props) {
        super(props);

    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam("test")
        }
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
