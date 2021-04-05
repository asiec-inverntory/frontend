import { Pagination, Space } from 'antd';

import PageSizeSelect from './PageSizeSelect';
import { PaginationContainer } from './styled';

const PaginationComponent = () => (
  <PaginationContainer>
    <Space>
      <Pagination defaultCurrent={2} showLessItems total={100} showSizeChanger={false} />
      <PageSizeSelect />
    </Space>
  </PaginationContainer>
);

export default PaginationComponent;
