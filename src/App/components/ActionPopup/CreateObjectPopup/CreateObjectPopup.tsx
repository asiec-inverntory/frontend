import { useState } from 'react';

import { Form, InputNumber, Modal, Input } from 'antd';
import { inject } from 'mobx-react';
import isNumber from 'lodash/isNumber';

import InputWithSearch from 'App/components/InputWithSearch';
import TypesStore from 'stores/listing/TypesStore';
import measureUnits from 'utils/measureUnits';
import { NewEquipmentObject, Property } from 'stores/listing/ActionStore';

type StoreProps = {
  typesStore: TypesStore;
};

type CreateObjectPopupPropsType = StoreProps & {
  onComplete: (values: NewEquipmentObject) => void;
  onCancel: () => void;
};

const CreateObjectPopup = ({ typesStore, onComplete, onCancel }: CreateObjectPopupPropsType) => {
  const [form] = Form.useForm();
  const [selectedEquipmentType, setSelectedEquipmentType] = useState<string | undefined>(undefined);
  const { types } = typesStore;

  const handleComplete = (values: { [key: string]: string }) => {
    const properties: Property[] = [];

    Object.keys(values).map((key) => (properties.push({
      key,
      value: values[key],
    })));
    const newObject: NewEquipmentObject = {
      label: types.humanReadableTypeNameById[values.equipmentType],
      type: values.equipmentType,
      serialCode: values.serialCode,
      properties,
    };

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
        labelCol={{ span: 7 }}
        layout="horizontal"
        onFinish={(values) => handleComplete(values)}
      >
        <Form.Item
          name="equipmentType"
          label="Тип предмета"
          rules={[{ required: true }]}
          style={{ marginBottom: selectedEquipmentType ? 18 : 0 }}
        >
          <InputWithSearch
            value={selectedEquipmentType}
            placeholder="Выберите тип нового предмета..."
            values={types.ids.map((type) => ({
              key: type,
              value: types.humanReadableTypeNameById[type],
            }))}
            onChange={(value) => setSelectedEquipmentType(value)}
          />
        </Form.Item>
        {selectedEquipmentType && (
          <Form.Item
            name="serialCode"
            label="Серийный номер"
            rules={[{ required: true }]}
            style={{ marginBottom: selectedEquipmentType ? 18 : 0 }}
          >
            <Input />
          </Form.Item>
        )}
        {selectedEquipmentType && types.byIds[selectedEquipmentType].map((attribute) => {
          const { id, humanReadable, values, min, max } = attribute;
          const measureUnit = measureUnits[selectedEquipmentType][attribute.id];
          const defaultMeasureUnit = measureUnit?.default;
          const isInputNumber = isNumber(min && max);

          return (
            <Form.Item noStyle key={id}>
              {values ? (
                <Form.Item
                  name={id}
                  rules={[{ required: true }]}
                  label={defaultMeasureUnit ? `${humanReadable} (${measureUnit[defaultMeasureUnit]})` : humanReadable}
                >
                  <InputWithSearch
                    values={values.map((value, i) => ({
                      key: String(i),
                      value: String(value),
                    }))}
                    placeholder="Выберите значение из списка..."
                  />
                </Form.Item>
              ) : null}
              {isInputNumber ? (
                <InputNumber min={min} max={max} defaultValue={1} />
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
