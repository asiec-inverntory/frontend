import { reaction } from 'mobx';

import { RawDataType } from 'utils/fetch';

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

  const onDataFetch = (data: RawDataType) => {
    const pageCount = data.headers.get('x-page-count');

    paginationStore.pageCount = Number(pageCount) || 1;
  };

  const dataStore = new DataStore(onDataFetch);

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
