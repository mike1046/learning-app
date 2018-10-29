import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, View, Text, WebView, Linking } from 'react-native';
import { Icon } from 'native-base';
import navigateTo from '@actions/sideBarNav';

import { Styles, Images, Metrics, Colors } from '@theme/';

const {
  replaceAt,
  popRoute,
} = actions;


class About extends Component {  // eslint-disable-line
  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    replaceAt: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  replaceRoute(route) {
    this.props.replaceAt('home', { key: route }, 'global');
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'showPage');
  }
  render() {
    return (
      <View style={{ flex: 1, marginLeft: Metrics.doubleBaseMargin }}>
        <View style={{ flexDirection: 'row', marginTop: Metrics.baseMargin, justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: Colors.textPrimary, fontWeight: 'bold', fontSize: Metrics.screenWidth / 40 }}>
              ReadAskChat
            </Text>
            <Text style={{ color: Colors.textSecondary, fontSize: Metrics.screenWidth / 50 }}>
              Version 2.x
            </Text>
          </View>
        </View>
        {this.props.connectionState.toLowerCase() === 'wifi' && <WebView
          source={{ uri: 'https://player.vimeo.com/video/229298776' }}
          style={{ height: 200, marginTop: 12 }}
        />
        }
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: Colors.textSecondary }} >
          <Text
            style={{ color: Colors.textFourth }}
            onPress={() => Linking.openURL('https://readaskchat.net/')}
          >
          readaskchat.net
          </Text>
        </View>
        <Text style={{ color: Colors.textSecondary, marginVertical: Metrics.doubleBaseMargin, fontSize: Metrics.screenWidth / 43, textAlign: 'justify' }}>
          {this.props.copyright}
        </Text>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  connectionState: state.connectionReducer.connectionState,
  copyright: state.credential.copyright,
});

export default connect(mapStateToProps, bindAction)(About);
