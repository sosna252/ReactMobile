import React from "react";
import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import BookingListItem from './BookingListItem';

export default class BookingList extends React.Component {
  state = {
    isLoading: false,
    bookings: []
  };

  static navigationOptions = {
    title: "Bookings"
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

  componentDidMount() {
    this.fetchBookings();
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#e0e0eb"
        }}
      />
    );
  };

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
          <Text>Loading ...</Text>
        </View>
      );
    }

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <BookingListItem booking={item} navigate={navigate} />
          )}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={booking => booking.id}
        />
        <Button title="Reload" onPress={this.fetchBookings} />
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
