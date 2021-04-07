import { Modal, Button, Space } from 'antd';
import { inject, observer } from 'mobx-react';

import UiStore from 'stores/listing/UiStore';

import { ContentContainer } from './styled';

type StoreProps = {
  uiStore?: UiStore;
};

const ActionPopup = ({ uiStore }: StoreProps) => (
  <Modal
    title={uiStore?.actionName}
    visible={uiStore?.isActionPopupOpen}
    centered
    onCancel={() => uiStore?.closeActionPopup()}
  >
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

ActionPopup.defaultProps = {} as StoreProps;

export default inject('uiStore')(observer(ActionPopup));
