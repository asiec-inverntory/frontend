import ActionBar from './ActionBar';
import Pagination from './Pagination';
import { Container } from './styled';
import Table from './Table';

const TableContainer = () => (
  <Container>
    <ActionBar />
    <Table />
    <Pagination />
  </Container>
);

export default TableContainer;
