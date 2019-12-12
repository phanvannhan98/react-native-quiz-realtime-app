import React from 'react';
import { Platform, Text, View, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Test from '../screens/Test';
import VaoPhong from '../screens/VaoPhong';
import TestClient from '../screens/TestClient';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  drawerLabel: 'Trang Chủ',
  drawerIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  { 
    Links: LinksScreen,
    Test: Test,
    VaoPhong: VaoPhong,
    TestClient: TestClient
  },
  config
);

LinksStack.navigationOptions = {
  drawerLabel: 'Thi Chung',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  drawerLabel: 'Settings',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const CustomDrawerContentComponent = props => (
  <View>
    <Image style={{width:100, height: 100, marginLeft: 10}} source={require('../assets/images/logo.jpg')}/>
    <DrawerItems {...props} />
  </View>
);



const tabNavigator = createDrawerNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
},{
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    labelStyle: {
      fontSize: 13
    }
  }
});

tabNavigator.path = '';

export default tabNavigator;
