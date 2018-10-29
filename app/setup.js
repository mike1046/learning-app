
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';

import App from './App';
import configureStore from './configureStore';

function setup():React.Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }
    // componentDidMount() {
    //   codePush.sync({
    //     updateDialog: false,
    //     installMode: codePush.InstallMode.IMMEDIATE,
    //   });
    // }
    render() {
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }
  return codePush(Root);
}

export default setup;
