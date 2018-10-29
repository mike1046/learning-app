import React from 'react';
import { View, ScrollView, Text, TextInput, ActivityIndicator } from 'react-native';
import { Button, Input } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Metrics, Colors, Styles } from '@theme/';
import styles from '../styles';
import {
  attemptPromoCode,
} from '@actions/Creators';

const {
  replaceAt,
} = actions;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionalCode: '',
    };
  }
  componentWillMount() {
    this.setState({
      promotionalCode: this.props.user.promo.code,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.done && this.props.done && !this.props.error) {
      setTimeout(() => {
        this.props.onClose();
      }, 1 * 1000);
    }
    if (nextProps.error) {
      this.setState({ promotionalCode: this.props.user.promo.code });
    }
  }
  renderLoading() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  renderButtons() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: Metrics.baseMargin }}>
        <Button
          style={[Styles.buttonRadius, styles.cancelButton]}
          textStyle={styles.cancelButtonText}
          onPress={() => this.props.onClose()}
        >
          Cancel
        </Button>
        <Button
          style={[Styles.buttonRadius, styles.downloadButton]}
          textStyle={styles.downloadButtonText}
          onPress={() => this.props.attemptPromoCode(this.state.promotionalCode)}
        >
          Submit
        </Button>
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, marginLeft: Metrics.doubleBaseMargin, marginRight: Metrics.doubleBaseMargin, marginTop: Metrics.baseMargin, marginBottom: Metrics.baseMargin }}>
        <View style={{ flex: 1 }}>
          {(this.props.done && !this.props.error) && <View style={{ padding: 10, backgroundColor: Colors.successPrimary }}>
            <Text>Organization Code updated.</Text>
          </View>}
          {this.props.error && <View style={{ padding: 10, backgroundColor: Colors.errorPrimary }}>
            <Text>{this.props.error.message}</Text>
          </View>}
          <ScrollView style={{ flex: 1 }}>
            <Text>Organization Code</Text>
            <Input
              style={{ borderWidth: 1, borderColor: '#c0c0c0', marginTop: 10, height: Metrics.screenWidth / 15, width: Metrics.screenWidth * 0.4, fontSize: Metrics.screenWidth / 35 }}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Organization Code"
              value={this.state.promotionalCode}
              onChangeText={promotionalCode => this.setState({ promotionalCode })}
            />
          </ScrollView>
          {this.props.attempting && this.renderLoading()}
          {this.props.attempting || this.renderButtons()}
        </View>
      </View>
    );
  }
}
function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    attemptPromoCode: promotionalCode => dispatch(attemptPromoCode(promotionalCode)),
    dispatch,
  };
}

function mapStateToProps(state) {
  const { user } = state.credential;
  const { attempting, error, code, done } = state.promoCode;
  return { attempting, error, code, done, user };
}
export default connect(mapStateToProps, bindActions)(ForgotPassword);
