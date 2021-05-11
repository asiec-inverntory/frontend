import { useState } from 'react';

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

const RangeInput = ({ min, max, size, defaultValue, onValueChange }: RangeInputPropTypes) => {
  const [value, setValue] = useState(defaultValue || [min, max]);

  const handleValueChange = (newValue: ValueType) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <Space>
      <InputNumber
        value={value[0]}
        size={size}
        min={min}
        max={value[1]}
        onChange={(val) => handleValueChange([val, value[1]])}
        style={{ width: '100%' }}
      />
      -
      <InputNumber
        value={value[1]}
        size={size}
        min={value[0]}
        max={max}
        onChange={(val) => handleValueChange([value[0], val])}
        style={{ width: '100%' }}
      />
    </Space>
  );
};

export default RangeInput;
