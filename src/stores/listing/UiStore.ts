import { makeAutoObservable } from 'mobx';

class UiStore {
  isActionPopupOpen = false;

  isCreateNewObjectPopupOpen = false;

  searchQuery = '';

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

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
  }
}

export default UiStore;
