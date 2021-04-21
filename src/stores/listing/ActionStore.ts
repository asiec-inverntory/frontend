import { makeAutoObservable, toJS } from 'mobx';
import { nanoid } from 'nanoid';
import pull from 'lodash/pull';

import { InventoryCode, SerialCode } from 'utils/types';

export type Property = {
  key: string
  value: string | number;
}

export type EquipmentObject = NewEquipmentObject & {
  id: string;
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
  serialCode?: SerialCode;
  inventoryCode?: InventoryCode;
  properties?: Property[];
  content?: EquipmentObject[];
};

class ActionStore {
  isLoading = false;

  equipmentObjects: EquipmentObjects = {
    byIds: {
      oof1: {
        label: 'Оперативная память',
        type: 'ram',
        serialCode: 'as',
        properties: [
          {
            key: 'equipmentType',
            value: 'ram',
          },
          {
            key: 'serialCode',
            value: 'as',
          },
          {
            key: 'type',
            value: 'DDR2',
          },
          {
            key: 'amount',
            value: '1024',
          },
          {
            key: 'manufacturer',
            value: 'Corsair',
          },
          {
            key: 'model',
            value: '1AP234',
          },
        ],
        id: 'oof1',
      },
      oof2: {
        label: 'Оперативная память',
        type: 'ram',
        serialCode: 'as',
        properties: [
          {
            key: 'equipmentType',
            value: 'ram',
          },
          {
            key: 'serialCode',
            value: 'as',
          },
          {
            key: 'type',
            value: 'DDR2',
          },
          {
            key: 'amount',
            value: '1024',
          },
          {
            key: 'manufacturer',
            value: 'Corsair',
          },
          {
            key: 'model',
            value: '1AP234',
          },
        ],
        id: 'oof2',
      },
    },
    ids: [
      'oof1',
      'oof2',
    ],
  };

  edittingObjectId = '';

  constructor() {
    makeAutoObservable(this);
  }

  get edittingEquipmentObject() {
    return this.equipmentObjects.byIds[this.edittingObjectId];
  }

  addNewEquipmentObject = (equipmentObject: NewEquipmentObject) => {
    const newId = nanoid();

    this.equipmentObjects.ids.push(newId);
    this.equipmentObjects.byIds[newId] = {
      ...equipmentObject,
      id: nanoid(),
    };

    toJS(this.equipmentObjects);
  }

  saveAllEquipmentObjects = () => {
    this.clearAllEquipmentObjects();
  }

  clearAllEquipmentObjects = () => {
    this.equipmentObjects.ids.length = 0;
    this.equipmentObjects.byIds = {};
  }

  deleteEquipmentObject = (id: string) => {
    delete this.equipmentObjects.byIds[id];
    pull(this.equipmentObjects.ids, id);
  }

  editEquipmentObject = (id: string, equipmentObject: EquipmentObject) => {
    this.equipmentObjects.byIds[id] = equipmentObject;
  }
}

export default ActionStore;

