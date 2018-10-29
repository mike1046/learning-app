import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button, Radio } from 'native-base';
import { connect } from 'react-redux';
import { Metrics, Styles } from '@theme/';
import styles from './styles';
import { applyCoupon, purchaseSubscription } from '../../actions/Creators';

class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      coupon: '',
      selectedPlan: null,
    };
  }
  render() {
    const { selectedPlan } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: Metrics.screenHeight / 7, backgroundColor: '#f0f0f0', padding: 5 }}>
          <View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontSize: Metrics.screenHeight / 20 }}>Purchase Stories</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                <TextInput
                  style={{ height: Metrics.screenHeight / 15, fontSize: Metrics.screenHeight / 30, width: Metrics.screenWidth / 5, paddingBottom: 0 }}
                  placeholder="Coupon Code"
                  autoCapitalize="characters"
                  value={this.state.coupon}
                  onChangeText={coupon => this.setState({ coupon: coupon.toUpperCase() })}
                  underlineColorAndroid="transparent"
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.coupon) {
                    this.props.applyCoupon(this.state.coupon);
                  }
                }}
              >
                <Text style={{ color: '#1e398f', fontSize: Metrics.screenHeight / 30 }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            style={[Styles.buttonRadius, styles.purcharseButton]}
            textStyle={styles.purcharseButtonText}
            disabled={selectedPlan === null}
            onPress={() => this.props.purchase(Object.keys(this.props.couponValues[selectedPlan])[0], selectedPlan)}
          >
            PURCHASE
          </Button>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'space-between', flex: 1, padding: 5 }}>
          <View style={{ padding: 10 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#1e398f', fontSize: 22 }}>LIBRARY SUBSCRIPTION</Text>
            <Text style={{ textAlign: 'center', fontSize: Metrics.screenWidth / 45 }}>Get access to all ReadAskChat content.</Text>
            <Text style={{ textAlign: 'center', fontSize: Metrics.screenWidth / 45 }}>Currently contain 12 series totaling 36 stories, songs, poems and more being added.</Text>
            <Text style={{ textAlign: 'center', fontSize: Metrics.screenWidth / 45 }}>Includes "On the move!"</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Radio
                selected={this.state.selectedPlan === 0}
                onPress={() => this.setState({ selectedPlan: 0 })}
              />
              <Text style={{ fontSize: 20, color: '#1e398f', paddingHorizontal: 5 }}>
                {`$${this.props.couponValues[0][Object.keys(this.props.couponValues[0])[0]]}`}
              </Text>
              <Text>
                1 month subscription
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Radio
                selected={this.state.selectedPlan === 1}
                onPress={() => this.setState({ selectedPlan: 1 })}
              />
              <Text style={{ fontSize: 20, color: '#1e398f', paddingHorizontal: 5 }}>
                {`$${this.props.couponValues[1][Object.keys(this.props.couponValues[1])[0]]}`}
              </Text>
              <Text>
                1 year subscription - best value!
              </Text>
            </View>
          </View>
          <View>
            <Button
              style={[Styles.buttonRadius, styles.purcharseButton]}
              textStyle={styles.purcharseButtonText}
              onPress={this.props.dismissPurchase}
            >
              CANCEL
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    applyCoupon: coupon => dispatch(applyCoupon(coupon)),
    purchase: (subscrition, index) => dispatch(purchaseSubscription(subscrition, index)),
  };
}

function mapStateToProps(state) {
  const { couponValues, couponCode } = state.credential;
  return { couponValues, couponCode };
}

export default connect(mapStateToProps, bindAction)(Purchase);
