import { useCallback, useState } from 'react';

import { Typography, Space, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import invert from 'lodash/invert';
import { SelectValue, LabeledValue } from 'antd/lib/select';
import isArray from 'lodash/isArray';

import FiltersStore, { FilterValuesType } from 'stores/listing/FiltersStore';
import TypesStore from 'stores/listing/TypesStore';
import { getAbbreviatedName } from 'utils/format';

import { generateDefaultFilters } from './utils';
import { FiltersContainer } from './styled';
import { DefaultFiltersType } from './types';
import FiltersByType from './FiltersByType';

type StoreProps = {
  filtersStore: FiltersStore,
  typesStore: TypesStore,
}

const FiltersComponent = ({ filtersStore, typesStore }: StoreProps) => {
  const { isLoading } = typesStore;
  const [selectedEquipmentTypes, setSelectedEquipmentTypes] = useState<string[]>([]);
  const filters: DefaultFiltersType | null = !typesStore.isLoading
    ? generateDefaultFilters(
      Object.values(typesStore.types.humanReadableTypeNameById),
      [
        getAbbreviatedName('Иванова Софья Ивановна'),
        getAbbreviatedName('Беляев Савва Михайлович'),
        getAbbreviatedName('Жукова Алиса Тимофеевна'),
      ],
    )
    : null;
  const typeIdByHumanReadableName = invert(typesStore.types.humanReadableTypeNameById);

  const handleOptionClick = useCallback(
    (filterKey: string, selectValue: SelectValue, subFilterKey?: string) => {
      if (!filters || selectValue === undefined) return;

      if (filterKey === 'type') {
        const filterOptions = filters.byIds[filterKey].options;
        const selectedOptions = isArray(selectValue)
          ? selectValue.map((optionKey: string | number | LabeledValue) => {
            const humanizedValue = typeof optionKey === 'object'
              ? filterOptions.byIds[optionKey.value]
              : filterOptions.byIds[optionKey];

            return typeIdByHumanReadableName[humanizedValue];
          })
          : typeIdByHumanReadableName[filterOptions.byIds[
            typeof selectValue === 'object'
              ? selectValue.value
              : selectValue
          ]];

        setSelectedEquipmentTypes(isArray(selectedOptions) ? selectedOptions : [selectedOptions]);
        filtersStore.handleFilterChange(filterKey, selectedOptions);

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
                showSearch
                mode="multiple"
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
                      {optionLabel}
                    </Select.Option>
                  );
                })}
              </Select>
            </Space>
          );
        })}
        {!isLoading && selectedEquipmentTypes && selectedEquipmentTypes.map((equipmentType) => (
          <div key={equipmentType}>
            <FiltersByType
              equipmentType={equipmentType}
              label={typesStore.types.humanReadableTypeNameById[equipmentType]}
              values={typesStore.types.byIds[equipmentType]}
              onChange={handleOptionClick}
            />
          </div>
        ))}
      </Space>
    </FiltersContainer>
  );
};

FiltersComponent.defaultProps = {} as StoreProps;

export default inject('filtersStore', 'typesStore')(observer(FiltersComponent));
