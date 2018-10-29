
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer';
import ForgotPasswordReducer from './ForgotPasswordReducer';
import SetPasswordReducer from './SetPasswordReducer';
import packsReducer from './packsReducer';
import credential from './credential';
import preference from './preference';
import promoCode from './promo';
import sync from './sync';
import startup from './startup';
import stamp from './stamp';
import connectionReducer from './connectionReducer';

export default combineReducers({
  preference,
  promoCode,
  sync,
  stamp,
  startup,
  drawer,
  credential,
  cardNavigation,
  ForgotPasswordReducer,
  SetPasswordReducer,
  RegisterReducer,
  LoginReducer,
  packsReducer,
  connectionReducer,
});
