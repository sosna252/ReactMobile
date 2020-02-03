import React from 'react';
import { StyleSheet, Text, View,TextInput, Image, Button, AsyncStorage } from 'react-native';


class LoginScreen extends React.Component {
    
      constructor(props){
        super(props);
        this.state = { 
          login: '',
          password:'',
          message:''
        }
        this.LogIn=this.LogIn.bind(this);
       
        
        this.LoginChanged=this.LoginChanged.bind(this);
        this.PasswordChanged=this.PasswordChanged.bind(this);
        }

        static navigationOptions = {
          headerShown: false
      }


      LogIn(){
        this.setState ({
          message: ''
        })
       fetch("http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/login",
        { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                login : this.state.login,
                password : this.state.password
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.message)
            this.setState ({
              message: responseJson.message
            })
            else{
              AsyncStorage.setItem('SecurityToken', responseJson);
              this.props.navigation.replace("List");
            }
            })
            .catch((error) => {
              console.error('Error:', error);
            })
          }
          
        
     

  

    async componentDidMount(){
      this.setState ({
        login: await AsyncStorage.getItem('login'),
        password: await AsyncStorage.getItem('password')
      })
      if(await AsyncStorage.getItem('SecurityToken'))
        this.props.navigation.replace("List");
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
      password:value
    })
  }

 render(){
     return (
        <View style={styles.container}>
        <Text>Login</Text><TextInput style={styles.input} value={this.state.login} onChangeText={this.LoginChanged}/>
        <Text>Password</Text><TextInput style={styles.input} secureTextEntry={true} value={this.state.password} onChangeText={this.PasswordChanged}/>
        <Button title="Login" onPress={()=>this.LogIn()}/>
        <Text style={{color:"red"}}>{this.state.message}</Text>
      </View>
    );
    }
}

export default LoginScreen

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#D8E5FF",
      alignItems: "center",
      justifyContent: "center",
      margin: 0
    },
    input:{
      backgroundColor: "#F3F8FF",
        height: 30, 
        width: 200,
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 5
    }

})