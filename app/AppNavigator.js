
import React, { Component } from 'react';
import { BackAndroid, Platform, StatusBar, View, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from '@actions/Creators';

import Login from '@components/login';
import SplashPage from '@components/splashscreen';
import Home from '@components/home';
import ShowPage from '@components/showPage';
import SideBar from '@components/sideBar';
import Setting from '@components/setting';
import Register from '@components/register';
import VerifyAccount from '@components/verify-account';
import ForgotPassword from '@components/forgot-password';
import SetPassword from '@components/set-password';
import { statusBarColor } from '@theme/base-theme';


const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;
      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }
      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (!this._drawer) {
      return;
    }
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'verify-account':
        return <VerifyAccount />;
      case 'forgot-password':
        return <ForgotPassword />;
      case 'set-password':
        return <SetPassword />;
      case 'home':
        return <Home />;
      case 'showPage':
        return <ShowPage />;
      case 'setting':
        return <Setting />;
      default :
        return <Login />;
    }
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <View
        style={{ flex: 1 }}
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="light-content"
          hidden
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});


export default connect(mapStateToProps, bindAction)(AppNavigator);
