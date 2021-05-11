import { Table, Button, Typography, Space } from 'antd';
import { inject, observer } from 'mobx-react';

import { getLabelByKey, getRoomName } from 'utils/format';
import DataStore, { DataType } from 'stores/listing/DataStore';
import { DataId } from 'utils/types';

import { TableContainer } from './styled';
import { columnKeys } from './consts';
import { ColumnsKeys } from './types';

type StoreProps = {
  dataStore: DataStore;
}

type ParsedDataType = Record<ColumnsKeys, string> &
  Pick<DataType, 'inventoryCode' | 'serialCode'> & {
    key: DataId;
  };

const parseData = (data: DataType[]): ParsedDataType[] => data.map((item) => ({
  key: item.id,
  name: item.name,
  responsible: item.responsible || 'Нет',
  room: item.room !== null ? getRoomName(item.room) : 'На складе',
  inventoryCode: item.inventoryCode,
  serialCode: item.serialCode,
}));

const TableComponent = ({ dataStore }: StoreProps) => {
  const { data } = dataStore;
  const parsedData = parseData(data);

  return (
    <TableContainer>
      <Table dataSource={parsedData} pagination={false} loading={dataStore.isLoading}>
        {columnKeys.map((key) => (key === 'name' ? (
          <Table.Column
            title={getLabelByKey(key)}
            dataIndex={key}
            key={key}
            render={(value, values: ParsedDataType) => (
              <Space direction="vertical" size={2}>
                <Typography.Text>
                  {value}
                </Typography.Text>
                <Space direction="vertical" size={0}>
                  {values.inventoryCode && (
                    <Typography.Text style={{ fontSize: 12 }} type="secondary">
                      Инвертарный номер:
                      {' '}
                      {values.inventoryCode}
                    </Typography.Text>
                  )}
                  {values.serialCode && (
                    <Typography.Text style={{ fontSize: 12 }} type="secondary">
                      Серийный номер:
                      {' '}
                      {values.serialCode}
                    </Typography.Text>
                  )}
                </Space>
              </Space>
            )}
          />
        ) : (
          <Table.Column
            title={getLabelByKey(key)}
            dataIndex={key}
            key={key}
          />
        )))}
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
