import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { firebaseApp } from '../components/firebaseConfig.js';
import { FlatList } from 'react-native-gesture-handler';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.refRoom = firebaseApp.database().ref("room").child(this.props.navigation.getParam('id'));
        this.refUsers = firebaseApp.database().ref("users");
        this.state = {
            roomInfo: null,
            users: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title")
        }
    }

    componentWillMount() {
        let items = [];
        this.refRoom.on('child_added', (data) => {
            items.push({
                roomInfo: data.val(),
                key: data.key
            });
            if (data.val().idChuPhong == '1') {
                this.setState({
                    roomInfo: { ...data.val(), key: data.key }
                })
            }
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


    }

    render() {
        var { roomInfo,users } = this.state;
        var listUserInRoom = [];

        if(users.length, roomInfo){
            listUserInRoom = users.filter((item, index)=>{
                return roomInfo.listUser.find(n=>n === item.user.id)
            }) 
        }

        if (roomInfo) {
            return (
                <View>
                    <Text> PIN: {roomInfo.pin} </Text>
                    <FlatList
                        data={listUserInRoom}
                        renderItem={({item}) => {
                            return (<Text>{item.user.name}</Text>)
                        }}
                        keyExtractor = {(value) => value.key}
                    />
                </View>
            )
        }
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
