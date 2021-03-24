import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';

export const getColumnNameByKey = (key: string): string => {
  let result: string = upperFirst(lowerCase(key));

  switch (key) {
    case 'name':
      result = 'Название';
      break;
    case 'responsible':
      result = 'Ответственный';
      break;
    case 'place':
      result = 'Местонахождение';
      break;
  }

  return result;
};
