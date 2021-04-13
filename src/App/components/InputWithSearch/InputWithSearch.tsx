import { useState } from 'react';

import { Select } from 'antd';

type Value = {
  key: string;
  value: string;
};

type InputWithSearchPropTypes = {
  values: Value[];
  placeholder?: string;
  defaultInnerValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputWithSearch = ({ values, placeholder, defaultInnerValue, value, onChange }: InputWithSearchPropTypes) => {
  const [innerValue, setInnerValue] = useState(defaultInnerValue);

  return (
    <Select
      value={value || innerValue}
      showSearch
      style={{ width: '100%' }}
      placeholder={placeholder}
      filterOption={(input, option) => option?.children.toLowerCase().includes(input.toLowerCase())}
      onChange={(newValue) => {
        if (onChange) onChange(newValue);

        if (!value) setInnerValue(newValue);
      }}
    >
      {values.map((val) => (
        <Select.Option key={val.key} value={val.key}>
          {val.value}
        </Select.Option>
      ))}
    </Select>
  );
};

export default InputWithSearch;
