export type DataId = number;

export type InventoryCode = string;

export type SerialCode = string;

export type EquipmentListGetQueryType = {
  page: number;
  pageSize: number;
  [key: string]: number | string;
};

export type OrderDirection = 1 | -1;

export type AttributeValueType = 'NUMBER' | 'STRING' | 'RANGE';

export type ObjectWithIds<KeyType extends string | number | symbol, ValueType> = {
  byIds: Record<KeyType, ValueType>;
  ids: KeyType[];
};

export type RoomType = {
  buildingNumber: number;
  roomNumber: number;
};
