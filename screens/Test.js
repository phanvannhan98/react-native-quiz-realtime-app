import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { firebaseApp } from '../components/firebaseConfig.js';
import { FlatList } from 'react-native-gesture-handler';
import User from '../User';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.refRoom = firebaseApp.database().ref("room").child(this.props.navigation.getParam('id'));
        this.refUsers = firebaseApp.database().ref("users");
        this.state = {
            roomInfo: null,
            users: [],
            isStart: false,
            roomKey: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title")
        }
    }

    componentWillUnmount() {
        return;
    }

    componentDidMount() {
        let items = [];
        let key = null;

        let roomtemp = null;

        this.refRoom.on('child_added', (data) => {
            key = data.key;
            this.setState({ roomKey: key })

            items.push({
                roomInfo: data.val(),
                key: data.key
            });
            let arrT = data.val().listUser ? data.val().listUser : [];
            if (data.val().idChuPhong === User.id || (arrT.length && arrT.find(n => n === User.id))) {
                roomtemp = { ...data.val(), key: data.key };
                this.setState({
                    roomInfo: { ...data.val(), key: data.key }
                })
            }
        })

        this.refRoom.child(key).child("listUser").on('value', (rs) => {
            this.setState({
                roomInfo: { ...roomtemp, listUser: rs.val() }
            })
            roomtemp = { ...roomtemp, listUser: rs.val() };
        })

        let items2 = [];
        this.refUsers.on('child_added', (data) => {
            items2.push({
                user: data.val(),
                key: data.key
            });

            this.setState({
                users: items2
            })
        })

        this.refRoom.child(key).child("status").on('value', res => {

            if (res.val() === 'dangthi') {
                this.setState({isStart: true})
                if(roomtemp){
                    this.props.navigation.navigate("TestClient",{roomInfo: roomtemp, idLevel: this.props.navigation.getParam('id')});
                }
            }
        })
    }

    onStart = () => {
        var { roomInfo, roomKey } = this.state;
        if (roomInfo && roomInfo.listUser && roomInfo.listUser.length) {
            this.refRoom.child(roomKey).child("status").set("dangthi");
        } else {
            Alert.alert("Thông báo !", 'Phòng hiện chưa có ai tham gia');
        }
    }

    render() {
        let { roomInfo, users, isStart, roomKey } = this.state;
        let listUserInRoom = [];
        console.log(roomInfo);
        
        if (users.length, roomInfo) {
            listUserInRoom = users.filter((item, index) => {
                return roomInfo.listUser ? roomInfo.listUser.find(n => n === item.user.id) : false
            })
        }

        if (roomInfo) {
            return (
                <View>
                    <Text> PIN: {roomInfo.pin} </Text>
                    <FlatList
                        data={listUserInRoom}
                        renderItem={({ item }) => {
                            return (<Text>{item.user.name}</Text>)
                        }}
                        keyExtractor={(value) => value.key}
                    />
                    {User.id === roomInfo.idChuPhong ?
                        <TouchableOpacity onPress={this.onStart} style={{ padding: 10, backgroundColor: 'green' }}>
                            <Text>Start</Text>
                        </TouchableOpacity>
                        :
                        <></>}
                       
                </View>
            )
        }
        return (<></>)
    }
}

const styles = StyleSheet.create({})
