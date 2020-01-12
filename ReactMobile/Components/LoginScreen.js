import React from 'react';
import { StyleSheet, Text, View,TextInput, Image, Button } from 'react-native';


class LoginScreen extends React.Component {
 render(){
     return (
        <View style={styles.container}>
        <Text>Login</Text><TextInput style={styles.input}/>
        <Text>Password</Text><TextInput style={styles.input}/>
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