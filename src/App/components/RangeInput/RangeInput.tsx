import React, { useState } from 'react';

import { InputNumber, Space } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

type ValueType = [number, number];

type RangeInputPropTypes = {
  min: number;
  max: number;
  size?: SizeType;
  defaultValue?: ValueType;
  onValueChange: (value: ValueType) => void;
};

const validateRangeInput = (range: ValueType, index: number): ValueType => {
  const newValue: ValueType = [...range];

  if (range[0] > range[1] && index === 0) newValue[0] = newValue[1];

  if (range[0] > range[1] && index === 1) newValue[1] = newValue[0];

  return newValue;
};

const RangeInput = ({ min, max, size, defaultValue, onValueChange }: RangeInputPropTypes) => {
  const [value, setValue] = useState(defaultValue || [min, max]);
  const [isCurrentValueFetched, setIsCurrentValueFetched] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, inputValue: number) => {
    if (e.key !== 'Enter') setIsCurrentValueFetched(false);

    if (e.key !== 'Enter' || isCurrentValueFetched) return;

    const newValue: ValueType = index === 0 ? [inputValue, value[1]] : [value[0], inputValue];
    const validatedValue = validateRangeInput(newValue, index);

    setIsCurrentValueFetched(true);
    onValueChange(validatedValue);
  };

  return (
    <Space>
      <InputNumber
        value={value[0]}
        size={size}
        min={min}
        max={value[1]}
        onChange={(val) => setValue([val, value[1]])}
        onBlur={(e) => {
          if (!isCurrentValueFetched) {
            onValueChange(validateRangeInput([Number(e.currentTarget.value), value[1]], 0));
            setIsCurrentValueFetched(true);
          }
        }}
        onKeyDown={(e) => handleKeyDown(e, 0, Number(e.currentTarget.value))}
        style={{ width: '100%' }}
      />
      -
      <InputNumber
        value={value[1]}
        size={size}
        min={value[0]}
        max={max}
        onChange={(val) => setValue([value[0], val])}
        onBlur={(e) => {
          if (!isCurrentValueFetched) {
            onValueChange(validateRangeInput([value[0], Number(e.currentTarget.value)], 1));
            setIsCurrentValueFetched(true);
          }
        }}
        onKeyDown={(e) => handleKeyDown(e, 1, Number(e.currentTarget.value))}
        style={{ width: '100%' }}
      />
    </Space>
  );
};

export default RangeInput;
