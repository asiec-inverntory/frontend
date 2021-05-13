import { Descriptions, Modal } from 'antd';
import { inject, observer } from 'mobx-react';

import DataStore from 'stores/listing/DataStore';

type StoreProps = {
  dataStore: DataStore;
}

const ObjectDescription = ({ dataStore }: StoreProps) => (
  <Modal
    visible={dataStore.isObjectDescriptionPopupOpen}
    footer={null}
    onCancel={dataStore.handleCloseDescriptionsPopup}
    centered
    width={document.documentElement.clientWidth / 3}
  >
    <Descriptions title={dataStore.objectDescription.title} column={2} labelStyle={{ fontWeight: 600 }}>
      {dataStore.objectDescription.characteristics.map((item, i) => (
        <Descriptions.Item key={i} label={item.label}>
          {item.value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  </Modal>
);

ObjectDescription.defaultProps = {} as StoreProps;

export default inject('dataStore')(observer(ObjectDescription));
