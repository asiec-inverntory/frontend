import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

import { InventoryCode, SerialCode } from 'utils/types';

export type Property = {
  key: string
  value: string | number;
}

type EquipmentObject = {
  id: string;
  type: string;
  serialCode?: SerialCode;
  inventoryCode?: InventoryCode;
  properties?: Property[];
  content?: EquipmentObject[];
}

type EquipmentObjects = {
  byIds: {
    [id: string]: EquipmentObject;
  };
  ids: string[];
}

export type NewEquipmentObject = {
  type: string;
  serialCode: SerialCode;
  properties?: Property[];
  content?: EquipmentObject[];
};

class ActionStore {
  isLoading = false;

  equipmentObjects: EquipmentObjects = {
    byIds: {},
    ids: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  addNewEquipmentObject = (equipmentObject: NewEquipmentObject) => {
    const newId = nanoid();

    this.equipmentObjects.ids.push(newId);
    this.equipmentObjects.byIds[newId] = {
      ...equipmentObject,
      id: nanoid(),
    };
  }
}

export default ActionStore;
