import { Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { EquipmentObject } from 'stores/listing/ActionStore';

import { ButtonContentContainer, IconsContainer, Button } from './styled';

type PropTypes = EquipmentObject & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const EquipmentObjectButton = ({ id, label, serialCode, inventoryCode, onEdit, onDelete }: PropTypes) => (
  <Button style={{ height: '100%' }} block>
    <ButtonContentContainer>
      <Space direction="vertical" style={{ flex: 1 }}>
        <Typography.Text>
          {label}
        </Typography.Text>
        {serialCode &&
          <Typography.Text type="secondary">
            Серийный номер:
            {' '}
            {serialCode}
          </Typography.Text>}
        {inventoryCode &&
          <Typography.Text type="secondary">
            Инвертартный номер:
            {' '}
            {inventoryCode}
          </Typography.Text>}
      </Space>
      <IconsContainer>
        <EditOutlined
          onClick={() => onEdit(id)}
        />
        <DeleteOutlined
          onClick={() => onDelete(id)}
        />
      </IconsContainer>
    </ButtonContentContainer>
  </Button>
);

export default EquipmentObjectButton;
