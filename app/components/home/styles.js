import { Colors, Metrics } from '@theme/';

const React = require('react-native');

const { StyleSheet, Platform } = React;


module.exports = StyleSheet.create({
  shadowStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  offlineImage: {
    width: Metrics.screenWidth / 20,
    height: Metrics.screenWidth / 20,
    marginHorizontal: 20,
  },
  cancelButtonText: {
    fontSize: Metrics.screenWidth / 50,
    color: 'rgba(73,142,223,1)',
    padding: Metrics.screenWidth * 0.001,
  },
  downloadButtonText: {
    fontSize: Metrics.screenWidth / 50,
    color: 'white',
  },
  cancelButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    height: Metrics.screenWidth / 20,
    flex: 1,
    marginRight: 10,
  },
  downloadButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(73,142,223,1)',
    height: Metrics.screenWidth / 20,
    flex: 1,
    shadowOpacity:0,
  },
  bottomTransView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Metrics.screenWidth / 25,
    backgroundColor: 'rgba(68, 68, 68, 0.45)',
    padding: (Platform.os === 'ios') ? 15 : 10,
  },
  bottomCredit: {
    fontSize: Metrics.screenWidth / 60,
    color: 'white',
  },
  bottomHeart: {
    fontSize: Metrics.screenWidth / 37,
    color: 'white',
  },
  bottomNameText: {
    fontWeight: 'bold',
    fontSize: Metrics.screenWidth / 45,
    color: 'white',
  },
  itemImage: {
    height: (Metrics.screenWidth * 0.25 - 10),
    marginBottom: 10,
    marginHorizontal: 5,
  },
  rowBody: {
    height: Metrics.screenWidth * 0.25,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  rowTitleText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: Metrics.screenWidth * 0.025,
  },
  rowTitleIcon: {
    color: 'grey',
    fontSize: Metrics.screenWidth * 0.04,
  },
  rowTitleView: {
    height: Metrics.screenWidth * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  rowTitleArea: {
    flex: 1,
  },
  rowInfoArea: {
    flexDirection: 'row',
  },
  rowLanguage: {
    color: '#0D47A1',
    fontWeight: 'bold',
    paddingTop: 5,
    fontSize: Metrics.screenWidth * 0.020,
    marginRight: 10,
  },
  rowView: {
    height: Metrics.screenWidth * 0.3,
    backgroundColor: '#F2F2F2',
    marginTop: 20,
  },
  rowDownloadView: {
    height: Metrics.screenWidth * 0.3,
    backgroundColor: '#F2F2F2',
    marginTop: 20,
  },
  headerView: {
    height: Metrics.headerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.brandPrimary,
  },
  headerViewLogo: {
    width: Metrics.screenWidth * 0.33,
    height: Metrics.headerHeight,
  },
  headerPopView: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#AAA',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    width: Metrics.screenWidth * 0.33,
    paddingHorizontal: 5,
  },
  headerButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerButtonInner: {
    // alignItems: 'center',
    padding: Metrics.screenWidth * 0.015,
    // paddingLeft: Metrics.screenWidth * 0.05,
    paddingRight: Metrics.screenWidth * 0.05,
  },
  headerSettingButtonImage: {
    width: (Metrics.screenWidth / 15 / 1.8),
    height: (Metrics.screenWidth / 15 / 1.8),
  },
  headerLogoutButtonImage: {
    width: (Metrics.screenWidth / 15 / 1.8),
    height: (Metrics.screenWidth / 15 / 1.8),
  },
  headerPopText: {
    color: '#AAA',
    fontWeight: 'bold',
    fontSize: Metrics.screenWidth / 50,
  },
  typeSelect: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomImage: {
    width: Metrics.screenWidth,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Metrics.screenWidth / 4,
  },
  segmentControl: {
    fontSize: Metrics.screenWidth / 40,
    fontWeight: 'bold',
    fontFamily: 'Snell Roundhand',
  },
  purcharseButton: {
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: '#1d66c7',
    width: Metrics.screenWidth / 5.6,
    height: Metrics.screenWidth / 20,
  },
  purcharseButtonText: {
    fontSize: Metrics.screenWidth / 50,
    // padding: Metrics.screenWidth * 0.001,
    color: 'white',
  },
});
