import { Descriptions, Modal } from 'antd';
import { inject, observer } from 'mobx-react';

import DataStore from 'stores/listing/DataStore';

type StoreProps = {
  dataStore: DataStore;
}

const ObjectDescription = ({ dataStore }: StoreProps) => {
  const exampleValue = [
    {
      label: 'Тип',
      value: 'DDR3',
    },
    {
      label: 'Производитель',
      value: 'Ballistic',
    },
    {
      label: 'Модель',
      value: 'PSD34G13332',
    },
    {
      label: 'Частота',
      value: '2133 MHz',
    },
  ];

  return (
    <Modal
      visible={dataStore.isObjectDescriptionPopupOpen}
      footer={null}
      onCancel={dataStore.handleCloseDescriptionsPopup}
      centered
      width={document.documentElement.clientWidth / 2}
    >
      <Descriptions title={dataStore.objectDescription.title} column={2} labelStyle={{ fontWeight: 600 }}>
        {exampleValue.map((item, i) => (
          <Descriptions.Item key={i} label={item.label}>
            {item.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Modal>
  );
};

ObjectDescription.defaultProps = {} as StoreProps;

export default inject('dataStore')(observer(ObjectDescription));
