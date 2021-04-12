import { reaction } from 'mobx';

import ActionStore from './listing/ActionStore';
import DataStore from './listing/DataStore';
import PaginationStore from './listing/PaginationStore';
import TypesStore from './listing/TypesStore';
import UiStore from './listing/UiStore';

const initializeStores = () => {
  const uiStore = new UiStore();
  const paginationStore = new PaginationStore();
  const actionStore = new ActionStore();
  const dataStore = new DataStore(paginationStore.page, paginationStore.pageSize);
  const typesStore = new TypesStore();

  reaction(
    () => ({
      page: paginationStore.page,
      pageSize: paginationStore.pageSize,
    }),
    ({ page, pageSize }) => {
      dataStore.fetchData(page, pageSize);
    },
  );

  return {
    uiStore,
    paginationStore,
    actionStore,
    dataStore,
    typesStore,
  };
};

export default initializeStores;
