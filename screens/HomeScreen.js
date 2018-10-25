import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import GeneralStyles from "../Styles/General";
import PlaydateItem from "../components/PlaydateItem";
import ReviewItem from "../components/ReviewItem";
import FeaturedServices from "../components/FeaturedServices";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ScrollView
        style={GeneralStyles.ScreenContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      >
        {/*<SearchBar />*/}
        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            height: "4%"
          }}
        >
          <TouchableOpacity
            style={{ height: "95%" }}
            onPress={() => this.props.navigation.navigate("Website")}
          >
            <Image
              style={{ resizeMode: "contain", height: "100%" }}
              source={require("./../assets/petluvs.png")}
            />
          </TouchableOpacity>
        </View>

        <PlaydateItem
          Name="Frances Hughes"
          TimeLeft="36"
          Location="Lake Lane Park"
          MilesAway="5.6"
        />
        <ReviewItem
          Name="Walter Campbell"
          BusinessName="Pup Suds Pet Grooming"
          ReviewText="Works perfectly."
        />
        <ReviewItem
          Name="Loretta French"
          BusinessName="The Pawsitive Co"
          ReviewText="I love that I get a nice looking collar and it also helps to feed another animal all at the same time."
        />
        <FeaturedServices />
        <PlaydateItem
          Name="Nelle Pope"
          TimeLeft="45"
          Location="Linwoodside Dog Park"
          MilesAway="2"
        />
        <PlaydateItem
          Name="Bob Snyder"
          TimeLeft="12"
          Location="Winchester Grove Park"
          MilesAway="1.2"
        />
        <PlaydateItem
          Name="Shelby Smith"
          TimeLeft="23"
          Location="Pups N Cups Icecream"
          MilesAway="5.6"
        />
      </ScrollView>
    );
  }
}

export default HomeScreen;
