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

// it means type of equipment valueType
// valueType describe type of specific attribute of equipment type
// if it still hard to understand, then check file src/stores/listing/TypesStore
export type EquipmentTypeValueType = 'number' | 'string' | 'range';