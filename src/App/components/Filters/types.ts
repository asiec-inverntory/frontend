import { ObjectWithIds } from 'utils/types';

type DefaultKeysType = 'type' | 'responsible';

export type DefaultFiltersType = ObjectWithIds<
  DefaultKeysType,
  {
    label: string;
    options: ObjectWithIds<number, string>;
  }
>;
