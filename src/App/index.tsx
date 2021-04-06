import './App.css';

import { MainContainer } from './styled';
import Table from './components/Table';
import Filters from './components/Filters';
import ActionPopup from './components/ActionPopup';

const App = () => (
  <>
    <MainContainer>
      <Filters />
      <Table />
    </MainContainer>
    <ActionPopup />
  </>
);

export default App;
