import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import ru from 'antd/lib/locale-provider/ru_RU';

import initializeStores from 'stores';

import App from './App';

const stores = initializeStores();

ReactDOM.render(
  <Provider {...stores}>
    <ConfigProvider locale={ru}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
