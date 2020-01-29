import React from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from'./Components/LoginScreen';
import BookingList from'./Components/BookingList';
import BookingDetails from'./Components/BookingDetails';

const AppStackNavigator=createStackNavigator({
  Login: LoginScreen,
  List:BookingList,
  Details:BookingDetails
})

const AppCont = createAppContainer(AppStackNavigator);
  
export default AppCont

