import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from'./Components/LoginScreen';
import BookingList from'./Components/BookingList';
import BookingDetails from'./Components/BookingDetails';

const AppStackNavigator=createStackNavigator({
  List:BookingList,
  Details:BookingDetails
})

const AppCont = createAppContainer(AppStackNavigator);
  
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      Logged:false
    }
    this.LogIn=this.LogIn.bind(this);
    }

LogIn(){
  this.setState({
    Logged:true
  });
}

  render(){
    if(!this.state.Logged){
      return(
        <LoginScreen click={this.LogIn}/>
        )
      }
    else{
        return(
          <AppCont/>
          )
        }
  }
}