import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

import { InventoryCode, SerialCode } from 'utils/types';

type Property = {
  [key: string]: string | number;
}

type EquipmentObject = {
  id: string;
  type: string;
  serialCode?: SerialCode;
  inventoryCode?: InventoryCode;
  properties?: Property;
  content?: EquipmentObject[];
}

type EquipmentObjects = {
  byIds: {
    [id: string]: EquipmentObject;
  };
  ids: string[];
}

class ActionStore {
  isLoading = false;

  equipmentObjects: EquipmentObjects = {
    byIds: {
      10: {
        id: '10',
        type: 'Оперативная память',
        serialCode: '1231231241241',
      },
    },
    ids: ['10'],
  };

  constructor() {
    makeAutoObservable(this);
  }

  addNewEquipmentObject = (type: string, equipmentObject: EquipmentObject) => {
    const newId = nanoid();

    this.equipmentObjects.ids.push(newId);
    this.equipmentObjects.byIds[newId] = equipmentObject;
  }
}

export default ActionStore;
