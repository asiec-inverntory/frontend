import { makeAutoObservable } from 'mobx';

class UiStore {
  isActionPopupOpen = false;

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
}

export default UiStore;
