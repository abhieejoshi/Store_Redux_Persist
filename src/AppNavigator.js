import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScene} from 'home';
import {CartScene} from 'cart';
import {connect} from 'react-redux';

const HomeStack = createStackNavigator();

class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  homeStack() {
    return (
      <HomeStack.Navigator
        initialRoutName="HomeScene"
        screenOptions={{headerShown: false}}
        mode="modal">
        <HomeStack.Screen name="HomeScene" component={HomeScene} />
        <HomeStack.Screen name="CartScene" component={CartScene} />
      </HomeStack.Navigator>
    );
  }

  render() {
    // console.warn(this.props);
    return <NavigationContainer>{this.homeStack()}</NavigationContainer>;
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user_data_reducer,
  };
}

export default connect(mapStateToProps, null)(AppNavigator);
