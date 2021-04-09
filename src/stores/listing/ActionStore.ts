import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

import { InventoryCode, SerialCode } from 'utils/types';

type Property = {
  [key: string]: string | number;
}

type MaterialObject = {
  id: string;
  type: string;
  serialCode?: SerialCode;
  inventoryCode?: InventoryCode;
  properties?: Property;
  content?: MaterialObject[];
}

type MaterialObjects = {
  byIds: {
    [id: string]: MaterialObject;
  };
  ids: string[];
}

class ActionStore {
  isLoading = false;

  materialObjects: MaterialObjects = {
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

  addNewMaterialObject = (type: string, materialObject: MaterialObject) => {
    const newId = nanoid();

    this.materialObjects.ids.push(newId);
    this.materialObjects.byIds[newId] = materialObject;
  }
}

export default ActionStore;
