import ActionBar from './ActionBar';
import { Container } from './styled';
import Table from './Table';
import { TablePropsType } from './types';

type ExampleDataType = {
  name: string;
  responsible: string;
  place: string;
};

const exampleStoreData: TablePropsType<ExampleDataType & { key: number | string }> = {
  data: [
    {
      key: 1,
      name: 'Монитор',
      responsible: 'Иванова Софья Ивановна',
      place: '2 к. 101 каб.',
    },
    {
      key: 2,
      name: 'Монитор',
      responsible: 'Беляев Савва Михайлович',
      place: '1 к. 204 каб.',
    },
    {
      key: 3,
      name: 'Рабочее место',
      responsible: 'Жукова Алиса Тимофеевна',
      place: '2 к. 303 каб.',
    },
  ],
  columnKeys: ['name', 'responsible', 'place'],
};

const TableContainer = () => (
  <Container>
    <ActionBar />
    <Table {...exampleStoreData} />
  </Container>
);

export default TableContainer;
