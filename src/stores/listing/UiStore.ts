import { makeAutoObservable } from 'mobx';

class UiStore {
  isActionPopupOpen = false;

  isCreateNewObjectPopupOpen = false;

  actionName = '';

  constructor() {
    makeAutoObservable(this);
  }

  openActionPopup = (actionName: string) => {
    this.actionName = actionName;
    this.isActionPopupOpen = true;
  }

  closeActionPopup = () => {
    this.isActionPopupOpen = false;
  }

  handleCreateNewObjectPopupState = () => {
    this.isCreateNewObjectPopupOpen = !this.isCreateNewObjectPopupOpen;
  }
}

export default UiStore;
