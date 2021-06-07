import { reaction } from 'mobx';

import { RawDataType } from 'utils/fetch';

import ActionStore from './listing/ActionStore';
import DataStore from './listing/DataStore';
import FiltersStore from './listing/FiltersStore';
import PaginationStore from './listing/PaginationStore';
import AttributesStore from './listing/AttributesStore';
import UiStore from './listing/UiStore';

const initializeStores = () => {
  const uiStore = new UiStore();
  const paginationStore = new PaginationStore();
  const filtersStore = new FiltersStore();
  const actionStore = new ActionStore();
  const attributesStore = new AttributesStore();

  const onDataFetch = (data: RawDataType) => {
    const pageCount = data.headers.get('x-page-count');

    paginationStore.pageCount = Number(pageCount) || 1;
  };

  const dataStore = new DataStore(onDataFetch);

  reaction(
    () => ({
      isFiltersApplied: filtersStore.isFiltersApplied,
      isNeedDataFetch: actionStore.isNeedDataFetch,
    }),
    ({ isFiltersApplied, isNeedDataFetch }) => {
      if (!isFiltersApplied) {
        paginationStore.page = 1;
        paginationStore.pageSize = 10;
      }

      if (!isFiltersApplied || isNeedDataFetch) {
        filtersStore.isFiltersApplied = true;
        actionStore.isNeedDataFetch = false;
        dataStore.fetchData(
          paginationStore.page, paginationStore.pageSize, uiStore.searchQuery, filtersStore.activeFilters,
        );
      }
    },
  );

  reaction(
    () => ({
      page: paginationStore.page,
      pageSize: paginationStore.pageSize,
      types: attributesStore.types,
      search: uiStore.searchQuery,
    }),
    ({ page, pageSize, search }) => {
      dataStore.fetchData(page, pageSize, search, filtersStore.activeFilters);
    },
  );

  return {
    uiStore,
    paginationStore,
    filtersStore,
    actionStore,
    attributesStore,
    dataStore,
  };
};

export default initializeStores;
