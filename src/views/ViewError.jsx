import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';

export default () => (
  <div class="con tc">
    <h1 class="headline">Error 404</h1>
    <p class="lead pb3">We can’t find what you’re looking for, sorry!</p>
    <Link to="/" class="btn btn-main">Go to home ⟶</Link>
  </div>
);
