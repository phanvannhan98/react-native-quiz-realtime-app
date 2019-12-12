import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image,StatusBar } from 'react-native'
import { firebaseApp } from './../../components/firebaseConfig';
import HeaderButton from '../../components/HeaderButton';



export default class SubjectSubScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSubjectSub: []
        }
    }
    componentDidMount() {
        this.getSubjectSub();
    }

    getSubjectSub = () => {
        var dbSubjectType = firebaseApp.database().ref("subjectSub");
        dbSubjectType.once('value', (snapshot) => {

            var lsSubjectSub = [];
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var temp = { ...childData, id: childKey }
                // ...
                lsSubjectSub.push(temp);
            });
            lsSubjectSub = lsSubjectSub.filter(x => x.idSubjectType == this.props.idSubjectType);
            this.setState({ listSubjectSub: lsSubjectSub })

        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <View style={styles.toolbar}>
                    <TouchableOpacity onPress={() => this.props.goBack()}><Text style={styles.toolbarButton}>Back</Text></TouchableOpacity>
                    <Text style={styles.toolbarTitle}></Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>

                <FlatList
                    style={styles.container}
                    data={this.state.listSubjectSub}
                    renderItem={({ item }) => {
                        let { name, desc, icon, id } = item;

                        return <View style={styles.boxSubject}>
                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start', paddingTop: 10 }}>
                                <View style={styles.iconBox}>
                                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/quizdanceapp.appspot.com/o/images%2Flevel1.png?alt=media&token=1c5236a8-fe87-4e59-91bb-3bf15b2a7d19' }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text  style= {{fontSize:20,fontWeight:'bold',paddingBottom:7}}>{name}</Text>
                                    <Text>{desc}</Text>

                                    
                                </View>
                                <TouchableOpacity onPress={() => this.props.setSubjectSubId(id, item)} 
                                style={{ paddingTop:7,marginTop:15,borderRadius:7,alignSelf: 'center', backgroundColor : '#00cec9', width : 100, height:40 }}>
                                        <Text style={{ textAlign: 'center' }}>
                                            Start
                                        </Text>
                                    </TouchableOpacity>
                            </View>


                        </View>
                    }}
                    keyExtractor={(value) => value.id}
                />
            </View>

        )
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