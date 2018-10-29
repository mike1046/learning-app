import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button, Icon, List, ListItem, Input } from 'native-base';
import navigateTo from '@actions/sideBarNav';
import {
  attemptCredentialUser,
  setCredentialUser,
  setCredentialLoggedIn,
  setCredentialEmail,
  setCredentialToken,
  setForgotEmail,
  attemptForgotPassword,
  packsReset,
  logout,
} from '@actions/Creators';

import { Styles, Images, Metrics, Colors } from '@theme/';
import styles from './styles';

const {
  replaceAtIndex,
  popRoute,
} = actions;


class Account extends Component {  // eslint-disable-line
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
  componentWillMount() {
    this.props.attemptCredentialUser();
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

  promoCode() {
    this.props.onPromoCode();
  }

  loginOther() {
    Alert.alert('Login as different user?', 'This will log out the current user and the current user\'s downloaded packs will be removed. Are you sure?', [
      { text: 'No', onPress: () => {} },
      { text: 'Yes', onPress: () => this.props.loginOther() },
    ]);
  }

  forgotPassword() {
    this.props.onForgotPassword();
  }

  renderButtons() {
    return (
      <View style={[{ flexDirection: 'column', paddingBottom: Metrics.screenHeight * 0.05 }]}>
        <TouchableOpacity
          style={[Styles.center, styles.buttonAccount]}
          onPress={() => this.loginOther()}
        >
          <Text style={{ color: Colors.titleSecondary, fontSize: Metrics.screenWidth / 50 }}>
            Logout
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[Styles.center, styles.buttonAccount]}
          onPress={() => this.forgotPassword()}
        >
          <Text style={{ color: Colors.titleSecondary, fontSize: Metrics.screenWidth / 50 }}>
            Forgot Password
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[Styles.center, styles.buttonAccount]}
          onPress={() => this.promoCode()}
        >
          <Text style={{ color: Colors.titleSecondary, fontSize: Metrics.screenWidth / 50 }}>
            New Oganization Code
          </Text>
        </TouchableOpacity>
      </View>);
  }
  hasPromoCode() {
    return this.props.credential.user.promo.code !== '';
  }
  render() {
    return (
      <View style={{ flex: 1, marginLeft: Metrics.doubleBaseMargin  }}>
        <ScrollView>
          <Text style={{ color: Colors.titlePrimary, fontWeight: 'bold', fontSize: Metrics.screenWidth / 40, marginTop: Metrics.baseMargin }}>Account</Text>
          <List>
            <ListItem style={styles.listItem}>
              <View >
                <Text style={styles.listItemTextTitle}>Email</Text>
                <Text style={styles.listItemTextBody}>{this.props.credential.email}</Text>
              </View>
            </ListItem>
            {this.hasPromoCode() && <View><ListItem style={styles.listItem}>
              <View >
                <Text style={styles.listItemTextTitle}>Organization Code</Text>
                <Text style={styles.listItemTextBody}>{this.props.credential.user.promo.code}</Text>
              </View>
            </ListItem>
            <ListItem style={styles.listItem}>
              <View >
                <Text style={styles.listItemTextTitle}>Org Code Expiration Date</Text>
                <Text style={styles.listItemTextBody}>{this.props.credential.user.promo.expireAt}</Text>
              </View>
            </ListItem>
            <ListItem style={styles.listItem}>
              <View >
                <Text style={styles.listItemTextTitle}>Organization</Text>
                <Text style={styles.listItemTextBody}>{this.props.credential.user.promo.organization}</Text>
              </View>
            </ListItem>
          </View>}
          </List>
          {this.renderButtons()}
        </ScrollView>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: key => dispatch(popRoute(key)),
    attemptCredentialUser: key => dispatch(attemptCredentialUser(key)),
    setUser: user => dispatch(setCredentialUser(user)),
    setForgotEmail: email => dispatch(setForgotEmail(email)),
    attemptForgotPassword: email => dispatch(attemptForgotPassword(email)),
    loginOther: () => {
      dispatch(setCredentialLoggedIn(false));
      dispatch(setCredentialToken(''));
      dispatch(setCredentialEmail(''));
      dispatch(packsReset());
      dispatch(logout());
      dispatch(replaceAtIndex(0, { key: 'login' }, 'global'));
    },
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  credential: state.credential,
});

export default connect(mapStateToProps, bindAction)(Account);
