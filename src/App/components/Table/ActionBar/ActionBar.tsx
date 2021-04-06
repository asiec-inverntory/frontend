import { MouseEvent } from 'react';

import { Menu, Dropdown, Button, Input } from 'antd';
import { inject } from 'mobx-react';

import UiStore from 'stores/listing/UiStore';

import { ActionBarContainer } from './styled';

type ActionBarPropsType = {
  uiStore?: UiStore;
}

const ActionBar = ({ uiStore }: ActionBarPropsType) => {
  const handleOpenAction = (e: MouseEvent<HTMLElement>) => {
    const actionName = e.currentTarget.innerText;

    uiStore?.openActionPopup(actionName);
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

export default inject('uiStore')(ActionBar);
