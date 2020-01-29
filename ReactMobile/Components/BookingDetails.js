import React from "react";
import { Text, View, Image, StyleSheet} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default class BookingDetails extends React.Component {
  static navigationOptions = {
    title: "Booking Details"
  };
  state = {
    isLoading: false,
    details: []
  };

  fetchDetails = () => {
    this.setState({ isLoading: true });
    fetch("https://47046881-67b3-4274-bd55-cb35944b2fdd.mock.pstmn.io/BookingDetails?Id=8f4c2014-9982-4a9b-9653-131905988b6e&fbclid=IwAR0pF9uaRN0Hxmt6_ldQRouuULSk_waxK485QNFfbhm8vnbAoazCU30WkyA")
      .then(data => data.json())
      .then(details => {
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
    var start=DateString(booking.startDate);
    var end=DateString(booking.endDate);
    
  
    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading ...</Text>
        </View>
      );
    }

    return (
        <ScrollView style={{backgroundColor: "whitesmoke" }}>
          <Text style={styles.textViewTitle}>{booking.title}</Text>
          <Image source={{ uri: "https://blobstorageproject.blob.core.windows.net/applications/z21258528V,Aranzacja-malego-mieszkania.jpg?fbclid=IwAR1gdmtLViRDRfs5oFHo2deDllQLImJYsorF7Sn_1WR_bD2KTVDqlZevX6c"}} style={styles.imageView} />
          
          <View style={{flexDirection: 'row'}}>
              <View style={{width:"50%"}}>
                <Text style={styles.textViewTitle}>Details</Text>
                <Text style={styles.textView}>Guests: {booking.people}/{details.people}</Text>
                <Text style={styles.textView}>Price: {booking.price}</Text>
                <Text style={styles.textView}>Date From: {start}</Text>
                <Text style={styles.textView}>Date To: {end}</Text>
              </View>
              <View style={{width:"50%"}}>
                <Text style={styles.textViewTitle}>Wynajmujący</Text>        
                <Text style={styles.textView}>Name: {details.name}</Text>
                <Text style={styles.textView}>Lastame: {details.lastname}</Text>
                <Text style={styles.textView}>Email: {details.email}</Text>
              </View>
            </View>
            <Text style={styles.textViewTitle}>Description</Text>
            <Text style={styles.textView}>{details.description}</Text>      
      </ScrollView>
    );
  }
}


function DateString(date){
    var d=new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear(); //+ " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
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
