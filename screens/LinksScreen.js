import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import HeaderButton from '../components/HeaderButton';

export default function LinksScreen(props) {
  return (
    <View style={styles.container}>
      <HeaderButton navigation={props.navigation}/>
      <ScrollView style={styles.container}>


      </ScrollView>
    </View>
  );
}

LinksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
