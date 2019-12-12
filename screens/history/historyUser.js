import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { firebaseApp } from "./../../components/firebaseConfig";
import User from './../../User'
import { FlatList } from 'react-native-gesture-handler';
import Animbutton from './../../components/Quiz/Animbutton'
const { width, height } = Dimensions.get('window')

export default class HistoryUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHistory: [],
            form: 'list',
            historyDetail: {}
        }
    }

    getHistoryTest = () => {
        var dbHistory = firebaseApp.database().ref("historyTest/" + User.id);
        dbHistory.once('value', (snapshot) => {
            console.log(snapshot);

            var lsHistory = [];
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var temp = { ...childData, id: childKey }
                // ...
                lsHistory.push(temp);
            });

            this.setState({ listHistory: lsHistory })

        });
    }

    setHistoryDetail = (data) => {
        this.setState({ historyDetail: data, form: 'detail' });
    }

    componentDidMount() {
        this.getHistoryTest();
    }

    render() {
        if (this.state.form == 'list')
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.listHistory}
                        renderItem={({ item }) => {
                            return <View style={styles.boxSubject}>

                                <Text>{item.complete}</Text>
                                <TouchableOpacity onPress={() => this.setHistoryDetail(item)} style={{ alignSelf: 'flex-end', backgroundColor: 'green', width: 100, height: 50 }}>
                                    <Text style={{ textAlign: 'center', paddingTop: 10 }}>
                                        Xem
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }}
                        keyExtractor={(value) => {
                            return value.id;
                        }}
                    />
                </View>
            )
        else {
            return <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.toolbar}>
                    <TouchableOpacity onPress={() => this.setState({form:'list'})}><Text style={styles.toolbarButton}>Back</Text></TouchableOpacity>
                    <Text style={styles.toolbarTitle}></Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>
                <FlatList
                    data={this.state.historyDetail.questions}
                    renderItem={({ item }) => {
                        const options = item.options.map((k, index) => {
                            return (<View key={index} style={{ margin: 10 }}>
                                <Animbutton
                                    onColor={ (item.result != index&&item.select == index)? "red":"green"}
                                    effect={"tada"}
                                    text={k}
                                    status={item.result == index ||item.select == index }
                                />
                            </View>)
                        });

                        return (
                            <ScrollView>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', }}>
                                    <View style={styles.oval} >
                                        <Text style={styles.welcome}>
                                            {item.question}
                                        </Text>
                                    </View>
                                    <View>
                                        {options}
                                    </View>

                                </View>
                            </ScrollView>
                        )
                    }}
                    keyExtractor={(value) => {
                        return value.id;
                    }}
                />
            </View>
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: 15,
        paddingTop: 25
    },
    boxSubject: {
        backgroundColor: 'green',
        margin: 10,
        flex: 1,
        margin: 10,
        height: 150,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 3,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 0 },
        flexDirection: 'row',
        alignItems: "center",
        overflow: 'hidden',
        flexDirection: 'column',
        alignContent: 'center'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconBox: {
        width: 75,
        height: 55,
        margin: 7,
        marginLeft: 12,
        paddingRight: 15,
        borderRightColor: 'rgba(204,204,204,0.3)',
        borderRightWidth: 1
    },
    oval: {
        width: width * 90 / 100,
        borderRadius: 20,
        backgroundColor: 'green'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        margin: 15,
        color: "white"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    toolbar:{
        backgroundColor:'#81c04d',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    toolbarButton:{
        width: 55,
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1
    }
})