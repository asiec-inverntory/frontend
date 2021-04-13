type FilterOptionsType = {
  byIds: {
    [key: number]: string;
  };
  ids: number[];
}

export type FiltersType = {
  byIds: {
    [key: string]: {
      label: string;
      value: null | number | number[];
      options: FilterOptionsType;
    };
  },
  ids: string[];
}

export type FiltersPropTypes = {
  filters: FiltersType;
}
