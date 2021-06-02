import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import set from 'lodash/set';
import difference from 'lodash/difference';
import { makeAutoObservable } from 'mobx';

export type FilterValuesType = string | number | (string | number)[] | [number, number];

type FilterPropertiesType = Record<string, FilterValuesType>;

export type ActiveFiltersType = Record<string, FilterPropertiesType | FilterValuesType>;

class Filters {
  activeFilters: ActiveFiltersType = {};

  // this variable uses to track filters change because mobx reaction can't track changes inside object
  // false - filters changed, but the request was not sent
  // true - filters changed and the request was sent
  isFiltersApplied = true;

  constructor() {
    makeAutoObservable(this);
  }

  handleTypeFilterChange = (value: FilterValuesType) => {
    const { type } = this.activeFilters;

    if (isObject(type)) return;

    const newTypes = isArray(value) ? value : [value];
    const currentTypes = isArray(type) ? type : [type];

    if (newTypes.length > currentTypes.length) return;

    const deletedKey = difference(currentTypes, newTypes);

    delete this.activeFilters[deletedKey[0]];
  };

  handleFilterChange = (filterKey: string, value: FilterValuesType, propertyFilterKey?: string) => {
    this.isFiltersApplied = false;

    if (filterKey === 'type') {
      this.activeFilters[filterKey] = value;
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
}

export default Filters;
