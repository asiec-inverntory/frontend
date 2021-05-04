import React from 'react';

import { Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons/lib/icons';

import { Notification, ContentContainer } from './styled';

type NotificationPillPropTypes = {
  text: React.ReactNode;
  cta: React.ReactNode;
}

const NotificationPill = ({ text, cta }: NotificationPillPropTypes) => (
  <Notification>
    <ContentContainer>
      <Space size={24}>
        <InfoCircleOutlined style={{ fontSize: 24 }} />
        {text}
        {cta}
      </Space>
    </ContentContainer>
  </Notification>
);

export default NotificationPill;
