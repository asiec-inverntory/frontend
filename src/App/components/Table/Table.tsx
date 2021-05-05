import { Table, Button } from 'antd';
import { inject, observer } from 'mobx-react';

import { getLabelByKey } from 'utils/format';
import DataStore, { DataType } from 'stores/listing/DataStore';
import { DataId } from 'utils/types';

import { TableContainer } from './styled';
import { columnKeys } from './consts';
import { ColumnsKeys } from './types';

type StoreProps = {
  dataStore: DataStore;
}

type ParseDataResultType = Record<ColumnsKeys, string>[] & {
  key: DataId;
}[]

const parseData = (data: DataType[]): ParseDataResultType => data.map((item) => ({
  key: item.id,
  name: item.name,
  responsible: item.responsible?.humanReadable || 'Нет',
  room: item.room?.humanReadable || 'На складе',
}));

const TableComponent = ({ dataStore }: StoreProps) => {
  const { data } = dataStore;
  const parsedData = parseData(data);

  return (
    <TableContainer>
      <Table dataSource={parsedData} pagination={false}>
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
          render={() => (
            <Button>
              Подробнее
            </Button>
          )}
        />
      </Table>
    </TableContainer>
  );
};

TableComponent.defaultProps = {} as StoreProps;

export default inject('dataStore')(observer(TableComponent));
