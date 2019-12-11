import React, { Component } from 'react'
import {  View } from 'react-native'
import Register from '../components/Register';
import Login from '../components/Login';

export default class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: "login"
        }
    }

    goLogin = ()=>{
        this.setState({form:'login'})
    }
    goRegister = ()=>{
        this.setState({form:'register'})
    }
    
    render() {
        if (this.state.form ==='login'){
            return (
                <View style={{flex: 1}}>
                    <Login setEmail = {this.props.setEmail} goRegister={this.goRegister} setIsLogin = {this.props.setIsLogin}/>
                </View>
            )
        }
        else {
            return (
                <View style= {{flex: 1}}>
                    <Register goLogin= {this.goLogin}/>
                </View>
            )
        }
    }
}
