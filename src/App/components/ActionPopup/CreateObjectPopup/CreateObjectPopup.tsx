import { useState } from 'react';

import { Form, Modal, Input, Select, InputNumber } from 'antd';
import { inject } from 'mobx-react';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import isArray from 'lodash/isArray';

import InputWithAutocomplete from 'App/components/InputWithAutocomplete';
import AttributesStore from 'stores/listing/AttributesStore';
import measureUnits from 'utils/measureUnits';
import { EquipmentObject, NewEquipmentObject, Property } from 'stores/listing/ActionStore';

import { FormContainer } from './styled';

type StoreProps = {
  attributesStore: AttributesStore;
};

type CreateObjectPopupPropsType = StoreProps & {
  equipmentObject: EquipmentObject | undefined;
  onComplete: (values: NewEquipmentObject) => void;
  onEdit: (id: string, values: EquipmentObject) => void;
  onCancel: () => void;
};

const validateMessages = {
  required: 'Поле не может быть пустым',
  types: {
    number: 'В этом поле могут быть только числа',
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: 'Значение должно быть между ${min} и ${max}',
  },
};

const CreateObjectPopup = ({
  attributesStore,
  equipmentObject,
  onComplete,
  onEdit,
  onCancel,
}: CreateObjectPopupPropsType) => {
  const [form] = Form.useForm();

  const propertiesById = keyBy(equipmentObject?.properties, (item) => item.key);
  const initialValues = mapValues(propertiesById, (item) => item.value);

  const [selectedEquipmentType, setSelectedEquipmentType] = useState<string | undefined>(equipmentObject?.type);
  const { types } = attributesStore;

  const equipmentTypes = selectedEquipmentType
    ? types.byIds[selectedEquipmentType]
    : undefined;

  if (isArray(equipmentTypes)) return null;

  const handleComplete = (values: { [key: string]: string }) => {
    if (!selectedEquipmentType || !equipmentTypes) return;
    const properties: Property[] = equipmentTypes.ids.map((key) => ({
      key,
      value: values[key],
    }));

    const newObject: NewEquipmentObject = {
      label: types.humanReadableTypeNameById[values.equipmentType],
      type: values.equipmentType,
      serialCode: values?.serialCode,
      inventoryCode: values?.inventoryCode,
      properties,
    };

    if (equipmentObject) {
      onEdit(equipmentObject.id, {
        ...newObject,
        id: equipmentObject.id,
      });

      return;
    }

    onComplete(newObject);
  };

  return (
    <Modal
      title="Создание нового предмета"
      visible
      centered
      closable={false}
      okText="Закончить"
      onCancel={() => onCancel()}
      cancelButtonProps={{
        danger: true,
      }}
      okButtonProps={{
        form: 'create-new-object-form',
        htmlType: 'submit',
      }}
    >
      <FormContainer>
        <Form
          id="create-new-object-form"
          form={form}
          name="create-new-object"
          initialValues={initialValues}
          layout="vertical"
          onFinish={(values) => handleComplete(values)}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="equipmentType"
            label="Тип предмета:"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите тип предмета',
              },
            ]}
            style={{ marginBottom: selectedEquipmentType ? 18 : 0 }}
          >
            <Select
              value={selectedEquipmentType}
              style={{ width: '100%' }}
              placeholder="Выберите тип нового предмета..."
              filterOption={(input, option) => option?.children.toLowerCase().includes(input.toLowerCase())}
              onChange={(value) => setSelectedEquipmentType(value)}
            >
              {types.ids.map((type) => {
                const value = types.humanReadableTypeNameById[type];

                return (
                  <Select.Option key={type} value={type}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          {selectedEquipmentType && (
            <Form.Item
              name="serialCode"
              label="Серийный номер:"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          {selectedEquipmentType && equipmentTypes &&
          equipmentTypes.ids.map((id) => {
            const { humanReadable, values, valueType, minimum, maximum } = equipmentTypes.byIds[id];
            const measureUnit = measureUnits[selectedEquipmentType] ? measureUnits[selectedEquipmentType][id] : {};
            const defaultMeasureUnit = measureUnit?.default;
            const isNumber = valueType === 'NUMBER' || valueType === 'RANGE';

            return (
              <Form.Item noStyle key={id}>
                {values ? (
                  <Form.Item
                    name={id}
                    rules={[
                      {
                        required: true,
                        type: isNumber ? 'number' : 'string',
                        min: minimum || 0,
                        max: maximum || 999,
                      },
                    ]}
                    label={
                      defaultMeasureUnit
                        ? `${humanReadable} (${measureUnit[defaultMeasureUnit]}):`
                        : `${humanReadable}:`
                    }
                  >
                    {isNumber
                      ? <InputNumber min={minimum} max={maximum} style={{ width: '100%' }} />
                      : <InputWithAutocomplete values={values.map((value) => value)} />}
                  </Form.Item>
                ) : null}
              </Form.Item>
            );
          })}
        </Form>
      </FormContainer>
    </Modal>
  );
};

CreateObjectPopup.defaultProps = {} as StoreProps;

export default inject('attributesStore')(CreateObjectPopup);
