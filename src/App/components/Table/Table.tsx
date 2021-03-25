import { useCallback } from 'react';

import { Table, Button } from 'antd';

import { getLabelByKey } from 'utils';

import { TablePropsType } from './types';
import { Container } from './styled';

const TableComponent = <DataType extends { key: string | number }>({ data, columnKeys }: TablePropsType<DataType>) => {
  const handleMoreInfoButtonRender = useCallback(() => (
    <Button type="primary">
      Подробнее
    </Button>
  ), []);

  return (
    <Container>
      <Table dataSource={data} pagination={false}>
        {columnKeys.map((key) => (
          <Table.Column
            title={getLabelByKey(key)}
            dataIndex={key}
            key={key}
          />
        ))}
        <Table.Column
          title=""
          dataIndex="attr"
          key="attr"
          align="center"
          render={handleMoreInfoButtonRender}
        />
      </Table>
    </Container>
  );
};

export default TableComponent;
