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

  const getValueByIndex = (inputValue: number, index: number): ValueType => (
    index === 0
      ? [inputValue, value[1]]
      : [value[0], inputValue]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, inputValue: number) => {
    if (e.key !== 'Enter') setIsCurrentValueFetched(false);

    if (e.key !== 'Enter' || isCurrentValueFetched) return;

    const newValue: ValueType = getValueByIndex(inputValue, index);
    const validatedValue = validateRangeInput(newValue, index);

    setIsCurrentValueFetched(true);
    onValueChange(validatedValue);
  };

  const getInputNumberComponent = (index: number) => (
    <InputNumber
      value={value[index]}
      style={{ width: '100%' }}
      size={size}
      min={index === 0 ? min : value[0]}
      max={index === 0 ? value[1] : max}
      onChange={(val) => setValue(getValueByIndex(val, index))}
      onBlur={(e) => {
        if (!isCurrentValueFetched) {
          const newValue = getValueByIndex(Number(e.currentTarget.value), index);

          onValueChange(validateRangeInput(newValue, index));
          setIsCurrentValueFetched(true);
        }
      }}
      onKeyDown={(e) => handleKeyDown(e, index, Number(e.currentTarget.value))}
    />
  );

  return (
    <Space>
      {getInputNumberComponent(0)}
      -
      {getInputNumberComponent(1)}
    </Space>
  );
};

export default RangeInput;
