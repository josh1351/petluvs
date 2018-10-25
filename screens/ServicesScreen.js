import React from 'react';
import { Text, View } from 'react-native';
import GeneralStyles from '../Styles/General'
import SearchBar from '../components/SearchBar'
import SearchListing from '../components/SearchListing'
var data = [{name:'Bark N Lounge Pet Resort', Type:'Boarding', Distance:'1.6',ClosingTime:'8',Rating:'3.0'},
    {name:'Petsmart', Type:'Pet Store', Distance:'3',ClosingTime:'8',Rating:'4.0'},
    {name:'Petco Animal Supplie', Type:'Pet Store', Distance:'3.4',ClosingTime:'8',Rating:'2.0'},
    {name:'Wauaugua Animal Hospital', Type:'Animal Hospital', Distance:'3.4',ClosingTime:'12',Rating:'3.7'},
    {name:'TurnKey Pet and Home Sitting', Type:'Pet Sitting', Distance:'3.4',ClosingTime:'8',Rating:'3.2'},
    {name:'Bark N Lounge Pet Resort', Type:'Boarding', Distance:'1.6',ClosingTime:'8',Rating:'3.0'},
    {name:'Petsmart', Type:'Pet Store', Distance:'3',ClosingTime:'8',Rating:'4.0'},
    {name:'Petco Animal Supplie', Type:'Pet Store', Distance:'3.4',ClosingTime:'8',Rating:'2.0'},
    {name:'Wauaugua Animal Hospital', Type:'Animal Hospital', Distance:'3.4',ClosingTime:'12',Rating:'3.7'},
    {name:'TurnKey Pet and Home Sitting', Type:'Pet Sitting', Distance:'3.4',ClosingTime:'8',Rating:'3.2'},
];

class ServicesScreen extends React.Component {
    render() {
      return (
        <View style={{paddingTop:20,}}>
          <View style={{paddingHorizontal: 20,}}>
            <SearchBar/>
          </View>
          <SearchListing data={data}/>
        </View>
      );
    }
  }

  class MyListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      const textColor = this.props.selected ? "red" : "black";
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View>
            <Text style={{ color: textColor }}>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
  
  class MultiSelectList extends React.PureComponent {
    //state = {selected: new Map(state.selected): Map<string, boolean>};
  
    _keyExtractor = (item, name ) => item.name;
  
    _onPressItem = (id) => {
      // updater functions are preferred for transactional updates
      this.setState((state) => {
        // copy the map rather than modifying state.
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id)); // toggle
        return {selected};
      });
    };
  
    _renderItem = ({item}) => (
      <MyListItem
        id={item.id}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        title={item.title}
      />
    );
  
    render() {
      return (
        <FlatList
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
  }
  
  export default ServicesScreen;