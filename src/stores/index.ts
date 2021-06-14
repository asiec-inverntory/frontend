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

  const dataFetchWithDefaultParams = () => (
    dataStore.fetch(paginationStore.page, paginationStore.pageSize, uiStore.searchQuery, filtersStore.activeFilters)
  );

  const fetch = async() => {
    // place everything that should be fetched before data fetch here
    await Promise.all([
      attributesStore.fetch(),
      filtersStore.fetch(),
    ]);

    await dataFetchWithDefaultParams();
  };

  reaction(
    () => ({
      isFiltersApplied: filtersStore.isFiltersApplied,
    }),
    ({ isFiltersApplied }) => {
      if (!isFiltersApplied) {
        paginationStore.page = 1;
        paginationStore.pageSize = 10;
      }

      if (!isFiltersApplied) {
        filtersStore.isFiltersApplied = true;
        dataFetchWithDefaultParams();
      }
    },
  );

  reaction(
    () => ({
      page: paginationStore.page,
      pageSize: paginationStore.pageSize,
      search: uiStore.searchQuery,
    }),
    ({ page, pageSize, search }) => {
      dataStore.fetch(page, pageSize, search, filtersStore.activeFilters);
    },
  );

  reaction(
    () => ({
      isNeedDataFetch: actionStore.isNeedDataFetch,
    }),
    async({ isNeedDataFetch }) => {
      if (isNeedDataFetch) {
        actionStore.isNeedDataFetch = false;
        fetch();
      }
    },
  );

  // should be allways before return
  fetch();

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
