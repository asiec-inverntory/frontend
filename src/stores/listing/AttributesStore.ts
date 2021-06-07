import { makeAutoObservable } from 'mobx';
import keyBy from 'lodash/keyBy';

import { get } from 'utils/fetch';
import { AttributeValueType, ObjectWithIds } from 'utils/types';

export type AttributeType = {
  id: string;
  // AttributeValueType means type of attribute valueType
  // valueType describe type of specific attribute
  valueType: AttributeValueType;
  humanReadable: string;
  values?: (string | number)[];
  minimum?: number;
  maximum?: number;
}

export type PropertiesType = ObjectWithIds<string, AttributeType>;

export type EquipmentTypesDataType = ObjectWithIds<string, PropertiesType> & {
  humanReadableTypeNameById: Record<string, string>;
};

type DataType = [
  { [key: string]: AttributeType[]; },
  { [key: string]: string; }
]

class AttributesStore {
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
    const dataRaw = await get('attribute/list');
    const data: DataType = dataRaw.body;

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

export default AttributesStore;
