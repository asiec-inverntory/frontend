import React from 'react';
import { Layout } from 'antd';

import {
  Header, RouteSidebar, Content,
} from './styled';
import './App.css';

const App = () => (
  <>
    <Header>
      <div>There will be some information later</div>
    </Header>
    <Layout>
      <RouteSidebar>
        <div>There will be navigation</div>
      </RouteSidebar>
      <Content>
        <div>There will be table</div>
      </Content>
    </Layout>
  </>
);

export default App;
