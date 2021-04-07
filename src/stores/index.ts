import PaginationStore from './listing/PaginationStore';
import UiStore from './listing/UiStore';

const initializeStores = () => {
  const uiStore = new UiStore();
  const paginationStore = new PaginationStore();

  return {
    uiStore,
    paginationStore,
  };
};

export default initializeStores;
