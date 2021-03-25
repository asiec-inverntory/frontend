import { getLabelByKey, getAbbreviatedName } from 'utils';

import Filters from './Filters';
import { FiltersType } from './types';

const exampleFilters: FiltersType = {
  byIds: {
    type: {
      label: getLabelByKey('type'),
      value: null,
      options: {
        byIds: {
          1: 'Монитор',
          2: 'Мышь',
          3: 'Клавиатура',
          4: 'Рабочее место',
        },
        ids: [1, 2, 3, 4],
      },
    },
    responsible: {
      label: getLabelByKey('responsible'),
      value: null,
      options: {
        byIds: {
          1: getAbbreviatedName('Иванова Софья Ивановна'),
          2: getAbbreviatedName('Беляев Савва Михайлович'),
          3: getAbbreviatedName('Жукова Алиса Тимофеевна'),
        },
        ids: [1, 2, 3],
      },
    },
  },
  ids: ['type', 'responsible'],
};

const FiltersContainer = () => (
  <Filters filters={exampleFilters} />
);

export default FiltersContainer;
