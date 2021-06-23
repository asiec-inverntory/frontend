import { useCallback, useState } from 'react';

import { Typography, Space, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import invert from 'lodash/invert';
import { SelectValue, LabeledValue } from 'antd/lib/select';
import isArray from 'lodash/isArray';

import FiltersStore, { FilterValuesType } from 'stores/listing/FiltersStore';
import AttributesStore from 'stores/listing/AttributesStore';
import { getAbbreviatedName } from 'utils/format';

import { generateDefaultFilters } from './utils';
import { FiltersContainer } from './styled';
import { DefaultFiltersType } from './types';
import FiltersByType from './FiltersByType';

type StoreProps = {
  filtersStore: FiltersStore,
  attributesStore: AttributesStore,
}

const FiltersComponent = ({ filtersStore, attributesStore }: StoreProps) => {
  const { isLoading } = attributesStore;
  const { fetchedFilters } = filtersStore;
  const [selectedEquipmentType, setSelectedEquipmentType] = useState<string>();
  const filters: DefaultFiltersType | null = !attributesStore.isLoading
    ? generateDefaultFilters(
      Object.values(attributesStore.types.humanReadableTypeNameById),
      fetchedFilters.byIds.responsible,
    )
    : null;
  const typeIdByHumanReadableName = invert(attributesStore.types.humanReadableTypeNameById);

  const handleOptionClick = useCallback(
    (filterKey: string, selectValue: SelectValue, subFilterKey?: string) => {
      if (!filters) return;

      if (selectValue === undefined) {
        filtersStore.handleFilterChange(filterKey, [], subFilterKey);

        if (filterKey === 'type') setSelectedEquipmentType('');

        return;
      }

      if (filterKey === 'type') {
        const typeValue = selectValue as number;
        const filterOptions = filters.byIds[filterKey].options;

        const selectedOption = typeIdByHumanReadableName[filterOptions.byIds[typeValue]];

        setSelectedEquipmentType(selectedOption);
        filtersStore.handleFilterChange(filterKey, selectedOption);

        return;
      }

      let value: FilterValuesType = '';

      if (isArray(selectValue)) {
        value = selectValue.map(
          (optionKey: string | number | LabeledValue) =>
            (typeof optionKey === 'object' ? optionKey.value : optionKey),
        );
      }

      if (!isArray(selectValue))
        value = typeof selectValue === 'object' ? selectValue.value : selectValue;

      filtersStore.handleFilterChange(filterKey, value, subFilterKey);
    },
    [filters, typeIdByHumanReadableName, filtersStore],
  );

  return (
    <FiltersContainer>
      <Space direction="vertical" size="large">
        <Typography.Text strong>
          Фильтры:
        </Typography.Text>
        {!isLoading && filters && filters.ids.map((filterKey) => {
          const { label, options } = filters.byIds[filterKey];

          return (
            <Space key={filterKey} direction="vertical" size="small" style={{ width: '100%' }}>
              <Typography.Text>
                {label}
              </Typography.Text>
              <Select
                allowClear
                style={{ width: '100%' }}
                onChange={(selectedOptions) => handleOptionClick(filterKey, selectedOptions)}
                filterOption={
                  (inputValue, option) => option?.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                }
              >
                {options.ids.map((optionKey) => {
                  const optionLabel = options.byIds[optionKey];

                  return (
                    <Select.Option
                      key={optionKey}
                      label={optionLabel}
                      value={filterKey === 'type' ? optionKey : optionLabel}
                    >
                      {filterKey === 'responsible' ? getAbbreviatedName(optionLabel) : optionLabel}
                    </Select.Option>
                  );
                })}
              </Select>
            </Space>
          );
        })}
        {!isLoading && selectedEquipmentType && (
          <FiltersByType
            equipmentType={selectedEquipmentType}
            label={attributesStore.types.humanReadableTypeNameById[selectedEquipmentType]}
            values={attributesStore.types.byIds[selectedEquipmentType]}
            onChange={handleOptionClick}
          />
        )}
      </Space>
    </FiltersContainer>
  );
};

FiltersComponent.defaultProps = {} as StoreProps;

export default inject('filtersStore', 'attributesStore')(observer(FiltersComponent));
