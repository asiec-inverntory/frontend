import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';

import initializeStores from 'stores';

import App from './App';

const stores = initializeStores();

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
