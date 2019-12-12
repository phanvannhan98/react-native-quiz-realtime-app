import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MonoText } from '../components/StyledText';
import HeaderButton from '../components/HeaderButton';
import { firebaseApp } from '../components/firebaseConfig.js';
import { FlatList } from 'react-native-gesture-handler';
import Playquiz from "./../components/Quiz/Playquiz";
import SubjectTypeScreen from './home/subjectTypeScreen';
import SubjectSubScreen from './home/subjectSubScreen';
import QuizTestScreen from './home/quizTestScreen';
import User from "./../User";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screen : 'subjectType',
      subjectType : '',
      subjectSub : '',
      quizTest : '',
      subjectSubFull: {}
    }
  }

  setSubjectTypeId = (id) => {
    this.setState({
      subjectType:id
    })
    this.setState({
      screen : 'subjectSub'
    })
  }

  setSubjectSubId = (id,ssf) => {
    this.setState({
      subjectSub:id,
      screen : 'quizTest'
    })
    this.setState({
      subjectSubFull : ssf
    })
  }

  render() {
    if (this.state.screen == 'subjectType')
      return (
        <View style={styles.container}>
          <SubjectTypeScreen setSubjectTypeId= {this.setSubjectTypeId} navigation = {this.props.navigation}/>
        </View>
      )
    else if (this.state.screen == 'subjectSub')
      return (
        <View style={styles.container} >
          <SubjectSubScreen  idSubjectType = {this.state.subjectType} goBack = {()=>{this.setState({screen:'subjectType'})}} setSubjectSubId = {this.setSubjectSubId}/>
        </View>
      )
    else (this.state.screen == 'quizTest')
      return (
        <View style={styles.container}>
          <QuizTestScreen ssf = {this.state.subjectSubFull} goBack = {()=>{this.setState({screen:'subjectSub'})}}/>
        </View>
      )
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});