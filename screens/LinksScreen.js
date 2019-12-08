import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation'

export default function LinksScreen(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesome.Button name="bars" fontSize={25} backgroundColor="#fff" color="black" onPress={() => { props.navigation.dispatch(DrawerActions.openDrawer()); }} />
      </TouchableOpacity>
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
