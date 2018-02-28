import { h } from 'hyperapp';
import { Link, Switch, Route } from '@hyperapp/router';
import ViewHomepage from './views/ViewHomepage';
import ViewPostsList from './views/ViewPostsList';
import ViewAbout from './views/ViewAbout';
import ViewError from './views/ViewError';

// TODO: Figure out how to do dynamic imports/routes (on both rollup and hyperapp sides)
// const ViewAbout = () => import('./views/ViewAbout');
// const ViewError = () => import('./views/ViewError');

// export default state => (
export default (state, actions) => (
  <div class="con">
    <button class="icon-menu btn-clear dn-l"></button>
    <nav class="navbar-mini df">
      <Link class="nav-link logo" to="/">Max Milton</Link>
      <Link class="nav-link" to="/posts">All Posts</Link>
      <Link class="nav-link" to="/quick-tips">Quick Tips</Link>
      <Link class="nav-link ml-auto" to="/about">About</Link>
    </nav>

    <Switch>
      <Route path="/" render={ViewHomepage} />
      {/* XXX: Workaround until features land: https://github.com/hyperapp/router/issues/48 + https://github.com/hyperapp/hyperapp/pull/606 */}
      <Route parent path="/posts" render={ViewPostsList(state, actions)} />
      <Route path="/about" render={ViewAbout} />
      <Route render={ViewError} />
    </Switch>

    <footer class="footer con tc">
      © <a href="https://maxmilton.com" class="inherit">Max Milton</a>
    </footer>
  </div>
);
