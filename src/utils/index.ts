import keyBy from 'lodash/keyBy';
import { toJS } from 'mobx';

import { ObjectWithIds } from './types';

export const generateObjectByIdsFromArray = <ValueType>(arr: ValueType[]): ObjectWithIds<number, ValueType> => ({
  byIds: { ...arr },
  ids: Object.keys({ ...arr }).map((id) => Number(id)),
});

export const generateObjectByIdsFromPlainObject = (
  obj: Record<string | number, unknown & { id: number | string }>,
) => ({
  byIds: keyBy(toJS(obj), 'id'),
  ids: Object.keys(obj),
});
