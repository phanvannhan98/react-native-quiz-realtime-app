import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from '../components/Quiz/Animbutton'
import User from '../User';
import { firebaseApp } from "../components/firebaseConfig";
import { FlatList } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')
let listQuestion = []
const jsonData = {
    "quiz": {
        "quiz1": {
            "question1": {
                "result": "2",
                "options": {
                    "0": "Java",
                    "1": "PHP",
                    "2": "Javascript",
                    "3": "IOS"
                },
                "question": "React is a ____ library"
            },
            "question2": {
                "result": "3",
                "options": {
                    "0": "XML",
                    "1": "YML",
                    "2": "HTML",
                    "3": "JSX"
                },
                "question": "____ tag syntax is used in React"
            },
            "question3": {
                "result": "0",
                "options": {
                    "0": "Single root DOM node",
                    "1": "Double root DOM node",
                    "2": "Multiple root DOM node",
                    "3": "None of the above"
                },
                "question": "Application built with just React usually have ____"
            },
            "question4": {
                "result": "1",
                "options": {
                    "0": "mutable",
                    "1": "immutable",
                    "2": "variable",
                    "3": "none of the above"
                },
                "question": "React elements are ____"
            },
            "question5": {
                "result": "2",
                "options": {
                    "0": "functions",
                    "1": "array",
                    "2": "components",
                    "3": "json data"
                },
                "question": "React allows to split UI into independent and reusable pieses of ____"
            }
        }
    }
}

export default class Quiz extends Component {
    constructor(props) {
        super(props);

        const jdata = jsonData.quiz.quiz1
        this.refUsers = firebaseApp.database().ref("users");
        listQuestion = Object.keys(jdata).map(function (k) { return { ...jdata[k], id: k, select: -1 } });
        this.state = {
            questions: listQuestion,
            currentIndex: 0,
            roomInfo: this.props.navigation.getParam('roomInfo'),
            idLevel: this.props.navigation.getParam('idLevel'),
            time: 30,
            score: 0,
            modal: false,
            giay: 0,
            disabled: false,
            ketquathi: [],
            listUser: [],
            showKetQua: false,
            ketquacuoicung: []
        }
    }

    timeout = () => {
        setInterval(() => {
            this.setState({ giay: this.state.giay + 1 })
        }, 1000);
    }

    componentDidMount() {
        this.timeout();
        this.ktTgian();
        var { roomInfo, idLevel } = this.state;
        this.refRoom = firebaseApp.database().ref("room").child(idLevel).child(roomInfo.key);
        if (User.id === roomInfo.idChuPhong) {
            var obj = {};
            roomInfo.listUser.forEach((value, index) => {
                obj[value] = 0;
            })
            this.refRoom.child("ketqua").set({
                obj
            })
            this.refRoom.child("ketqua").child("current").set(0)
        }
        if (this.refRoom.child('ketqua').child('current')) {
            this.refRoom.child('ketqua').child('current').on('value', data => {
                if (data.val() > 0) {
                    this.setState({ currentIndex: data.val(), disabled: false, giay: 0 })
                }
            })
        }
        var items2 = [];
        this.refUsers.on('child_added', (data) => {
            items2.push({
                user: data.val(),
                key: data.key
            });

            this.setState({
                listUser: items2
            })
        })

    }

    writeHistoryTest(email, data) {
        firebaseApp.database().ref('historyTest/' + email).push(
            data
        );
    }
    prev() {
        if (this.state.currentIndex > 0)
            this.setState({ currentIndex: this.state.currentIndex - 1 })
    }
    next() {
        if (this.state.currentIndex < this.state.questions.length - 1) {
            var current = this.state.currentIndex + 1;
            this.setState({ currentIndex: current })
            this.refRoom.child('ketqua').child('current').set(current)
        }
        else {
            var kq = [];
            this.refRoom.child("ketqua").child("obj").on('child_added', res => {
                kq.push({
                    id: res.key,
                    kq: res.val()
                })
                this.setState({ ketquathi: kq });

            })
            var { listUser } = this.state;
            var arrt = [];
            kq.forEach((value) => {
                // console.log(value);

                arrt = [...arrt, { user: listUser.find(n => n.user.id === value.id), kq: value.kq }]
            })
            // console.log(arrt);

            this.setState({ ketquacuoicung: arrt, showKetQua: true })

        }
    }

