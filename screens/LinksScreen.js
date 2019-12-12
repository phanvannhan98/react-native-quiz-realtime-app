import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Alert, Modal, ActivityIndicator, TextInput } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import { firebaseApp } from '../components/firebaseConfig.js';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign, Entypo } from '@expo/vector-icons';
import User from '../User';

const imagesRequire = [
    {
        key: 'images/level1.png',
        value: require('../assets/images/level1.png')
    },
    {
        key: 'images/level2.png',
        value: require('../assets/images/level2.png')
    },
    {
        key: 'images/logo.jpg',
        value: require('../assets/images/logo.jpg')
    }
]

export default class LinksScreen extends React.Component {
    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database().ref("questions");
        this.levelRef = firebaseApp.database().ref("subjectLevel");
        this.testRef = firebaseApp.database().ref("test");
        this.state = {
            dataSource: [],
            modal: false,
            isLoadDing: true,
            pin: 0,
            levelSelected: null,
            rooms: []
        }
    }

    componentDidMount() {
        
        this.addDB();
        this.refRoomAll = firebaseApp.database().ref("room");
        let items = [];

        this.refRoomAll.on("child_added", data =>{
            items.push({idSubject: data.key, roominfo: Object.values(data.val())[0]});
            
            this.setState({
                rooms : items
            })
        })
    }

    testDb() {
        this.testRef.on('child_added', (data) => {
            Alert.alert('run')
        })
    }


    addDB = () => {
        let items = [];
        this.levelRef.on('child_added', (dataSnapshot) => {
            items.push({
                name: dataSnapshot.val(),
                key: dataSnapshot.key
            });

            this.setState({
                dataSource: items,
                isLoadDing: false
            })
        })
    }

    testPin = () => {
        var { pin, levelSelected } = this.state;
        this.setState({ modal: false })
        this.refRoom = firebaseApp.database().ref("room").child(levelSelected.id);

        this.refRoom.on('child_added', (data) => {

            if (+data.val().pin === +pin) {
                var arrPrev = data.val().listUser ? data.val().listUser : [];
                this.refRoom.child(data.key).child('listUser').set([...arrPrev, User.id]);
                this.props.navigation.navigate('Test', levelSelected);
            }
        })
    }

    vaoPhongHandle = (item) => {
        this.setState({ modal: true, levelSelected: item });
        this.refRoom = firebaseApp.database().ref("room").child(item.id);
        this.refRoom.on('child_added', (data) => {
            if (data.val().idChuPhong == User.id || (data.val().listUser && data.val().listUser.find(n => n === User.id))) {
                this.props.navigation.navigate('Test', item);
                setTimeout(() => {
                    this.setState({ modal: false, levelSelected: item });
                }, 0);
            }
        })

    }


    taoPhongHandle = item => {
        var { rooms } = this.state;
        this.refRoom = firebaseApp.database().ref("room").child(item.id);
        rooms = rooms.filter(n=>n.idSubject == item.id);
        
        if(rooms.length === 0){
            this.refRoom.push({
                idChuPhong: User.id,
                pin: '000' + item.id
            })
            this.props.navigation.navigate('Test', item)
        }else{
            if(rooms[0].roominfo.idChuPhong === User.id){
                this.props.navigation.navigate('Test', item);
                return;
            }
            this.refRoom.on('child_added', (data) => {
                kt = true;
                if (data.val().listUser && data.val().listUser.find(n => n === User.id)) {
                    this.props.navigation.navigate('Test', item);
                    Alert.alert('Thông báo !','Bạn Đã vào phòng. Không thể tạo phòng nữa.');
                }else{
                    Alert.alert('Thông báo !','Phòng đang hoạt động, vui lòng thử lại sau.');
                }
            })
        } 
    }

    render() {
        var { pin, rooms } = this.state;
        
        return (
            <View style={styles.container}>
                <HeaderButton navigation={this.props.navigation} />
                <Modal
                    transparent={true}
                    visible={this.state.modal}
                    animationType={'fade'}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(204,204,204,0.25)' }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", maxHeight: 100, width: 300, backgroundColor: '#1eb6fe' }}>
                            <TextInput value={pin.toString()} onChangeText={text => this.setState({ pin: text })} keyboardType='number-pad' placeholder='PIN' placeholderColor='#ccc' style={{ textAlign: "center", borderBottomColor: 'pink', borderBottomWidth: 1, width: 80 }} />
                            <TouchableOpacity style={{ paddingVertical: 8 }} onPress={this.testPin}><Text>Click Me</Text></TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                <Modal
                    transparent={true}
                    visible={this.state.isLoadDing}
                    animationType={'slide'}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(204,204,204,0.25)' }}>
                        <ActivityIndicator size="large" color="#1eb6fe" />
                    </View>

                </Modal>
                <ScrollView style={styles.container}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) => {
                            var a = item.name.icon;
                            var imgSource = imagesRequire.find(n => n.key === item.name.icon).value;
                            return (
                                <View style={styles.levelItem}>
                                    <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row', borderRightColor: 'rgba(204,204,204,0.3)', borderRightWidth: 1 }}><Image source={imgSource} style={{ width: 70, height: 70 }} /></View>
                                    <View style={{ flex: 5, justifyContent: 'space-between', alignItems: 'center', maxHeight: 70, height: 70 }}>
                                        <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', overflow: 'hidden' }}>
                                            <AntDesign name="home" size={20} color="green" />
                                            <Text style={{ paddingLeft: 8 }}>
                                                {item.name.title}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', overflow: 'hidden', paddingLeft: 1 }}>
                                            <Entypo name="email" size={15} color="green" />
                                            <Text style={{ paddingLeft: 8 }}>
                                                By: fanNhan@gmail.com
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                            <TouchableOpacity onPress={() => { this.taoPhongHandle(item.name) }} style={styles.buttons}><Text style={styles.txtButton}>Tạo Phòng</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.vaoPhongHandle(item.name) }} style={styles.buttons}><Text style={styles.txtButton}>Vào Phòng</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={(value) => value.key}
                    />
                </ScrollView>
            </View>
            
        );
    }
}

LinksScreen.navigationOptions = {
    header: null,
    headerBackTitle: 'HELLOHELLo'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    levelItem: {
        flex: 1,
        margin: 10,
        height: 100,
        borderRadius: 25,
        backgroundColor: '#fff',
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 3,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 0 },
        flexDirection: 'row',
        alignItems: "center",
        overflow: 'hidden'
    },
    buttons: {
        backgroundColor: '#1eb6fe',
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: "center",
        maxHeight: 20
    },
    txtButton: {
        color: '#fff',
        fontSize: 12,
        textTransform: "uppercase",
    }
});
