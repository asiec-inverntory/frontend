import { EquipmentTypeValueType } from 'utils/types';

type EquipmentType = {
  id: string;
  // EquipmentTypeValueType means type of equipment valueType
  // valueType describe type of specific attribute of equipment type
  valueType: EquipmentTypeValueType;
  values?: string[] | number[];
  min?: number;
  max?: number;
}

type EquipmentTypesDataType = {
  [key: string]: EquipmentType[];
}

class TypesStore {
  types: EquipmentTypesDataType[] = [];

  constructor() {
    this.fetchTypes();
  }

  fetchTypes = () => {
    const fakeData: EquipmentTypesDataType[] = [{
      ram: [
        {
          id: 'type',
          valueType: 'string',
          values: ['DDR2', 'DDR3', 'DDR4'],
        },
        {
          id: 'amount',
          valueType: 'range',
          max: 0,
          min: 4000,
        },
        {
          id: 'manufacturer',
          valueType: 'string',
          values: ['Kingston', 'Corsair', 'Hynix'],
        },
        {
          id: 'model',
          valueType: 'string',
          values: ['1AP234', '24S3', '10FFS1'],
        },
      ],
    }];

    this.types = fakeData;
  }
}

export default TypesStore;
