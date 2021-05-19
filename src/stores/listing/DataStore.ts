import { makeAutoObservable } from 'mobx';

import { get, RawDataType } from 'utils/fetch';
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
  characteristics: {
    label: string;
    value: string;
  }[];
};

export type ObjectDescriptionType = {
  title: string;
  characteristics: {
    label: string;
    value: string;
  }[];
}

class DataStore {
  data: DataType[] = [];

  orderBy = 'name';

  orderDirection: OrderDirection = -1;

  isLoading = true;

  onDataFetch;

  isObjectDescriptionPopupOpen = false;

  objectDescription: ObjectDescriptionType = {
    title: '',
    characteristics: [],
  };

  constructor(onDataFetch: (data: RawDataType) => void) {
    makeAutoObservable(this);

    this.onDataFetch = onDataFetch;
  }

  fetchData = async(page: number, pageSize: number, filters: ActiveFiltersType) => {
    this.isLoading = true;
    const dataRaw = await get('equipment/list', {
      page,
      pageSize,
      filter: JSON.stringify(filters),
    });

    this.onDataFetch(dataRaw);
    const data: DataType[] = dataRaw.body;

    this.data = data;
    this.isLoading = false;
  };

  handleOpenDescriptionPopup = (objectDescription: ObjectDescriptionType) => {
    this.isObjectDescriptionPopupOpen = true;
    this.objectDescription = objectDescription;
  }

  handleCloseDescriptionsPopup = () => {
    this.isObjectDescriptionPopupOpen = false;
    this.objectDescription = {
      title: '',
      characteristics: [],
    };
  }
}

export default DataStore;
