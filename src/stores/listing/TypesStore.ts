import { get } from 'utils/fetch';
import { EquipmentTypeValueType } from 'utils/types';

type ByIdsType = {
  [key: string]: EquipmentType[];
}

type EquipmentType = {
  id: string;
  // EquipmentTypeValueType means type of equipment valueType
  // valueType describe type of specific attribute of equipment type
  valueType: EquipmentTypeValueType;
  humanReadable: string;
  values?: (string | number)[];
  minimum?: number;
  maximum?: number;
}

type EquipmentTypesDataType = {
  byIds: ByIdsType,
  ids: string[];
  humanReadableTypeNameById: {
    [key: string]: string;
  };
}

type DataType = [
  { [key: string]: EquipmentType[]; },
  { [key: string]: string; }
]

class TypesStore {
  types: EquipmentTypesDataType = {
    byIds: {},
    ids: [],
    humanReadableTypeNameById: {},
  };

  constructor() {
    this.fetchTypes();
  }

  fetchTypes = async() => {
    const data: DataType = await get('attribute/list');

    const humanReadableTypeNameById = data[1];
    const ids = Object.keys(humanReadableTypeNameById);
    let byIds: ByIdsType = {};

    ids.map((id) => {
      const properties = data[0][id];

      byIds = {
        ...byIds,
        [id]: properties,
      };
    });

    const newState: EquipmentTypesDataType = {
      byIds,
      ids,
      humanReadableTypeNameById,
    };

    this.types = newState;
  }
}

export default TypesStore;
