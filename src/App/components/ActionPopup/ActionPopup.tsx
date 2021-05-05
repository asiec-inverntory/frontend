import { Modal, Button, Space, Tooltip, Typography } from 'antd';
import { inject, observer } from 'mobx-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';

import ActionStore from 'stores/listing/ActionStore';
import UiStore from 'stores/listing/UiStore';

import { ContentContainer } from './styled';
import EquipmentObjectButton from './EqipmentObjectButton';
import CreateObjectPopup from './CreateObjectPopup';
import NotificationPill from '../NotificationPill';

type StoreProps = {
  uiStore: UiStore;
  actionStore: ActionStore;
};

const ActionPopup = ({ uiStore, actionStore }: StoreProps) => {
  const isOKButtonDisabled = actionStore.equipmentObjects.ids.length === 0;

  const handleCancel = () => {
    actionStore.clearAllEquipmentObjects();
    uiStore.closeActionPopup();
  };

  const showConfirm = () =>
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Typography.Title level={5}>
            Вы уверены?
          </Typography.Title>
          <Typography.Text>
            Это действие удалит все добавленные предметы
          </Typography.Text>
        </>
      ),
      onOk() {
        actionStore.clearAllEquipmentObjects();
        uiStore.closeActionPopup();
      },
      okText: 'Да',
      cancelText: 'Нет',
    });

  const footer = (
    <Space direction="horizontal">
      <Button danger onClick={() => (isOKButtonDisabled ? handleCancel() : showConfirm())}>
        Отмена
      </Button>
      <Tooltip title={isOKButtonDisabled ? 'Должен быть занесен хотя бы один предмет' : null}>
        <Button
          type="primary"
          disabled={isOKButtonDisabled}
          onClick={() => {
            actionStore.saveAllEquipmentObjects();
            uiStore.closeActionPopup();
          }}
        >
          Сохранить
        </Button>
      </Tooltip>
    </Space>
  );

  return (
    <>
      {uiStore.isCreateNewObjectPopupOpen ? (
        <CreateObjectPopup
          equipmentObject={actionStore.edittingEquipmentObject}
          onComplete={(values) => {
            actionStore.addNewEquipmentObject(values);
            uiStore.handleCreateNewObjectPopupState();
          }}
          onCancel={() => uiStore.handleCreateNewObjectPopupState()}
          onEdit={(equipmentId, values) => {
            actionStore.editEquipmentObject(equipmentId, values);
            uiStore.handleCreateNewObjectPopupState();
          }}
        />
      ) : (
        <Modal
          title={actionStore.actionName}
          visible={uiStore.isActionPopupOpen}
          centered
          footer={footer}
          closable={false}
        >
          <ContentContainer>
            <Space direction="vertical" style={{ width: '100%' }}>
              {actionStore.equipmentObjects.ids.map((id) => (
                <div key={id}>
                  <EquipmentObjectButton
                    {...actionStore.equipmentObjects.byIds[id]}
                    onEdit={(equipmentId) => {
                      actionStore.edittingObjectId = equipmentId;
                      uiStore.handleCreateNewObjectPopupState();
                    }}
                    onDelete={
                      (equipmentId) => actionStore.deleteEquipmentObject(equipmentId)
                    }
                  />
                </div>
              ))}
              <Button type="dashed" onClick={() => uiStore.handleCreateNewObjectPopupState()} block>
                Добавить новый предмет...
              </Button>
            </Space>
          </ContentContainer>
        </Modal>
      )}
      <CSSTransition
        in={actionStore.isActionIncomplete && !uiStore.isActionPopupOpen}
        timeout={200}
        classNames="notification-pill"
        unmountOnExit
      >
        <NotificationPill
          text={
            <Space size={3}>
              <Typography.Text>
                У вас есть незаконченное действие
              </Typography.Text>
              <Typography.Text strong>
                {actionStore.actionName.toLowerCase()}
              </Typography.Text>
            </Space>
          }
          cta={
            <Space>
              <Button danger onClick={() => showConfirm()}>
                Отменить
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  uiStore.openActionPopup();
                  actionStore.openIncompleteAction();
                }}
              >
                Открыть
              </Button>
            </Space>
          }
        />
      </CSSTransition>
    </>
  );
};

ActionPopup.defaultProps = {} as StoreProps;

export default inject('uiStore', 'actionStore')(observer(ActionPopup));
