import { Modal, Button, Space } from 'antd';
import { inject, observer } from 'mobx-react';

import ActionStore from 'stores/listing/ActionStore';
import UiStore from 'stores/listing/UiStore';

import { ContentContainer } from './styled';
import MaterialObjectButton from './MaterialObjectButton';

type StoreProps = {
  uiStore: UiStore;
  actionStore: ActionStore;
};

const ActionPopup = ({ uiStore, actionStore }: StoreProps) => {
  const { materialObjects } = actionStore;

  return (
    <Modal
      title={uiStore.actionName}
      visible={uiStore.isActionPopupOpen}
      centered
      onCancel={() => uiStore.closeActionPopup()}
    >
      <ContentContainer>
        <Space direction="vertical" style={{ width: '100%' }}>
          {materialObjects.ids.map((id) => (
            <div key={id}>
              <MaterialObjectButton
                {...materialObjects.byIds[id]}
                onEdit={() => console.log('edit button click')}
                onDelete={() => console.log('delete button click')}
              />
            </div>
          ))}
          <Button type="dashed" block>
            Создать новый объект...
          </Button>
        </Space>
      </ContentContainer>
    </Modal>
  );
};

ActionPopup.defaultProps = {} as StoreProps;

export default inject('uiStore', 'actionStore')(observer(ActionPopup));
