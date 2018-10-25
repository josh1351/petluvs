import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { AppLoading, Asset } from "expo";

class AuthLoadingScreen extends React.Component {
  state = {
    isLoadingComplete: false
  };

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "https://placeimg.com/640/640/nature",
        "https://placeimg.com/640/640/people",
        "https://placeimg.com/640/640/animals",
        "https://placeimg.com/640/640/beer",
        require("../assets/slider2.png"),
        require("../assets/slider3.png"),
        require("../assets/slider1.png"),
        require("../assets/LocationPhoto1.png"),
        require("../assets/login.png"),
        require("../assets/loginLogo.png"),
        require("../assets/createPlaydateButton.png"),
        require("../assets/createBreederEventButton.png"),
        require("../assets/addPetIcon.png"),
        require("../assets/backIcon.png"),
        require("../assets/notificationIcon.png"),
        require("../assets/cross.png"),
        require("../assets/edit.png"),
        require("../assets/PetImage.png")
      ])
    ]);

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.log(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    this.bootstrapAsync();
  };

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("token");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate('Auth')
    userToken
      ? this.props.navigation.navigate("App")
      : this.props.navigation.navigate("Auth");
  };

  // Render any loading content that you like here
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "pink"
  }
});
export default AuthLoadingScreen;
