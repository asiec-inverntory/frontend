import { Select, Space, Typography } from 'antd';
import { SelectValue } from 'antd/lib/select';
import isArray from 'lodash/isArray';

import { PropertiesType } from 'stores/listing/TypesStore';
import { generateObjectByIdsFromArray } from 'utils';

type FilterByTypePropTypes = {
  label: string;
  equipmentType: string;
  values: PropertiesType;
  onChange: (filterKey: string, newValue: SelectValue, subFilterKey: string) => void;
}

const FilterByType = ({ label, equipmentType, values, onChange }: FilterByTypePropTypes) => (!isArray(values) ? (
  <Space direction="vertical" size="small" style={{ width: '100%' }}>
    <Typography.Text strong style={{ marginBottom: 12 }}>
      {label}
    </Typography.Text>
    {values.ids.map((filterKey) => {
      const option = values.byIds[filterKey];
      const selectOptions = option.values && generateObjectByIdsFromArray(option.values);

      return option.valueType !== 'RANGE' ? (
        <Space key={filterKey} direction="vertical" size="small" style={{ width: '100%' }}>
          <Typography.Text>
            {option.humanReadable}
          </Typography.Text>
          <Select
            showSearch
            mode="multiple"
            style={{ width: '100%' }}
            onChange={(value) => onChange(equipmentType, value, filterKey)}
            filterOption={
              (inputValue, item) => item?.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
            }
          >
            {selectOptions?.ids.map((selectOptionKey) => (
              <Select.Option
                key={selectOptionKey}
                value={selectOptions.byIds[selectOptionKey]}
                label={selectOptions.byIds[selectOptionKey]}
              >
                {selectOptions.byIds[selectOptionKey]}
              </Select.Option>
            ))}
          </Select>
        </Space>
      ) : null;
    })}
  </Space>
) : null);

export default FilterByType;
