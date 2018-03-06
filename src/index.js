import { app } from 'hyperapp';
import { location } from '@hyperapp/router';
import { state, actions } from './store';
import view from './App';

// CSS entrypoint
import './css';

const main = app(state, actions, view, document.body);

const unsubscribe = location.subscribe(main.location);
