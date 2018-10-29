import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { List, ListItem, Icon } from 'native-base';
import PopupDialog, { SlideAnimation, TextInput } from 'react-native-popup-dialog';
import navigateTo from '@actions/sideBarNav';

import { Styles, Images, Metrics, Colors } from '@theme/';
import styles from './styles';

import Language from './language';
import About from './about';
import DevLevel from './devLevel';
import DownloadSync from './downloadSync';
import PromoCode from './promoCode';
import Swipe from './swipe';
import Goal from './goal';
import Account from './account';
import ForgotPassword from './account/forgot';
import PromoCodeDialog from './account/promo';


const {
  replaceAt,
  popRoute,
} = actions;


class Setting extends Component {  // eslint-disable-line
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
      selectIndex: 1,
    };
  }
  onBack() {
    const { isDownloading } = this.props;
    if (!isDownloading) {
      this.popRoute();
    } else {
      Alert.alert('Sync is in progress. Please wait for it to complete');
    }
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
  getItem = (index) => {
    this.setState({ selectIndex: index});
  }
  render() {
    let rightView = null;
    if (this.state.selectIndex === 1) {
      rightView = <DevLevel />;
    } else if (this.state.selectIndex === 2) {
      rightView = (
        <Account
          onForgotPassword={() => this.forgotDialog.openDialog()}
          onPromoCode={() => this.promoDialog.openDialog()}
        />);
    } else if (this.state.selectIndex === 3) {
      rightView = <DownloadSync />;
    } else if (this.state.selectIndex === 4) {
      rightView = <Goal />;
    } else if (this.state.selectIndex === 6) {
      rightView = <Language />;
    } else if (this.state.selectIndex === 7) {
      rightView = <Swipe />;
    } else if (this.state.selectIndex === 8) {
      rightView = <About />;
    }

    return (
      <View style={[Styles.fullScreen, { flexDirection: 'column', backgroundColor: Colors.brandSecondary }]}>
        <View style={styles.headerView}>
          <Image source={Images.logo} resizeMode={'contain'} style={styles.headerViewLogo} />
          <View style={[Styles.center, styles.headerTitleView]}>
            <Text style={{ fontSize: Metrics.screenWidth / 40 }}>Settings</Text>
          </View>
          <View style={[Styles.right, styles.headerButtonView]}>
            <TouchableOpacity onPress={() => this.onBack()}>
              <View style={[Styles.center, { flexDirection: 'row' }]}>
                <Image
                  source={Images.bookIcon}
                  resizeMode={'stretch'}
                  style={{ width: Metrics.headerHeight * 0.7, height: Metrics.headerHeight * 0.4 }}
                />
                <Text style={{ color: Colors.titlePrimary, margin: Metrics.baseMargin, marginRight: Metrics.baseMargin * 2, fontSize: Metrics.screenWidth / 50 }}>Library</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Image source={Images.launchScreen} style={{ flex: 1, width: null, height: null }}>
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, marginHorizontal: 20, backgroundColor: Colors.brandSecondary }}>
            <ScrollView style={{ flex: 1 }}>
              <List style={{ flex: 1 }}>
                { this.state.selectIndex === 1 ?
                <ListItem iconRight button onPress={() => this.getItem(1)} style={styles.selectedItem}>
                  <Text style={styles.menuText}>Developmental Level</Text>                  
                  <Icon name="ios-arrow-forward" style={{ color: Colors.textThird }} />                  
                </ListItem> : 
                <ListItem button onPress={() => this.getItem(1)}>
                  <Text style={styles.menuText}>Developmental Level</Text>                                   
                </ListItem>
                }
                { this.state.selectIndex === 2 ?
                <ListItem iconRight button onPress={() => this.getItem(2)} style={styles.selectedItem}>
                  <Text style={styles.menuText}>Account</Text>                  
                  <Icon name="ios-arrow-forward" style={{ color: Colors.textThird }} />                  
                </ListItem> :
                <ListItem button onPress={() => this.getItem(2)}>
                  <Text style={styles.menuText}>Account</Text>                  
                </ListItem>
                }
                { this.state.selectIndex === 3 ?
                <ListItem iconRight button onPress={() => this.getItem(3)} style={styles.selectedItem}>
                  <Text style={styles.menuText}>Download & Sync</Text>                  
                  <Icon name="ios-arrow-forward" style={{ color: Colors.textThird }} />                 
                </ListItem> :
                <ListItem button onPress={() => this.getItem(3)}>
                  <Text style={styles.menuText}>Download & Sync</Text>                                   
                </ListItem>
                }
                { this.state.selectIndex === 4 ?
                <ListItem iconRight button onPress={() => this.getItem(4)} style={styles.selectedItem}>
                  <Text style={styles.menuText}>Goals</Text>                
                  <Icon name="ios-arrow-forward" style={{ color: Colors.textThird }} />
                </ListItem> :
                <ListItem button onPress={() => this.getItem(4)}>
                  <Text style={styles.menuText}>Goals</Text>                
                </ListItem>
                }
                { this.state.selectIndex === 6 ?                
                <ListItem iconRight button onPress={() => this.getItem(6)} style={styles.selectedItem}>
                  <Text style={styles.menuText}>Language</Text>
                  <Icon name="ios-arrow-forward" style={{ color: Colors.textThird }} />
                </ListItem> :
                <ListItem button onPress={() => this.getItem(6)}>
                  <Text style={styles.menuText}>Language</Text>
                </ListItem>
                }
                { this.state.selectIndex === 7 ? 
                <ListItem iconRight button onPress={() => this.getItem(7)} style={styles.selectedItem}>
                  <Text style={styles.menuText}>Page Turns</Text>                 
                  <Icon name="ios-arrow-forward" style={{ color: Colors.textThird }} />                  
                </ListItem> :
                <ListItem button onPress={() => this.getItem(7)}>
                  <Text style={styles.menuText}>Page Turns</Text>                 
                </ListItem>
                }
                { this.state.selectIndex === 8 ?
                <ListItem iconRight button onPress={() => this.getItem(8)} style={styles.selectedItem}>
                  <Text style={styles.menuText}>About the App</Text>                 
                  <Icon name="ios-arrow-forward" style={{ color: Colors.textThird }} />                  
                </ListItem> :
                <ListItem button onPress={() => this.getItem(8)}>
                  <Text style={styles.menuText}>About the App</Text>                 
                </ListItem>
                }
              </List>
            </ScrollView>
            <ScrollView style={{ flex: 1, paddingHorizontal: Metrics.doubleBaseMargin }}>
              {rightView}
            </ScrollView>
          </View>
        </Image>
        {this.renderForgotDialog()}
        {this.renderPromoDialog()}
      </View>
    );
  }
  renderForgotDialog() {
    return (
      <PopupDialog
        ref={(dialog) => { this.forgotDialog = dialog; }}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        width={Metrics.screenWidth / 2.1}
        height={Metrics.screenHeight / 2.3}
      >
        <ForgotPassword onClose={() => this.forgotDialog.closeDialog()} />
      </PopupDialog>
    );
  }
  renderPromoDialog() {
    return (
      <PopupDialog
        ref={(dialog) => { this.promoDialog = dialog; }}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        width={Metrics.screenWidth / 2.1}
        height={Metrics.screenHeight / 1.9}
      >
        <PromoCodeDialog onClose={() => this.promoDialog.closeDialog()} />
      </PopupDialog>
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
  isDownloading: state.sync.isDownloading,
});

export default connect(mapStateToProps, bindAction)(Setting);