    traloi = () => {
        var { roomInfo, questions, currentIndex } = this.state;
        if (questions[currentIndex].select !== -1) {
            this.setState({ disabled: true })
        }
        if (User.id !== roomInfo.idChuPhong) {
            var { questions, currentIndex, score } = this.state;


            score = +questions[currentIndex].select === +questions[currentIndex].result ? score + 1 : score;

            this.setState({ score })
            this.refRoom.child('ketqua').child('obj').child(User.id).set(score)
        } else {
            this.setState({
                modal: true
            })
        }
    }

    componentWillUnmount() {
        return null;
    }

    ktTgian = () => {
        var { currentIndex, giay } = this.state;
        if (this.state.giay >= 30) {

            this.refRoom.child('ketqua').child("current").set(currentIndex + 1);
            this.setState({
                giay: 0,
                currentIndex: currentIndex + 1
            })
        }
    }

    render() {

        var { roomInfo } = this.state;
        let temp = this.state.questions[this.state.currentIndex].options;
        let answers = Object.keys(temp).map(function (k) { return temp[k] });
        let question = this.state.questions[this.state.currentIndex].question;

        const options = answers.map((k, index) => {
            return (<View key={index} style={{ margin: 10 }}>
                <Animbutton
                    onColor={"green"}
                    effect={"tada"}
                    text={k}
                    _onPress={() => {
                        let temp = this.state.questions;
                        temp[this.state.currentIndex].select = index;
                        this.setState({ questions: temp })
                    }}
                    status={this.state.questions[this.state.currentIndex].select == index}
                />
            </View>)
        });
        console.log(this.state.ketquacuoicung);
        
        return (
            <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
                <View style={styles.container}>
                    <Modal
                        transparent={true}
                        visible={this.state.modal}
                        animationType={'fade'}
                    >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(204,204,204,0.25)' }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", maxHeight: 100, width: 300, backgroundColor: '#1eb6fe' }}>

                                <TouchableOpacity style={{ paddingVertical: 8 }} onPress={() => this.setState({ modal: false })}><Text>Click Me</Text></TouchableOpacity>

                            </View>
                        </View>

                    </Modal>

                    <Modal
                        transparent={true}
                        visible={this.state.showKetQua}
                        animationType={'fade'}
                    >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgb(204,204,204)' }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#ccc' }}>

                                <FlatList
                                    data={this.state.ketquacuoicung}
                                    renderItem={({ item, index }) => (
                                        <View>
                                            <Text>{item.user.name}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item) => item.user.key}
                                />

                            </View>
                        </View>
                    </Modal>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', }}>
                        <Text>{`${this.state.currentIndex + 1} / ${this.state.questions.length}`}</Text>
                        <View style={styles.oval} >
                            <Text style={styles.welcome}>
                                {question}
                            </Text>
                        </View>
                        <View>
                            {options}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            {User.id === roomInfo.idChuPhong ? <TouchableOpacity onPress={() => this.next()} >
                                <View style={{ marginLeft: 5, paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "green" }}>
                                    <Icon name="md-arrow-round-forward" size={30} color="white" />
                                </View>
                            </TouchableOpacity > : <></>}
                            <TouchableOpacity disabled={this.state.disabled} onPress={() => this.traloi()} >
                                <View style={{ marginLeft: 5, paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "green" }}>
                                    <Icon name="md-arrow-round-forward" size={30} color="white" />
                                </View>
                            </TouchableOpacity >
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, height: 300, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, maxHeight: 70, width: 70, borderRadius: 35, backgroundColor: 'rgb(189, 195, 199)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'rgb(192, 57, 43)', fontSize: 30, fontWeight: 'bold' }}>
                            {this.state.giay}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

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
});