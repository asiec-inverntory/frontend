import styled from 'styled-components';
import { Layout } from 'antd';

import { primaryColor } from 'App/consts/colors';

const { Sider } = Layout;

export const RouteSidebar = styled(Sider)`
  left: 0;
  z-index: 1;

  height: calc(100vh - 64px);
  overflow: auto;

  background: ${primaryColor};
`;

export const Header = styled(Layout.Header)`
  position: relative;
  z-index: 1;

  background: white;
  box-shadow: 0 15px 15px 0 rgba(34, 60, 80, 0.05);
`;

export const Content = styled.div`
  flex: 1;

  background: #f5f5f5;
`;
