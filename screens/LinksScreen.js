import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import { firebaseApp } from '../components/firebaseConfig.js';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign, Entypo } from '@expo/vector-icons';

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
            dataSource: []
        }
    }

    componentDidMount() {
        this.addDB();
        // this.testDb();
        // this.props.navigation.navigate('Test');
    }

    testDb() {
        this.testRef.on('child_added', (data) => {
            console.log(data);
            Alert.alert('run')
        })
    }

    setDB = () => {
        // this.itemRef.set([
        //   {
        //     id: 1,
        //     title: "Cấp độ 1",
        //     icon: "icon1.png",
        //     question: [
        //       {
        //         id: 1,
        //         q: "Câu hỏi 1",
        //         ans: 3,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       },
        //       {
        //         id: 2,
        //         q: "Câu hỏi 2",
        //         ans: 2,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       },
        //       {
        //         id: 3,
        //         q: "Câu hỏi 3",
        //         ans: 2,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       },
        //       {
        //         id: 4,
        //         q: "Câu hỏi 4",
        //         ans: 4,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       },
        //       {
        //         id: 5,
        //         q: "Câu hỏi 5",
        //         ans: 1,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       }
        //     ]
        //   },
        //   {
        //     id: 2,
        //     title: "Cấp độ 2",
        //     icon: "icon2.png",
        //     question: [
        //       {
        //         id: 1,
        //         q: "Câu hỏi 1",
        //         ans: 3,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       },
        //       {
        //         id: 2,
        //         q: "Câu hỏi 2",
        //         ans: 2,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       },
        //       {
        //         id: 3,
        //         q: "Câu hỏi 3",
        //         ans: 2,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       },
        //       {
        //         id: 4,
        //         q: "Câu hỏi 4",
        //         ans: 4,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       },
        //       {
        //         id: 5,
        //         q: "Câu hỏi 5",
        //         ans: 1,
        //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
        //       }
        //     ]
        //   }
        // ])

        // this.itemRef.set([
        //     {
        //       id: 1,
        //       q: "Câu hỏi 1",
        //       ans: 3,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 1
        //     },
        //     {
        //       id: 2,
        //       q: "Câu hỏi 2",
        //       ans: 2,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 1
        //     },
        //     {
        //       id: 3,
        //       q: "Câu hỏi 3",
        //       ans: 2,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 1
        //     },
        //     {
        //       id: 4,
        //       q: "Câu hỏi 4",
        //       ans: 4,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 1
        //     },
        //     {
        //       id: 5,
        //       q: "Câu hỏi 5",
        //       ans: 1,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 1
        //     },{
        //       id: 6,
        //       q: "Câu hỏi 1",
        //       ans: 3,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 2
        //     },
        //     {
        //       id: 7,
        //       q: "Câu hỏi 2",
        //       ans: 2,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 2
        //     },
        //     {
        //       id: 8,
        //       q: "Câu hỏi 3",
        //       ans: 2,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 2
        //     },
        //     {
        //       id: 9,
        //       q: "Câu hỏi 4",
        //       ans: 4,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 2
        //     },
        //     {
        //       id: 10,
        //       q: "Câu hỏi 5",
        //       ans: 1,
        //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
        //       idlevel: 2
        //     }
        //   ]
        // )
    }

    addDB = () => {
        let items = [];
        this.levelRef.on('child_added', (dataSnapshot) => {
            items.push({
                name: dataSnapshot.val(),
                key: dataSnapshot.key
            });

            this.setState({
                dataSource: items
            })
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <HeaderButton navigation={this.props.navigation} />
                <ScrollView style={styles.container}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) => {
                            var a = item.name.icon;
                            var imgSource = imagesRequire.find(n => n.key === item.name.icon).value;
                            return (
                                <View style={styles.levelItem}>
                                    <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row', borderRightColor: 'rgba(204,204,204,0.3)', borderRightWidth: 1 }}><Image source={imgSource} style={{ width: 70, height: 70 }} /></View>
                                    <View style={{flex: 5, justifyContent: 'space-between', alignItems: 'center', maxHeight: 70, height: 70 }}>
                                        <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', overflow: 'hidden' }}>
                                            <AntDesign name="home" size={20} color="green" />
                                            <Text style={{ paddingLeft: 8}}>
                                                {item.name.title}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', overflow: 'hidden',paddingLeft: 1 }}>
                                            <Entypo name="email" size={15} color="green"/>
                                            <Text style={{ paddingLeft: 8}}>
                                                By: fanNhan@gmail.com
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Test', { "test": item.name.title }) }} style={styles.buttons}><Text style={styles.txtButton}>Tạo Phòng</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.buttons}><Text style={styles.txtButton}>Vào Phòng</Text></TouchableOpacity>
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
