import { inject, observer } from 'mobx-react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import PaginationStore from 'stores/listing/PaginationStore';

export const generatePageSizeLabel = (pageSize: number): string => `${pageSize} / странице`;

const pageSizes = [5, 10, 25, 50];

type StoreProps = {
  paginationStore: PaginationStore;
};

const PageSizeSelect = ({ paginationStore }: StoreProps) => {
  const overlay = (
    <Menu>
      {pageSizes.map((pageSize) => (
        <Menu.Item key={pageSize} onClick={() => paginationStore.setPageSize(pageSize)}>
          {generatePageSizeLabel(pageSize)}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={overlay} trigger={['click']}>
      <Button>
        {generatePageSizeLabel(paginationStore.pageSize)}
        {' '}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

PageSizeSelect.defaultProps = {} as StoreProps;

export default (inject('paginationStore'))(observer(PageSizeSelect));
