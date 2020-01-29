import React from "react";
import { StyleSheet, Text, View,TouchableOpacity, Button, FlatList, Image,Picker } from "react-native";
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
      headerRight: () => (
        <Button
          onPress={navigation.getParam('openfilters')}
          title="Filters"
          color="#aaa"
          style={{ margin: 5 }}
          
          />
      )
    };
  };


  fetchBookings = () => {
    this.setState({ isLoading: true });
    fetch("https://47046881-67b3-4274-bd55-cb35944b2fdd.mock.pstmn.io/BookingList")
      .then(data => data.json())
      .then(bookings => {
        this.setState({
          isLoading: false,
          bookings: bookings
        });
      });
  };

  fetchMore = () => {
    this.setState({
      isLoadingMore: true
    });
    fetch("https://47046881-67b3-4274-bd55-cb35944b2fdd.mock.pstmn.io/BookingList")
      .then(data => data.json())
      .then(bookings => {

        var newbookings=this.state.bookings.concat(bookings);
        //Array.prototype.push.apply(newbookings,bookings);
        
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
          <Button title="Reload" onPress={()=>fetchBookings()}/>
        </View>
      );
    }

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
     


        <FlatList
          data={bookings}
          style={{backgroundColor: "whitesmoke" }}
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
      
<Modal
  offset={this.state.offset}
  open={this.state.open}
  modalDidClose={this.modalDidClose}
  style={{ alignItems: "center" }}>
    <View>
      <Text style={{ fontSize: 20, marginBottom: 10, textAlign:"center" }}>Hello world!</Text>
      <View style={{flexDirection: 'row', margin: 5}}>
        <Text style={{textAlign:"center",textAlignVertical:"center", width:"50%"}}>From: </Text>
        <DatePicker style={{width:"50%"}}/> 
      </View>
      <View style={{flexDirection: 'row', margin: 5}}>
        <Text style={{textAlign:"center",textAlignVertical:"center", width:"50%"}}>To: </Text>
        <DatePicker style={{width:"50%"}}/> 
      </View>
      <TouchableOpacity style={{ margin: 5 }} onPress={this.closeModal}>
        <Text style={{textAlign:"center"}}>Close modal</Text>
      </TouchableOpacity>
    </View>
</Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  }
});
