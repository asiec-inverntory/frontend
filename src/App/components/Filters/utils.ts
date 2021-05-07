import { generateObjectByIdsFromArray } from 'utils';
import { getLabelByKey } from 'utils/format';

import { DefaultFiltersType } from './types';

export const generateDefaultFilters = (types: string[], responsible: string[]): DefaultFiltersType => ({
  byIds: {
    type: {
      label: getLabelByKey('type'),
      options: generateObjectByIdsFromArray(types),
    },
    responsible: {
      label: getLabelByKey('responsible'),
      options: generateObjectByIdsFromArray(responsible),
    },
  },
  ids: ['type', 'responsible'],
});
