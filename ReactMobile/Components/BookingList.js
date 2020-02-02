import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, Button, FlatList, Image,Picker, AsyncStorage } from "react-native";
import BookingListItem from './BookingListItem';
import Modal from "react-native-simple-modal";
import DatePicker from 'react-native-datepicker'

export default class BookingList extends React.Component {
  state = {
    isLoadingMore: false,
    isLoading: false,
    bookings: [],
    open:false
  };

  toggleModal() {
    this.setState({ modalVisible: true });
  }
  
  static navigationOptions = ({ navigation }) => {
    return{
     title: "Bookings",
     headerStyle: {
      backgroundColor: '#4D79D1',
    },
      headerRight: () => (
        <TouchableOpacity onPress={()=>
        {
            AsyncStorage.removeItem('SecurityToken');
            navigation.replace("Login");
        }}><Text>Log Out  </Text></TouchableOpacity>
        // <Button
        //   onPress={navigation.getParam('openfilters')}
        //   title="Filters"
        //   color="#aaa"
        //   style={{ margin: 5 }}
        //   />
      )
    };
  };


  async fetchBookings(){
    this.setState({ isLoading: true });
    const token= await AsyncStorage.getItem('SecurityToken');
    console.log(token);
    fetch("http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/user/bookinglist",
    {
      method: 'GET',
      headers: {'securityTokenValue': token},
    })
      .then(data => data.json())
      .then(bookings => {
        console.log(bookings);
        this.setState({
          isLoading: false,
          bookings: bookings
        });
      });
  };

  async fetchMore (){
    const token= await AsyncStorage.getItem('SecurityToken');
    this.setState({
      isLoadingMore: true
    });
    fetch("http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/user/bookinglist",
    {
      method: 'GET',
      headers: {'securityTokenValue': token},
    })
      .then(data => data.json())
      .then(bookings => {

        var newbookings=this.state.bookings.concat(bookings);
        
        this.setState({
          isLoadingMore:false,
          bookings: newbookings
        });
      });
  };

  componentDidMount() {
    this.fetchBookings();
    this.props.navigation.setParams({ openfilters: this.openModal });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: "whitesmoke"
        }}
      />
    );
  };

  renderFooter = () => {
    if(!this.state.isLoadingMore) return null;
    else return(
      <View>
        <Text>
          Loading more...
        </Text>
      </View>
    )
  };


  modalDidClose = () => {
    this.setState({ open: false });
  };

  openModal = () => this.setState({ open: true });

  closeModal = () => this.setState({ open: false });

  render() {
    const { isLoading, bookings } = this.state;

    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading ...</Text>
        </View>
      );
    }

    if (!isLoading && bookings.length < 1) {
      return (
        <View style={styles.container}>
          <Text>Bookings Not Found</Text>
          <Button title="Reload" onPress={()=>this.fetchBookings()}/>
        </View>
      );
    }

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <FlatList
          data={bookings}
          style={{backgroundColor: "#D8E5FF" }}
          refreshing={isLoading}
          onRefresh={() => this.fetchBookings()}

          //onEndReachedThreshold={0.5}           //paging
          //onEndReached={() => this.fetchMore()}

          ListFooterComponent={this.renderFooter}
          renderItem={({ item }) => (
            <BookingListItem booking={item}  navigate={navigate} />
          )}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={booking => booking.id}
         
        />
    
      </View>
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
  }
});
