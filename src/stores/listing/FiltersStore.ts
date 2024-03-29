import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import set from 'lodash/set';
import { makeAutoObservable } from 'mobx';

import { get } from 'utils/fetch';
import { ObjectWithIds } from 'utils/types';

export type FilterValuesType = string | number | (string | number)[] | [number, number];

type FilterPropertiesType = Record<string, FilterValuesType>;

export type ActiveFiltersType = Record<string, FilterPropertiesType | FilterValuesType>;

class Filters {
  activeFilters: ActiveFiltersType = {};

  fetchedFilters: ObjectWithIds<string, string[]> = {
    byIds: {},
    ids: [],
  };

  // this variable uses to track filters change because mobx reaction can't track changes inside object
  // false - filters changed, but the request was not sent
  // true - filters changed and the request was sent
  isFiltersApplied = true;

  constructor() {
    makeAutoObservable(this);
  }

  handleTypeFilterChange = (value: FilterValuesType) => {
    const type = this.activeFilters.type as string;

    if (isArray(value) && value.length === 0 && !isUndefined(type)) {
      delete this.activeFilters.type;
      delete this.activeFilters[type];
    } else { this.activeFilters.type = value; }
  };

  handleFilterChange = (filterKey: string, value: FilterValuesType, propertyFilterKey?: string) => {
    this.isFiltersApplied = false;

    if (filterKey === 'type') {
      this.handleTypeFilterChange(value);

      return;
    }

    if (isArray(value) && value.length === 0) {
      this.removeFilterKey(filterKey, propertyFilterKey);

      return;
    }

    let newValue = value;

    if (isArray(value)) newValue = value.length > 1 ? value : value[0];

    if (propertyFilterKey) {
      set(this.activeFilters, `${filterKey}.${propertyFilterKey}`, newValue);

      return;
    }

    this.activeFilters[filterKey] = newValue;
  };

  removeFilterKey = (filterKey: string, propertyFilterKey?: string) => {
    if (propertyFilterKey) {
      delete this.activeFilters[filterKey][propertyFilterKey];

      if (Object.keys(this.activeFilters[filterKey]).length === 0) delete this.activeFilters[filterKey];

      return;
    }

    delete this.activeFilters[filterKey];
  };

  fetch = async() => {
    const responsibleRaw = await get('responsible/list');
    const responsible = responsibleRaw.body;


    this.fetchedFilters.byIds = {
      responsible,
    };
    this.fetchedFilters.ids = ['responsible'];
  }
}

export default Filters;
