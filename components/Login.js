import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert, Image, StyleSheet, Dimensions } from 'react-native'
import {firebaseApp} from './../components/firebaseConfig'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'ltk1909@gmail.com',
            pass : 'khanh123'
        }
    }
    DangNhap = ()=>{
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
        .then((res)=>{
            console.log('====================================');
            console.log(res,'..............................................');
            console.log('====================================');
            this.props.setIsLogin(true);
            this.props.setEmail(this.state.email);
        })
        .catch(function(error) {
            Alert.alert(
                'Đăng nhập thất bại',
                'Tài khoản hoặc mật khẩu không đúng ',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        });
    }
    
    render() {
        var {height, width} = Dimensions.get('window');
        console.log('====================================');
        console.log(height + "   " + width);
        console.log('====================================');
        return (
            <View style={{paddingTop:50,backgroundColor:'rgba(222,222,222,0.3)'}}>
                <View style={{height:300,alignItems: 'center'}}>
                    <Image style={{width:100,height:100}} source={require('../assets/images/logo.jpg')}/>
                </View>
                
                <View style={{height: 300,alignItems: 'center'}}>
                    <Text style={{fontSize:30, color:"red"}}> Login </Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        placeholder= {'Email'}
                    />
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={pass => this.setState({pass})}
                        value={this.state.pass}
                        secureTextEntry = {true}
                        placeholder= {'Password'}
                    />
                </View>
                <View  style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.button} onPress={()=>this.DangNhap()}>
                        <Text style={{textAlign:"center"}}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.goRegister()}>
                        <Text style={{textAlign:"center"}}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            // <View style={{flex: 1,width:width,height:height,backgroundColor:'red'}}>
            //     <View style={{flex: 1,height:50,width:50, backgroundColor: 'powderblue'}} />
            //     <View style={{flex: 2, backgroundColor: 'skyblue'}} />
            //     <View style={{flex: 3, backgroundColor: 'steelblue'}} />
            //     <Text>abc</Text>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox : {
        height: 40, 
        width:300,
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius:25,
        backgroundColor:'rgba(255,255,255,0.3)',
        paddingHorizontal:16,
        marginTop : 15
    },
    button: {
        backgroundColor:'green',
        color:'red',
        padding:12,
        margin:20,
        textAlign:'center',
        width : 120,
        borderRadius:20,
        height : 50,
        color:'white',
        justifyContent: 'center'
    }
    
})