import { h } from 'hyperapp';
import { Link, Switch, Route, location } from '@hyperapp/router';
import ViewHomepage from './views/ViewHomepage';
import ViewAbout from './views/ViewAbout';

// export default state => (
export default (state, actions) => (
  <div class="con">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/topics">Topics</Link>
    </nav>

    <hr />

    <Switch>
      <Route path="/" render={ViewHomepage(state, actions)} />
      <Route path="/about" render={ViewAbout} />
      {/* <Route parent path="/topics" render={TopicsView(state, actions)} /> */}
    </Switch>
  </div>
);
