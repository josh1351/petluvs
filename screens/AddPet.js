import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import DatePicker from "react-native-datepicker";
import Header from "../components/Header";
import CheckBox from "react-native-checkbox";
import ModalDropdown from "react-native-modal-dropdown";
import { ImagePicker, Permissions } from "expo";
import { addPet } from "../store/actions/index";

const { height } = Dimensions.get("window");

const speciesOptions = ["Cat", "Dog", "Bird", "Rabbit"];
const breedOptions = ["breed1", "breed2", "breed3", "breed4"];

class AddPet extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    tabBarVisible: true
  };

  constructor(props) {
    super(props);
    this.state = {
      petName: "",
      petSpecies: "",
      petBreed: "",
      petAttributes: {
        insured: false,
        fixed: false,
        fullyVaccinated: false
      },
      date: "2016-05-15",
      image: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loading, errors } = nextProps;
    if (errors === null && loading === false) {
      this.props.navigation.navigate("Profile");
    }
    if (errors !== null) {
      // Need to show erro message in here
      Alert.alert("Errors", "Plese fix the errorss");
    }
  }

  //need to pass the data
  addPethandler = () => {
    const {
      petName,
      petBreed,
      petAttributes,
      date,
      image,
      petSpecies
    } = this.state;

    // if (petName.length < 2 ) {
    //     alert('Please Enter Valid pet name');
    // }
    const newPet = {
      name: petName,
      species: petSpecies,
      breed: petBreed,
      birthday: date,
      attributes: petAttributes,
      image
    };
    this.props.addPet(newPet);
  };

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      console.log(`Result ${result}`);
      this.setState({ image: result.uri });
    }
  };

  pickSpeciesHandler = (i, value) => {
    this.setState({
      petSpecies: value
    });
  };

  pickBreedHandler = (i, value) => {
    this.setState({
      petBreed: value
    });
  };

  renderHeader() {
    return <Header navigation={this.props.navigation} title={"Add New Pet"} />;
  }

  render() {
    if (this.props.loading === true) {
      return (
        <View style={styles.activityIndContainer}>
          <ActivityIndicator size="large" color="#0000ff" />;
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {this.renderHeader()}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        >
          <View>
            <Text style={styles.textLabel}>Pet's Name</Text>
            <View style={styles.ViewShadow}>
              <TextInput
                fontSize={14}
                style={styles.TextInput}
                placeholder="Bella,Oliver,Spot etc."
                placeholderTextColor="gray"
                autoCorrect={false}
                autoCapitalize="none"
                selectionColor="gray"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={petName => this.setState({ petName })}
              />
            </View>
          </View>
          <View>
            <Text style={styles.textLabel}>Pet Species</Text>
            <View style={styles.ViewShadow}>
              <ModalDropdown
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  height: height * 0.07,
                  justifyContent: "center"
                }}
                options={speciesOptions}
                dropdownStyle={{ width: "90%", justifyContent: "center" }}
                defaultValue={"Choose one"}
                textStyle={{ paddingLeft: 10, color: "grey" }}
                onSelect={(i, value) => this.pickSpeciesHandler(i, value)}
              />
              <Image
                style={styles.dropDown}
                source={require("./../assets/dropdown.png")}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Pet Breed</Text>
              <View style={styles.ViewShadow}>
                <ModalDropdown
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    height: height * 0.07,
                    justifyContent: "center"
                  }}
                  options={breedOptions}
                  dropdownStyle={{ width: "90%" }}
                  defaultValue={"Must choose species first"}
                  textStyle={{ paddingLeft: 10, color: "grey" }}
                  onSelect={(i, value) => this.pickBreedHandler(i, value)}
                />
                <Image
                  style={styles.dropDown}
                  source={require("./../assets/dropdown.png")}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textLabel}>Pet Birthdate</Text>
              <View style={styles.ViewShadow}>
                <DatePicker
                  style={{ backgroundColor: "white", width: "100%" }}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="1990-01-01"
                  maxDate="2019-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconSource={require("../assets/startTimeFieldIcon.png")}
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 10,
                      width: 18,
                      height: 18,
                      marginLeft: 0,
                      alignItems: "center"
                    },
                    dateInput: {
                      backgroundColor: "white",
                      borderColor: "white",
                      paddingRight: "50%"
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={date => {
                    this.setState({ date });
                  }}
                />
              </View>
            </View>
            <View>
              <Text style={{ marginTop: 15, marginLeft: 15 }}>
                Pet Attributes
              </Text>
              <Text style={{ fontSize: 10, marginLeft: 15, opacity: 0.5 }}>
                Check all that apply
              </Text>
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                <CheckBox
                  label="Insured"
                  checkedImage={require("../assets/check.png")}
                  uncheckedImage={require("../assets/uncheck.png")}
                  onChange={checked =>
                    this.setState({
                      petAttributes: {
                        ...this.state.petAttributes,
                        insured: checked
                      }
                    })
                  }
                />
                <CheckBox
                  label="Fixed"
                  checkedImage={require("../assets/check.png")}
                  uncheckedImage={require("../assets/uncheck.png")}
                  onChange={checked =>
                    this.setState({
                      petAttributes: {
                        ...this.state.petAttributes,
                        fixed: checked
                      }
                    })
                  }
                />
                <CheckBox
                  label="Fully vaccinated"
                  checkedImage={require("../assets/check.png")}
                  uncheckedImage={require("../assets/uncheck.png")}
                  onChange={checked =>
                    this.setState({
                      petAttributes: {
                        ...this.state.petAttributes,
                        fullyVaccinated: checked
                      }
                    })
                  }
                />
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={this._pickImage}>
                <Image
                  style={styles.profileImage}
                  source={require("../assets/group2.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.addPethandler}>
              <View style={styles.ButtonView}>
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Add Pet</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%"
  },
  textLabel: {
    margin: 15
  },
  ViewShadow: {
    flexDirection: "row",
    marginHorizontal: 15,
    borderColor: "#000",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: "#e55595"
  },
  dropDown: {
    position: "absolute",
    right: 10,
    alignSelf: "center"
  },
  TextInput: {
    flex: 1,
    height: height * 0.07,
    backgroundColor: "#FFFFFF",
    color: "gray",
    paddingLeft: 10
  },
  profileImage: {
    flex: 1,
    resizeMode: "contain",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  ButtonView: {
    backgroundColor: "#e55595",
    height: height * 0.07,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  activityIndContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "pink"
  }
});

const mapStateToProps = state => ({
  loading: state.pets.loading,
  errors: state.pets.errors
});

export default connect(
  mapStateToProps,
  { addPet }
)(AddPet);
