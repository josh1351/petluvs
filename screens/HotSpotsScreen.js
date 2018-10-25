import React from "react";
import {
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import HotSpotsMap from "../components/HotSpotsMap";
import SearchBar from "../components/SearchBar";

const foursquare = require("react-native-foursquare-api")({
  clientID: "REX11TZ1KY44X2MP2GKZEUUZQFIZWAUKIVPPSEWH3RLCSSKL",
  clientSecret: "DPOMAOH1LO54DSTZT3QSQQLRNLJ4CIQ1BQUR30WQCTVIFUFW",
  style: "foursquare",
  version: "20180806"
});

class HotSpotsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      category: "",
      latitude: 0,
      longitude: 0,
      markers: [],
      items: [],
      markerIcon: "",
      opacity: true
    };
  }

  fetchMarkerData = title => {
    const params = {
      ll: `${this.state.latitude.toString()},${this.state.longitude.toString()}`,
      // "ll": "10.652814,-61.3969835",
      query: title
    };
    foursquare.venues
      .getVenues(params)
      .then(venues => {
        this.setState({ items: venues.response.venues });
        console.log(venues.response.venues);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        console.log("------------");
        console.log(position.coords.latitude);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );
  }

  categories = [
    { title: "Pet Trainers", icon: require("../assets/marker_trainer.png") },
    { title: "Pet Sitters", icon: require("../assets/marker_sitter.png") },
    { title: "Pet Groomers", icon: require("../assets/marker_groomer.png") },
    { title: "Pet Boarding", icon: require("../assets/marker_foster.png") },
    { title: "Pet Daycare", icon: require("../assets/marker_breeder.png") },
    {
      title: "Pet Friendly Restaurants",
      icon: require("../assets/marker_sitter.png")
    },
    {
      title: "Animal Rescue Services",
      icon: require("../assets/marker_rescue.png")
    },
    { title: "Pet Fosters", icon: require("../assets/marker_foster.png") }
  ];
  onCategoryPress = (title, icon) => {
    this.setState({
      category: title,
      opacity: !this.state.opacity,
      markerIcon: icon
    });
    this.fetchMarkerData(title);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            width: "100%",
            marginTop: 20,
            paddingHorizontal: 20
          }}
        >
          <SearchBar name={this.state.category} />
          <FlatList
            horizontal
            data={this.categories}
            extradata={this.state.opacity}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Animated.View>
                <TouchableOpacity
                  onPress={() => {
                    this.onCategoryPress(item.title, item.icon);
                  }}
                  style={[
                    styles.CategoryButton,
                    { opacity: this.state.opacity ? 0.3 : 0.9 }
                  ]}
                >
                  <Text style={{ color: "white" }}>{item.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <HotSpotsMap
          style={{ flex: 1 }}
          category={this.state.category}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          items={this.state.items}
          navigation={this.props.navigation}
          markerIcon={this.state.markerIcon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CategoryButton: {
    backgroundColor: "#EF5595",
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 12,
    marginHorizontal: 10,
    borderRadius: 4
  }
});

export default HotSpotsScreen;
