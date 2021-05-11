import { makeAutoObservable } from 'mobx';

import { get } from 'utils/fetch';
import { DataId, OrderDirection, RoomType } from 'utils/types';

import { ActiveFiltersType } from './FiltersStore';

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

  fetchData = async(page: number, pageSize: number, filters: ActiveFiltersType) => {
    this.isLoading = true;
    const data: DataType[] = await get('equipment/list', {
      page,
      pageSize,
      ...filters,
    });

    this.data = data;
    this.isLoading = false;
  };
}

export default DataStore;
