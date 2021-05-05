import { makeAutoObservable } from 'mobx';

import { get } from 'utils/fetch';
import { DataId, OrderDirection } from 'utils/types';

type FieldWithIdAndValue = {
  id: DataId;
  humanReadable: string;
}

export type DataType = {
  id: DataId;
  name: string;
  inventoryCode: string | null;
  serialCode: string | null;
  room: FieldWithIdAndValue | null;
  responsible: FieldWithIdAndValue| null;
  characteristics: string[];
}

class DataStore {
  data: DataType[] = [];

  orderBy = 'name';

  orderDirection: OrderDirection = -1;

  isLoading = true;

  constructor(page: number, size: number) {
    makeAutoObservable(this);

    this.fetchData(page, size);
  }

  fetchData = async(page: number, pageSize: number) => {
    this.isLoading = true;
    const data: DataType[] = await get('equipment/list', {
      page,
      pageSize,
    });

    this.data = data;
    this.isLoading = false;
  }
}

export default DataStore;
