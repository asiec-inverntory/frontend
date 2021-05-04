import { MouseEvent, useState } from 'react';

import { Menu, Dropdown, Button, Input, Modal, Typography } from 'antd';
import { inject, observer } from 'mobx-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import UiStore from 'stores/listing/UiStore';
import ActionStore from 'stores/listing/ActionStore';

import { ActionBarContainer } from './styled';

type StoreProps = {
  uiStore: UiStore;
  actionStore: ActionStore;
}

const ActionBar = ({ uiStore, actionStore }: StoreProps) => {
  const [newActionName, setNewActionName] = useState('');

  const showConfirm = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Typography.Title level={5}>
            Вы уверены?
          </Typography.Title>
          <Typography.Text>
            Это отменит все незавершенные действия
          </Typography.Text>
        </>
      ),
      onOk() {
        actionStore.actionName = newActionName;
        actionStore.removeIncompleteAction();
        uiStore.openActionPopup();
      },
      okText: 'Да',
      cancelText: 'Нет',
    });
  };

  const handleOpenAction = (e: MouseEvent<HTMLElement>) => {
    const actionName = e.currentTarget.innerText;

    setNewActionName(actionName);

    if (actionStore.isActionIncomplete) {
      showConfirm();
    } else {
      actionStore.actionName = newActionName;
      uiStore.openActionPopup();
    }
  };

  const overlay = (
    <Menu onClick={(info) => handleOpenAction(info.domEvent)}>
      <Menu.Item>
        Приемка
      </Menu.Item>
      <Menu.Item>
        Приход
      </Menu.Item>
    </Menu>
  );

  return (
    <ActionBarContainer>
      <Dropdown overlay={overlay} trigger={['click']}>
        <Button type="primary">
          Действия
        </Button>
      </Dropdown>
      <Input.Search placeholder="Введите серийный или инвертарный номер..." allowClear />
    </ActionBarContainer>
  );
};

ActionBar.defaultProps = {} as StoreProps;

export default inject('uiStore', 'actionStore')(observer(ActionBar));
