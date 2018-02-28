import { h } from 'hyperapp';
import { Link, Route, location } from '@hyperapp/router';

// XXX: Workaround until features land: https://github.com/hyperapp/router/issues/48 + https://github.com/hyperapp/hyperapp/pull/606
// export default (state, actions) => (
export default (state, actions) => (attributes, children) => (
  <div>
    <h1>Home</h1>
    <p>{state.count}</p>
    <button class="btn" onclick={() => actions.down(1)}>-</button>
    <button class="btn" onclick={() => actions.up(1)}>+</button>
  </div>
);
