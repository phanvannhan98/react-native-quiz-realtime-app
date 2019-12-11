import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import Playquiz from '../../components/Quiz/Playquiz'

export default class QuizTestScreen extends Component {
    render() {
        return (
                <Playquiz goBack = {this.props.goBack}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:100
    }
})