import { location } from '@hyperapp/router';

export const state = {
  location: location.state,
  count: 0,
};

export const actions = {
  location: location.actions,
  down: value => state => ({ count: state.count - value }),
  up: value => state => ({ count: state.count + value }),
};
