import { makeAutoObservable } from 'mobx';

import { get } from 'utils/fetch';
import { DataId, OrderDirection, RoomType } from 'utils/types';

type DataValue = string | null;

export type DataType = {
  id: DataId;
  name: string;
  inventoryCode: DataValue;
  serialCode: DataValue;
  room: RoomType | null;
  responsible: DataValue;
  characteristics: string[];
};

class DataStore {
  data: DataType[] = [];

  orderBy = 'name';

  orderDirection: OrderDirection = -1;

  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchData = async(page: number, pageSize: number) => {
    this.isLoading = true;
    const data: DataType[] = await get('equipment/list', {
      page,
      pageSize,
    });

    this.data = data;
    this.isLoading = false;
  };
}

export default DataStore;
