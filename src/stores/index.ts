import { reaction } from 'mobx';

import ActionStore from './listing/ActionStore';
import DataStore from './listing/DataStore';
import FiltersStore from './listing/FiltersStore';
import PaginationStore from './listing/PaginationStore';
import TypesStore from './listing/TypesStore';
import UiStore from './listing/UiStore';

const initializeStores = () => {
  const uiStore = new UiStore();
  const paginationStore = new PaginationStore();
  const filtersStore = new FiltersStore();
  const actionStore = new ActionStore();
  const typesStore = new TypesStore();
  const dataStore = new DataStore();

  reaction(
    () => ({
      isFiltersApplied: filtersStore.isFiltersApplied,
    }),
    ({ isFiltersApplied }) => {
      if (!isFiltersApplied) {
        filtersStore.isFiltersApplied = true;
        dataStore.fetchData(paginationStore.page, paginationStore.pageSize, filtersStore.activeFilters);
      }
    },
  );

  reaction(
    () => ({
      page: paginationStore.page,
      pageSize: paginationStore.pageSize,
      types: typesStore.types,
    }),
    ({ page, pageSize }) => {
      dataStore.fetchData(page, pageSize, filtersStore.activeFilters);
    },
  );

  return {
    uiStore,
    paginationStore,
    filtersStore,
    actionStore,
    typesStore,
    dataStore,
  };
};

export default initializeStores;
