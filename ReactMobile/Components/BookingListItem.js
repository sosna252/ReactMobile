import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function BookingListItem(props) {
  const { booking, navigate } = props;
  var photourl="http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/itemphoto/"+booking.item_id;

  
  return (
    <TouchableOpacity
      onPress={() => navigate("Details", booking)}
      style={{flexDirection: "row", marginRight:5, backgroundColor:'#97BAFF',borderRadius:12 }}>
      
        <Image source={{ uri: photourl}} style={styles.imageView} />

            <View style={{width:"60%", flexDirection: "column"}}> 
                <View>
                  <Text style={styles.textViewTitle}>{booking.title}</Text>
                </View>
                <View> 
                    <Text style={styles.textView}>Guests: {booking.beds}</Text>
                    <Text style={styles.textView}>Price: {booking.price}</Text>
                </View>
                <View>
                    <Text style={styles.textView}>From: {booking.start_date}</Text>
                    <Text style={styles.textView}>To: {booking.end_date}</Text>
                </View>
            </View>

    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  imageView: {
    width: "40%",
    height: 120,
    margin: 7,
    borderRadius: 7,

  },
  textView: {
   // width: "50%",
    textAlignVertical: "center",
    padding: 3,
    color: "#000",
    
  },
  textViewTitle: {
    // width: "50%",
     textAlign: "center",
     padding: 5,
     color: "#000",
     fontWeight: 'bold',
     
   }


});
