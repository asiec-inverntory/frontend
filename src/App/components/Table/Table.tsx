import { useCallback } from 'react';

import { Table, Button } from 'antd';

import { getLabelByKey } from 'utils';

import { TablePropsType } from './types';
import { TableContainer } from './styled';

const TableComponent = <DataType extends { key: string | number }>({ data, columnKeys }: TablePropsType<DataType>) => {
  const handleMoreInfoButtonRender = useCallback(() => (
    <Button>
      Подробнее
    </Button>
  ), []);

  return (
    <TableContainer>
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
    </TableContainer>
  );
};

export default TableComponent;
