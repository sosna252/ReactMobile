import React from "react";
import { Text, View, Image, StyleSheet,AsyncStorage} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default class BookingDetails extends React.Component {
  static navigationOptions = {
    title: "Booking Details",
    headerStyle: {
      backgroundColor: '#4D79D1',
    },
  };
  state = {
    isLoading: false,
    details: []
  };

  async fetchDetails(){
    const token= await AsyncStorage.getItem('SecurityToken');
    this.setState({ isLoading: true });
    fetch("http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/bookingdetails/"+this.props.navigation.state.params.id,
    {
      method: 'GET',
      headers: {'securityTokenValue': token},
    })
      .then(data => data.json())
      .then(details => {
        // console.log(details);
        this.setState({
          isLoading: false,
          details: details
        });
      });
  };

  componentDidMount() {
    this.fetchDetails();
  }

  render() {
    const booking = this.props.navigation.state.params;
    const { isLoading, details } = this.state;
    var photourl="http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/itemphoto/"+booking.item_id;
  
    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading ...</Text>
        </View>
      );
    }

    return (
        <ScrollView style={{backgroundColor: "#D8E5FF"}}>
           <Text style={styles.textViewTitle}>{details.title}</Text>
          <Image source={{ uri: photourl}} style={styles.imageView} />
          
          <View style={{flexDirection: 'row'}}>
              <View style={{width:"50%"}}>
                <Text style={styles.textViewTitle}>Details</Text>
                <Text style={styles.textView}>Guests: {details.people}/{booking.beds}</Text>
                <Text style={styles.textView}>Price: {details.price}</Text>
                <Text style={styles.textView}>Date From: {details.start_date}</Text>
                <Text style={styles.textView}>Date To: {details.end_date}</Text>
              </View>
              <View style={{width:"50%"}}>
                <Text style={styles.textViewTitle}>Tenant</Text>        
                <Text style={styles.textView}>Name: {details.name}</Text>
                <Text style={styles.textView}>Lastame: {details.last_name}</Text>
                <Text style={styles.textView}>Email: {details.email}</Text>
              </View>
            </View>
                <Text style={styles.textView}>Address: {details.country}, {details.city}, {details.address}</Text>
            <Text style={styles.textViewTitle}>Description</Text>
            <Text style={styles.textView}>{details.description}</Text>      
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8E5FF",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  imageView: {
    width: "98%",
    height: 300,
    margin: "1%",
    borderRadius: 7
  },
    textView: {
   //   width: "50%",
      textAlignVertical: "center",
      padding: 8,
      marginLeft: 5,
      color: "#000"
    },
    textViewTitle: {
      // width: "50%",
       textAlignVertical: "center",
       padding: 10,
       color: "#000",
       fontWeight: 'bold',
       textAlign: 'center'
     },
     textViewSubitle: {
        // width: "50%",
         textAlignVertical: "center",
         marginLeft: 8,
         color: "#000",
         fontWeight: 'bold',
       },
});
