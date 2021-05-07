import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';

import { RoomType } from './types';

export const getLabelByKey = (key: string): string => {
  let result: string = upperFirst(lowerCase(key));

  switch (key) {
    case 'name':
      result = 'Название';
      break;
    case 'responsible':
      result = 'Ответственный';
      break;
    case 'room':
      result = 'Местонахождение';
      break;
    case 'type':
      result = 'Тип';
      break;
  }

  return result;
};

export const getAbbreviatedName = (fullName: string): string => {
  // first is last name, second is first name, third is middle name
  const splittedName = fullName.split(' ');
  const abbreviatedName = `${splittedName[0]} ${splittedName[1].charAt(0)}.${splittedName[2].charAt(0)}.`;

  return abbreviatedName;
};

export const getRoomName = ({ buildingNumber, roomNumber }: RoomType): string =>
  `${buildingNumber} к. ${roomNumber} каб.`;
