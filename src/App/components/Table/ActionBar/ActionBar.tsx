import { Menu, Dropdown, Button, Input } from 'antd';

import { ActionBarContainer } from './styled';

const overlay = (
  <Menu>
    <Menu.Item>
      Приемка
    </Menu.Item>
    <Menu.Item>
      Приход
    </Menu.Item>
  </Menu>
);

const ActionBar = () => (
  <ActionBarContainer>
    <Dropdown overlay={overlay} trigger={['click']}>
      <Button type="primary">
        Действия
      </Button>
    </Dropdown>
    <Input.Search placeholder="Введите серийный или инвертарный номер..." allowClear />
  </ActionBarContainer>
);

export default ActionBar;
