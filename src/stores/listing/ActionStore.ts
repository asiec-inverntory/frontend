import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';
import pull from 'lodash/pull';

import { InventoryCode, SerialCode } from 'utils/types';
import { post } from 'utils/fetch';

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
  // used to let know that need to update the data after action complete
  isNeedDataFetch = false;

  equipmentObjects: EquipmentObjects = {
    byIds: {},
    ids: [],
  };

  edittingObjectId = '';

  isActionIncomplete = false;

  actionName = '';

  incompletedAction = localStorage.getItem('incompleted_action');

  constructor() {
    makeAutoObservable(this);

    this.isActionIncomplete = this.incompletedAction !== null;

    if (this.incompletedAction !== null) {
      const parsedIncompletedAction = JSON.parse(this.incompletedAction);

      this.actionName = parsedIncompletedAction.actionName;
    }
  }

  get edittingEquipmentObject() {
    return this.equipmentObjects.byIds[this.edittingObjectId];
  }

  addNewEquipmentObject = (equipmentObject: NewEquipmentObject) => {
    const newId = nanoid();

    const equipmentObjectWithId = {
      ...equipmentObject,
      id: newId,
    };

    this.equipmentObjects.ids.push(newId);
    this.equipmentObjects.byIds[newId] = equipmentObjectWithId;

    this.saveIncompleteActionState();
  }

  saveAllEquipmentObjects = async() => {
    await post('equipment/receiving', this.generateQuery());
    this.isNeedDataFetch = true;
    this.clearAllEquipmentObjects();
  }

  // used when user cancel action popup
  clearAllEquipmentObjects = () => {
    this.equipmentObjects.ids.length = 0;
    this.equipmentObjects.byIds = {};

    this.removeIncompleteAction();
  }

  deleteEquipmentObject = (id: string) => {
    delete this.equipmentObjects.byIds[id];
    pull(this.equipmentObjects.ids, id);
    this.saveIncompleteActionState();
  }

  editEquipmentObject = (id: string, equipmentObject: EquipmentObject) => {
    this.equipmentObjects.byIds[id] = equipmentObject;
    this.saveIncompleteActionState();
  }

  openIncompleteAction = () => {
    if (!this.incompletedAction) return;

    const parsedIncompletedAction = JSON.parse(this.incompletedAction);

    this.equipmentObjects = parsedIncompletedAction.state;
    this.actionName = parsedIncompletedAction.actionName;
  }

  removeIncompleteAction = () => {
    localStorage.removeItem('incompleted_action');
    this.isActionIncomplete = false;
  }

  saveIncompleteActionState = () => {
    localStorage.setItem('incompleted_action', JSON.stringify({
      state: this.equipmentObjects,
      actionName: this.actionName,
    }));
  }

  generateQuery = () => {
    const queryByIds = this.equipmentObjects.ids.map((id) => {
      const equipment = this.equipmentObjects.byIds[id];

      return {
        type: equipment.type,
        serialCode: equipment.serialCode,
        properties: equipment.properties,
      };
    });

    return queryByIds;
  }
}

export default ActionStore;

