
import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

import { connect } from 'react-redux';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import AppNavigator from './AppNavigator';
import { startupApp, setPreference } from './actions/Creators';
import { POOSH_WOOSH } from './Constants';

class App extends Component {
  componentDidMount() {
    this.props.startupApp();
    this.props.setPreference('language', this.parseLanguage(DeviceInfo.getDeviceLocale()));
    // if (Platform.OS === 'android') {
    //   Pushwoosh.init({
    //     pw_appid: POOSH_WOOSH.pw_appid,
    //     project_number: POOSH_WOOSH.project_number,
    //   });
    // } else {
    //   Pushwoosh.init({
    //     pw_appid: POOSH_WOOSH.pw_appid,
    //   });
    // }
    // Pushwoosh.register(
    //   (token) => {
    //     console.log('Registered for pushes:', token);
    //   },
    //   (error) => {
    //     console.error('Failed to register:', error);
    //   },
    // );
  }
  parseLanguage(locale) {
    const language = locale.split('-')[0].toString().toLowerCase();
    const availableLanguages = ['en', 'es'];
    // default language to english
    if (availableLanguages.indexOf(language) < 0) {
      return 'en';
    }
    return language;
  }
  render() {
    return <AppNavigator />;
  }
}

const bindActions = dispatch => ({
  startupApp: () => dispatch(startupApp()),
  setPreference: (key, value) => dispatch(setPreference(key, value)),
});

export default connect(null, bindActions)(App);
