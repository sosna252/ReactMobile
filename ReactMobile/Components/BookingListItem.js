import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function BookingListItem(props) {
  const { booking, navigate } = props;
  var start=DateString(booking.startDate);
  var end=DateString(booking.endDate);
  

  
  return (
    <TouchableOpacity
      onPress={() => navigate("Details", booking)}
      style={{flexDirection: "row", marginRight:5, backgroundColor:"powderblue",borderRadius:12 }}>
      
        <Image source={{ uri: "https://blobstorageproject.blob.core.windows.net/applications/z21258528V,Aranzacja-malego-mieszkania.jpg?fbclid=IwAR1gdmtLViRDRfs5oFHo2deDllQLImJYsorF7Sn_1WR_bD2KTVDqlZevX6c"}} style={styles.imageView} />

            <View style={{width:"60%", flexDirection: "column"}}> 
                <View>
                  <Text style={styles.textViewTitle}>{booking.title}</Text>
                </View>
                <View> 
                    <Text style={styles.textView}>Guests: {booking.people}</Text>
                    <Text style={styles.textView}>Price: {booking.price}</Text>
                </View>
                <View>
                    <Text style={styles.textView}>From: {start}</Text>
                    <Text style={styles.textView}>To: {end}</Text>
                </View>
            </View>

    </TouchableOpacity>
  );
}

function DateString(date){
    var d=new Date(date);
    return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear(); //+ " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
};


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
