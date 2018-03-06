import { location } from '@hyperapp/router';

export const state = {
  location: location.state,
  __count: 0,
};

export const actions = {
  location: location.actions,
  __down: value => state => ({ __count: state.__count - value }),
  __up: value => state => ({ __count: state.__count + value }),
};
