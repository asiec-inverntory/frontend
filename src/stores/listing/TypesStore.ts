import { makeAutoObservable } from 'mobx';
import keyBy from 'lodash/keyBy';

import { get } from 'utils/fetch';
import { EquipmentTypeValueType, ObjectWithIds } from 'utils/types';

export type EquipmentType = {
  id: string;
  // EquipmentTypeValueType means type of equipment valueType
  // valueType describe type of specific attribute of equipment type
  valueType: EquipmentTypeValueType;
  humanReadable: string;
  values?: (string | number)[];
  minimum?: number;
  maximum?: number;
}

export type PropertiesType = ObjectWithIds<string, EquipmentType> | string[];

export type EquipmentTypesDataType = ObjectWithIds<string, PropertiesType> & {
  humanReadableTypeNameById: Record<string, string>;
};

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

  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchTypes();
  }

  fetchTypes = async() => {
    this.isLoading = true;
    const data: DataType = await get('attribute/list');

    const humanReadableTypeNameById = data[1];
    const typesIds = Object.keys(humanReadableTypeNameById);
    const typesByIds = {};

    typesIds.map((id) => {
      const properties = data[0][id];
      const propertiesByIds = keyBy(properties, 'id');
      const propertyIds = Object.keys(propertiesByIds);

      typesByIds[id] = {
        byIds: propertiesByIds,
        ids: propertyIds,
      };
    });

    const newState: EquipmentTypesDataType = {
      byIds: typesByIds,
      ids: typesIds,
      humanReadableTypeNameById,
    };

    this.types = newState;
    this.isLoading = false;
  }
}

export default TypesStore;
