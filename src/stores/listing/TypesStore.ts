import { EquipmentTypeValueType } from 'utils/types';

type EquipmentType = {
  id: string;
  // EquipmentTypeValueType means type of equipment valueType
  // valueType describe type of specific attribute of equipment type
  valueType: EquipmentTypeValueType;
  humanReadable: string;
  values?: (string | number)[];
  min?: number;
  max?: number;
}

type EquipmentTypesDataType = {
  byIds: {
    [key: string]: EquipmentType[];
  },
  ids: string[];
  humanReadableTypeNameById: {
    [key: string]: string;
  };
}

class TypesStore {
  types: EquipmentTypesDataType = {
    byIds: {},
    ids: [],
    humanReadableTypeNameById: {},
  };

  constructor() {
    this.fetchTypes();
  }

  fetchTypes = () => {
    const fakeData: EquipmentTypesDataType = {
      byIds: {
        ram: [
          {
            id: 'type',
            humanReadable: 'Тип',
            valueType: 'string',
            values: ['DDR2', 'DDR3', 'DDR4'],
          },
          {
            id: 'amount',
            humanReadable: 'Объем',
            valueType: 'range',
            values: [512, 1024, 2048, 4096, 8192, 16384],
          },
          {
            id: 'manufacturer',
            humanReadable: 'Производитель',
            valueType: 'string',
            values: ['Kingston', 'Corsair', 'Hynix'],
          },
          {
            id: 'model',
            humanReadable: 'Модель',
            valueType: 'string',
            values: ['1AP234', '24S3', '10FFS1'],
          },
        ],
      },
      ids: ['ram'],
      humanReadableTypeNameById: {
        ram: 'Оперативная память',
      },
    };

    this.types = fakeData;
  }
}

export default TypesStore;
