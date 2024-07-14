import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/base.css';
import Main from './DemoPages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';

const { store, persistor } = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Component />
        </Router>
      </PersistGate>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./DemoPages/Main', () => {
    const NextApp = require('./DemoPages/Main').default;
    renderApp(NextApp);
  });
}
unregister();