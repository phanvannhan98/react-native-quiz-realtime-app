import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import { firebaseApp } from "./../../components/firebaseConfig";

export default class HistoryUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHistory: []
        }
    }

    getHistoryTest = () => {
        var dbHistory = firebaseApp.database().ref("historyTest/ltk1909@gmailcom");
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
    componentDidMount() {
        this.getHistoryTest();
    }

    render() {
        console.log('====================================');
        console.log(this.state.listHistory);
        console.log('====================================');
        return (
            <View style={{ flex: 1 }}>
                {/* <StatusBar barStyle="light-content"/>
                <View style={styles.toolbar}>
                    <TouchableOpacity onPress={() => this._onPressBack() }><Text style={styles.toolbarButton}>Back</Text></TouchableOpacity>
                    <Text style={styles.toolbarTitle}></Text>
                    <Text style={styles.toolbarButton}></Text>
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    score: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic'
    },

    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        backgroundColor: '#81c04d',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarButton: {
        width: 55,
        color: '#fff',
        textAlign: 'center'
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    }
});