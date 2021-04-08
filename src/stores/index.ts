import ActionStore from './listing/ActionStore';
import PaginationStore from './listing/PaginationStore';
import UiStore from './listing/UiStore';

const initializeStores = () => {
  const uiStore = new UiStore();
  const paginationStore = new PaginationStore();
  const actionStore = new ActionStore();

  return {
    uiStore,
    paginationStore,
    actionStore,
  };
};

export default initializeStores;
