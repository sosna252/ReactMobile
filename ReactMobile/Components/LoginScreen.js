import React from 'react';
import { StyleSheet, Text, View,TextInput, Image, Button, AsyncStorage } from 'react-native';


class LoginScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {
        login: '',
        passowrd:''
      }


    this.LoginChanged=this.LoginChanged.bind(this);
    this.PasswordChanged=this.PasswordChanged.bind(this);

  }

    async componentDidMount(){
      this.setState ({
        login: await AsyncStorage.getItem('login'),
        passowrd: await AsyncStorage.getItem('password')
      })
    }

  async LoginChanged(value) {
    AsyncStorage.setItem('login', value);
    this.setState({
      login: value
    });
  }

  async PasswordChanged(value) {
    AsyncStorage.setItem('password', value);
    this.setState({
      passowrd:value
    })
  }

 render(){
     return (
        <View style={styles.container}>
        <Text>Login</Text><TextInput style={styles.input} value={this.state.login} onChangeText={this.LoginChanged}/>
        <Text>Password</Text><TextInput style={styles.input} value={this.state.passowrd} onChangeText={this.PasswordChanged}/>
        <Button title="Login" onPress={()=>this.props.click()}/>
      </View>
            );
    }
}

export default LoginScreen

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      margin: 5
    },
    input:{
        height: 30, 
        width: 200,
        borderColor: 'gray', 
        borderWidth: 1,
        margin:5
    }

})