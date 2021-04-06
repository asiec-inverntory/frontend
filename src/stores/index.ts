import UiStore from './listing/UiStore';

const initializeStores = () => {
  const uiStore = new UiStore();

  return {
    uiStore,
  };
};

export default initializeStores;
