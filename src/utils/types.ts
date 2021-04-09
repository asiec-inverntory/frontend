export type DataId = number;

export type InventoryCode = string;

export type SerialCode = string;

export type AJAXGetQuery = {
  page: number;
  size: number;
  sortBy: string;
  [key: string]: number | string;
}

export type OrderDirection = 1 | -1;
