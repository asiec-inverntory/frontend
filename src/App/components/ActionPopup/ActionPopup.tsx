import { Modal, Button, Space } from 'antd';
import upperFirst from 'lodash/upperFirst';

import { ActionType } from 'utils/types';

import { ContentContainer } from './styled';

type ActionPopupTypes = {
  title: ActionType;
}

const ActionPopup = ({ title }: ActionPopupTypes) => (
  <Modal title={upperFirst(title)} visible centered>
    <ContentContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block>
          Какой-то объект...
        </Button>
        <Button type="primary" block>
          Какой-то объект...
        </Button>
        <Button type="dashed" block>
          Создать новый объект...
        </Button>
      </Space>
    </ContentContainer>
  </Modal>
);

export default ActionPopup;
