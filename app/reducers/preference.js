import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../actions/ActionTypes';

export const INITIAL_STATE = Immutable({
  lastSync: new Date().getTime(),
  language: 'll',
  developmentalLevel: 'baby',
  swipeEnabled: true,
});

const setPreference = (state, action) => ({
  ...state,
  [action.key]: action.value,
});

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.SET_PREFERENCE]: setPreference,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
