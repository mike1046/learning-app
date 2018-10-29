
import React from 'react';
import { Image, TextInput, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Text, Button, View } from 'native-base';
import theme from '../../themes/base-theme';

import { attemptRegister, setRegisterEmail, setRegisterCode, setRegisterPassword } from '@actions/Creators';
import { Images, Metrics, Styles, Colors } from '@theme/';
import styles from './styles';
import Terms from '../../Terms';

const {
  replaceAt,
} = actions;

const Register = (props) => {
  return (
    <View style={[Styles.fullScreen, { flexDirection: 'column', backgroundColor: Colors.brandSecondary }]}>
      <View style={[styles.headerView, { flexDirection: 'row', alignItems: 'center', paddingRight: 20 }]}>
        <Image source={Images.logo} resizeMode={'contain'} style={styles.headerViewLogo} />
        <TouchableOpacity
          onPress={() => props.backLogin()}
        >
          <Text style={{ fontSize: 20, color: 'blue', paddingBottom: 5 }}>Login</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={Images.launchScreen}
        resizeMode={'stretch'}
        style={{ flex: 1, width: null, height: null }}
      >
        <View style={{ flex: 1, margin: Metrics.doubleBaseMargin, /*padding: Metrics.baseMargin*/ backgroundColor: Colors.brandPrimary }}>
          <Text style={{ fontSize: Metrics.screenWidth / 32, color: Colors.titlePrimary, padding: Metrics.doubleBasePadding, lineHeight: 36 }}>
            Start Reading Today!
          </Text>
          {props.error && <View style={{ padding: 10, backgroundColor: Colors.warningPrimary }}>
            <Text>{props.error}</Text>
          </View>}
          <View style={{ flexDirection: 'row', marginHorizontal: Metrics.doubleBaseMargin, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View style={{ marginHorizontal: 5, padding: 8, borderColor: 'grey', borderBottomWidth: 1 }}>
                <TextInput
                  style={{ height: Metrics.screenWidth / 20, width: Metrics.screenWidth * 0.8, fontSize: Metrics.screenWidth / 35, padding: 0 }}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType={'email-address'}
                  placeholder="Email"
                  onChangeText={text => props.setRegisterEmail(text)}
                />
              </View>
              <View style={{ marginHorizontal: 5, padding: 8, borderColor: 'grey', borderBottomWidth: 1 }}>
                <TextInput
                  style={{ height: Metrics.screenWidth / 20, width: Metrics.screenWidth * 0.4, fontSize: Metrics.screenWidth / 35, padding: 0 }}
                  underlineColorAndroid="transparent"
                  autoCapitalize="characters"
                  keyboardType={'default'}
                  placeholder="Organization Code (optional)"
                  onChangeText={code => props.setRegisterCode(code)}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View style={{ marginHorizontal: 5, padding: 8, borderColor: 'grey', borderBottomWidth: 1 }}>
                <TextInput
                  style={{ height: Metrics.screenWidth / 20, width: Metrics.screenWidth * 0.8, fontSize: Metrics.screenWidth / 35, padding: 0 }}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  secureTextEntry
                  keyboardType={'default'}
                  placeholder="Create Password"
                  onChangeText={pass => props.setRegisterPassword(pass)}
                />
              </View>
            </View>
          </View>
          <ScrollView style={{ marginHorizontal: Metrics.doubleBasePadding, flex: 1, marginTop: 10, /*padding: 5*/ paddingTop:5, paddingBottom:5 }}>
            <Text style={{ fontSize: 20, color: 'grey' }}>Terms and Conditions</Text>
            <Text style={{ color: 'grey', marginTop: 10, textAlign: 'justify', paddingBottom: theme.screenHeight / 10 }}>{Terms}</Text>
          </ScrollView>
        </View>
      </Image>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: theme.screenHeight / 10,
          backgroundColor: '#f0f0f0',
          width: Metrics.screenWidth,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 30,
        }}
      >
        <Text>By tapping on REGISTER, you agree the Terms and Conditions.</Text>
        {props.attempting ? <ActivityIndicator size={'large'} /> :
        <View style={{ flex: 0 }}>
          <Button
            large
            style={[Styles.buttonRadius, { width: Metrics.screenWidth / 7, flex: 1, margin: 3, shadowOpacity:0}]}
            textStyle={{ fontSize: Metrics.screenWidth / 40, paddingBottom: 8 }}
            onPress={() => props.attemptRegister(props.email, props.registerPassword, props.registerCode)}
          >Register
          </Button>
        </View>
        }
      </View>
    </View>
  );
};

Register.propTypes = {
  attemptRegister: React.PropTypes.func,
  backLogin: React.PropTypes.func,
  setRegisterEmail: React.PropTypes.func,
};

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    attemptRegister: (email, password, code) => dispatch(attemptRegister(email, password, code)),
    backLogin: () => dispatch(replaceAt('register', { key: 'login' }, 'global')),
    setRegisterEmail: email => dispatch(setRegisterEmail(email)),
    setRegisterCode: code => dispatch(setRegisterCode(code)),
    setRegisterPassword: pass => dispatch(setRegisterPassword(pass)),
    dispatch,
  };
}

function mapStateToProps(state) {
  const { attempting, error, email, registered, registerCode, registerPassword } = state.RegisterReducer;
  return { attempting, error, email, registered, registerCode, registerPassword };
}

export default connect(mapStateToProps, bindActions)(Register);
