import { Pagination, Space } from 'antd';
import { inject, observer } from 'mobx-react';

import PaginationStore from 'stores/listing/PaginationStore';

import PageSizeSelect from './PageSizeSelect';
import { PaginationContainer } from './styled';

type PaginationComponentPropsType = {
  paginationStore?: PaginationStore;
};

const PaginationComponent = ({ paginationStore }: PaginationComponentPropsType) => (
  <PaginationContainer>
    <Space>
      <Pagination
        current={paginationStore?.page}
        showLessItems
        total={100}
        showSizeChanger={false}
        responsive={false}
        onChange={(page) => paginationStore?.setPage(page)}
      />
      <PageSizeSelect />
    </Space>
  </PaginationContainer>
);

export default inject('paginationStore')(observer(PaginationComponent));
