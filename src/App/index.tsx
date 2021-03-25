import './App.css';

import { MainContainer } from './styled';
import Table from './components/Table';
import Filters from './components/Filters';

const App = () => (
  <MainContainer>
    <Filters />
    <Table />
  </MainContainer>
);

export default App;
