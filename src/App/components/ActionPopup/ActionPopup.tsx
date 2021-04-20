import { Modal, Button, Space, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';

import ActionStore from 'stores/listing/ActionStore';
import UiStore from 'stores/listing/UiStore';

import { ContentContainer } from './styled';
import EquipmentObjectButton from './EqipmentObjectButton';
import CreateObjectPopup from './CreateObjectPopup';

type StoreProps = {
  uiStore: UiStore;
  actionStore: ActionStore;
};

const ActionPopup = ({ uiStore, actionStore }: StoreProps) => {
  const { equipmentObjects } = actionStore;

  const isOKButtonDisabled = equipmentObjects.ids.length === 0;

  const footer = (
    <Space direction="horizontal">
      <Button danger onClick={() => uiStore.closeActionPopup()}>
        Отмена
      </Button>
      <Tooltip title={isOKButtonDisabled ? 'Должен быть занесен хотя бы один предмет' : null}>
        <Button type="primary" disabled={isOKButtonDisabled} >
          Сохранить
        </Button>
      </Tooltip>
    </Space>
  );

  const content = uiStore.isCreateNewObjectPopupOpen ? (
    <CreateObjectPopup
      onComplete={(values) => {
        actionStore.addNewEquipmentObject(values);
        uiStore.handleCreateNewObjectPopupState();
      }}
      onCancel={() => uiStore.handleCreateNewObjectPopupState()}
    />
  ) : (
    <Modal
      title={uiStore.actionName}
      visible={uiStore.isActionPopupOpen}
      centered
      footer={footer}
      closable={false}
    >
      <ContentContainer>
        <Space direction="vertical" style={{ width: '100%' }}>
          {equipmentObjects.ids.map((id) => (
            <div key={id}>
              <EquipmentObjectButton
                {...equipmentObjects.byIds[id]}
                onEdit={() => console.log('edit button click')}
                onDelete={() => console.log('delete button click')}
              />
            </div>
          ))}
          <Button type="dashed" onClick={() => uiStore.handleCreateNewObjectPopupState()} block>
            Добавить новый предмет...
          </Button>
        </Space>
      </ContentContainer>
    </Modal>
  );

  return content;
};

ActionPopup.defaultProps = {} as StoreProps;

export default inject('uiStore', 'actionStore')(observer(ActionPopup));
