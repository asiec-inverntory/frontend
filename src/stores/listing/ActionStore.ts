import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

type Property = {
  [key: string]: string | number;
}

type MaterialObject = {
  id: string;
  type: string;
  serialNumber?: string;
  inventoryNumber?: string;
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
        serialNumber: '1231231241241',
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
