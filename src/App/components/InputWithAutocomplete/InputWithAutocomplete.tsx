import { useState } from 'react';

import isString from 'lodash/isString';
import { AutoComplete } from 'antd';

type InputWithAutocompletePropTypes = {
  values: string[];
  placeholder?: string;
  defaultInnerValue?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const InputWithAutocomplete = ({
  values,
  placeholder,
  defaultInnerValue,
  value,
  onChange,
}: InputWithAutocompletePropTypes) => {
  const [innerValue, setInnerValue] = useState(defaultInnerValue);

  return (
    <AutoComplete
      value={isString(value) ? value : innerValue}
      options={values.map((val) => ({
        value: val,
      }))}
      onChange={(newValue) => {
        if (onChange) onChange(newValue);

        if (!value) setInnerValue(newValue);
      }}
      filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      placeholder={placeholder}
    />
  );
};

export default InputWithAutocomplete;
