import styled from 'styled-components';
import { Layout } from 'antd';

import { primaryColor } from 'App/consts/colors';

const { Sider } = Layout;

export const Container = styled(Layout)`
  height: 100%;
`;

export const ContentContainer = styled(Layout)`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const CommonSidebar = styled(Sider)`
  z-index: 1;

  height: 100%;
  overflow: auto;
`;

export const RouteSidebar = styled(CommonSidebar)`
  left: 0;

  height: calc(100vh - 64px);

  background: ${primaryColor};
`;

export const ParamsSidebar = styled(CommonSidebar)`
  right: 0;
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
