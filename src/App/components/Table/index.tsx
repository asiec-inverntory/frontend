import ActionBar from './ActionBar';
import ObjectDescription from './ObjectDescription';
import Pagination from './Pagination';
import { Container } from './styled';
import Table from './Table';

const TableContainer = () => (
  <Container>
    <ActionBar />
    <Table />
    <ObjectDescription />
    <Pagination />
  </Container>
);

export default TableContainer;
