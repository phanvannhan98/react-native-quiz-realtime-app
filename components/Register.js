import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert, Image, StyleSheet} from 'react-native'
import {firebaseApp} from './../components/firebaseConfig'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            pass:""
        }
    }
    DangKy = ()=>{
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
        .then(()=>{
            Alert.alert(
                'Đăng ký thành công',
                'Chào mừng bạn ^^ '+this.state.email,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            this.props.goLogin();
        })
        .catch(function(error) {
            Alert.alert(
                'Đăng ký không thành công',
                'Email đã tồn tại hoặc input không hợp lệ',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
          });
    }
    render() {
        return (
            <View style={{paddingTop:50,backgroundColor:'rgba(222,222,222,0.3)'}}>
                <View style={{height:300,alignItems: 'center'}}>
                    <Image style={{width:100,height:100}} source={require('../assets/images/logo.jpg')}/>
                </View>
                
                <View style={{height: 300,alignItems: 'center'}}>
                    <Text style={{fontSize:30, color:"red"}}> Register </Text>
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
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.goLogin()}>
                        <Text style={{textAlign:"center"}}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>this.DangKy()}>
                        <Text style={{textAlign:"center"}}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
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