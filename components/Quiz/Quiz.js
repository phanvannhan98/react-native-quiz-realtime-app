import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './Animbutton'

import { firebaseApp } from "../firebaseConfig";

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
    listQuestion = Object.keys(jdata).map(function (k) { return {...jdata[k],id:k,select:-1} });
    
    this.state = {
      questions : listQuestion,
      currentIndex : 0
    }

  }

  writeHistoryTest( email, data) {
    firebaseApp.database().ref('historyTest/' + email).push(
      data
    );
  }
  prev() {
    if (this.state.currentIndex > 0)
      this.setState({currentIndex : this.state.currentIndex - 1})
  }
  next() {
    if (this.state.currentIndex < this.state.questions.length -1)
      this.setState({currentIndex : this.state.currentIndex + 1})
    else {
      let length = this.state.questions ? this.state.questions.length : 0;
      let dem = 0;
      this.state.questions&&this.state.questions.forEach((x)=>{
        if (x.select == x.result)
          ++dem;
      })
      let hoanthanh = Math.round(dem * 100 / length);
      this.props.quizFinish(hoanthanh);
      this.writeHistoryTest('ltk1909@gmailcom',{...this.state.questions, complete : hoanthanh});
    }
  }
  

  render() {
    let temp = this.state.questions[this.state.currentIndex].options;
    let answers = Object.keys(temp).map(function (k) { return temp[k]});
    let question = this.state.questions[this.state.currentIndex].question;

    const options = answers.map((k,index) =>{
      return (<View key={index} style={{ margin: 10 }}>
        <Animbutton  
          onColor={"green"} 
            effect={"tada"}  
            text={k} 
            _onPress = {()=>{
              let temp = this.state.questions;
              temp[this.state.currentIndex].select = index;
              this.setState({questions : temp})
            }} 
            status = {this.state.questions[this.state.currentIndex].select == index}
          />
      </View>)
    });

    return (
      <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
        <View style={styles.container}>

          <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', }}>
            <Text>{`${this.state.currentIndex+1} / ${this.state.questions.length}`}</Text>
            <View style={styles.oval} >
              <Text style={styles.welcome}>
                {question}
              </Text>
            </View>
            <View>
              {options}
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this.prev()} >
                <View style={{ marginRight:5,paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "green" }}>
                  <Icon name="md-arrow-round-back" size={30} color="white" />
                </View>
              </TouchableOpacity >

              <TouchableOpacity onPress={() => this.next()} >
                <View style={{ marginLeft:5,paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "green" }}>
                  <Icon name="md-arrow-round-forward" size={30} color="white" />
                </View>
              </TouchableOpacity >

            </View>
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