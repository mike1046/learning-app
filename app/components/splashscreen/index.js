import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { Images, Metrics } from '@theme/';

const {
  replaceAt,
} = actions;

class SplashPage extends Component {
  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  componentWillMount() {
    setTimeout(() => {
      this.replaceRoute('login');
    }, 1500);
  }
  replaceRoute(route) {
    this.props.replaceAt('splashscreen', { key: route }, this.props.navigation.key);
  }
  render() {
    return (
      <Image
        source={Images.launchScreen} resizeMode={'stretch'}
        style={{ width: Metrics.screenWidth, height: Metrics.screenHeight, flex: 1 }}
      />
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}
const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});
export default connect(mapStateToProps, bindActions)(SplashPage);
