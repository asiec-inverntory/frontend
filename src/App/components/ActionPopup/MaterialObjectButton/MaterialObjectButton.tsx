import { Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { ButtonContentContainer, IconsContainer, Button } from './styled';

type PropsType = {
  type: string;
  serialNumber?: string;
  inventoryNumber?: string;
  onEdit: () => void;
  onDelete: () => void;
};

const MaterialObjectButton = ({ type, serialNumber, inventoryNumber, onEdit, onDelete }: PropsType) => (
  <Button style={{ height: '100%' }} block>
    <ButtonContentContainer>
      <Space direction="vertical" style={{ flex: 1 }}>
        <Typography.Text>
          {type}
        </Typography.Text>
        <Typography.Text type="secondary">
          Серийный номер:
          {' '}
          {serialNumber || 'отсутствует'}
        </Typography.Text>
        <Typography.Text type="secondary">
          Инвертартный номер:
          {' '}
          {inventoryNumber || 'отсутствует'}
        </Typography.Text>
      </Space>
      <IconsContainer>
        <EditOutlined
          onClick={() => onEdit()}
        />
        <DeleteOutlined
          onClick={() => onDelete()}
        />
      </IconsContainer>
    </ButtonContentContainer>
  </Button>
);

export default MaterialObjectButton;
