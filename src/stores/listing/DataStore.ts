import { makeAutoObservable } from 'mobx';

import { get } from 'utils/fetch';
import { DataId, OrderDirection } from 'utils/types';

type FieldWithIdAndValue = {
  id: DataId;
}

type Data = {
  id: DataId;
  name: string;
  type: string;
  inventoryCode?: string;
  serialCode?: string;
  room: FieldWithIdAndValue;
  characteristics: string[];
}

class DataStore {
  data: Data[] = [];

  orderBy = 'name';

  orderDirection: OrderDirection = -1;

  constructor(page: number, size: number) {
    makeAutoObservable(this);

    this.fetchData(page, size);
  }

  fetchData = (page: number, size: number) => {
    get('/equipment/list', {
      page,
      size,
      sortBy: this.orderBy,
    });
  }
}

export default DataStore;
