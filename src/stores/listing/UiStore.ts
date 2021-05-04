import { makeAutoObservable } from 'mobx';

class UiStore {
  isActionPopupOpen = false;

  isCreateNewObjectPopupOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  openActionPopup = () => {
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
