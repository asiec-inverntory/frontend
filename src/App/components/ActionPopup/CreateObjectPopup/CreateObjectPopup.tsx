import { useState } from 'react';

import { Form, Modal, Input, Select } from 'antd';
import { inject } from 'mobx-react';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import isArray from 'lodash/isArray';

import InputWithAutocomplete from 'App/components/InputWithAutocomplete';
import TypesStore from 'stores/listing/TypesStore';
import measureUnits from 'utils/measureUnits';
import { EquipmentObject, NewEquipmentObject, Property } from 'stores/listing/ActionStore';

type StoreProps = {
  typesStore: TypesStore;
};

type CreateObjectPopupPropsType = StoreProps & {
  equipmentObject: EquipmentObject | undefined;
  onComplete: (values: NewEquipmentObject) => void;
  onEdit: (id: string, values: EquipmentObject) => void;
  onCancel: () => void;
};

const CreateObjectPopup = ({
  typesStore,
  equipmentObject,
  onComplete,
  onEdit,
  onCancel,
}: CreateObjectPopupPropsType) => {
  const [form] = Form.useForm();

  const propertiesById = keyBy(equipmentObject?.properties, (item) => item.key);
  const initialValues = mapValues(propertiesById, (item) => item.value);

  const [selectedEquipmentType, setSelectedEquipmentType] = useState<string | undefined>(equipmentObject?.type);
  const { types } = typesStore;

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
      <Form
        id="create-new-object-form"
        form={form}
        name="create-new-object"
        initialValues={initialValues}
        labelCol={{ span: 7 }}
        layout="horizontal"
        onFinish={(values) => handleComplete(values)}
      >
        <Form.Item
          name="equipmentType"
          label="Тип предмета"
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
            label="Серийный номер"
            rules={[
              {
                required: true,
                message: 'Серийный номер не может быть пустым',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {selectedEquipmentType && equipmentTypes &&
          equipmentTypes.ids.map((id) => {
            const { humanReadable, values } = equipmentTypes.byIds[id];
            const measureUnit = measureUnits[selectedEquipmentType][id];
            const defaultMeasureUnit = measureUnit?.default;

            return (
              <Form.Item noStyle key={id}>
                {values ? (
                  <Form.Item
                    name={id}
                    rules={[
                      {
                        required: true,
                        message: 'Поле не может быть пустым',
                      },
                    ]}
                    label={defaultMeasureUnit ? `${humanReadable} (${measureUnit[defaultMeasureUnit]})` : humanReadable}
                  >
                    <InputWithAutocomplete values={values.map((value) => String(value))} />
                  </Form.Item>
                ) : null}
              </Form.Item>
            );
          })}
      </Form>
    </Modal>
  );
};

CreateObjectPopup.defaultProps = {} as StoreProps;

export default inject('typesStore')(CreateObjectPopup);
