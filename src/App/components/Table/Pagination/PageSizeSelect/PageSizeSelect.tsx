import { useState } from 'react';

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const generatePageSizeLabel = (pageSize: number): string => `${pageSize} / странице`;

const pageSizes = [5, 10, 25, 50];

const PageSizeSelect = () => {
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const overlay = (
    <Menu>
      {pageSizes.map((pageSize) => (
        <Menu.Item key={pageSize} onClick={() => setCurrentPageSize(pageSize)}>
          {generatePageSizeLabel(pageSize)}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={overlay} trigger={['click']}>
      <Button>
        {generatePageSizeLabel(currentPageSize)}
        {' '}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default PageSizeSelect;
