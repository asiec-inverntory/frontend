import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

import { InventoryCode, SerialCode } from 'utils/types';

export type Property = {
  key: string
  value: string | number;
}

type EquipmentObject = {
  id: string;
  label: string;
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
  label: string;
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

  saveAllEquipmentObjects = () => {
    this.clearAllEquipmentObjects();
  }

  clearAllEquipmentObjects = () => {
    this.equipmentObjects.ids.length = 0;
    this.equipmentObjects.byIds = {};
  }
}

export default ActionStore;
