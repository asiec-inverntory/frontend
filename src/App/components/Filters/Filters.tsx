import { Typography, Space, Select } from 'antd';

import { FiltersContainer } from './styled';
import { FiltersPropTypes } from './types';

const FiltersComponent = ({ filters }: FiltersPropTypes) => (
  <FiltersContainer>
    <Space direction="vertical" size="large">
      <Typography.Text strong>
        Фильтры:
      </Typography.Text>
      {filters.ids.map((filterKey) => {
        const { label, options } = filters.byIds[filterKey];

        return (
          <Space key={filterKey} direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Text>
              {label}
            </Typography.Text>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              allowClear
            >
              {options.ids.map((optionKey) => {
                const optionLabel = options.byIds[optionKey];

                return (
                  <Select.Option key={optionKey} value={optionKey} label={optionLabel}>
                    <Typography.Text>
                      { optionLabel }
                    </Typography.Text>
                  </Select.Option>
                );
              })}
            </Select>
          </Space>
        );
      })}
    </Space>
  </FiltersContainer>
);

export default FiltersComponent;
