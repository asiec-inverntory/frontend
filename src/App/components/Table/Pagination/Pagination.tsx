import { Pagination, Space } from 'antd';
import { inject, observer } from 'mobx-react';

import PaginationStore from 'stores/listing/PaginationStore';

import PageSizeSelect from './PageSizeSelect';
import { PaginationContainer } from './styled';

type StoreProps = {
  paginationStore: PaginationStore;
};

const PaginationComponent = ({ paginationStore }: StoreProps) =>
  (paginationStore.pageCount > 0 ? (
    <PaginationContainer>
      <Space>
        <Pagination
          current={paginationStore.page}
          showLessItems
          total={paginationStore.pageCount}
          showSizeChanger={false}
          pageSize={1}
          responsive={false}
          onChange={(page) => paginationStore.setPage(page)}
        />
        <PageSizeSelect />
      </Space>
    </PaginationContainer>
  ) : null);

PaginationComponent.defaultProps = {} as StoreProps;

export default inject('paginationStore')(observer(PaginationComponent));
