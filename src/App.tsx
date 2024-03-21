import './App.css';
import NavBar from './components/common/navbar/NavBar';
import CrudWithSWR from './components/crud-swr';

function App() {
  return (
    <div className="App" data-testid="app">
       <NavBar title="SWR" />
       <CrudWithSWR />
    </div>
  );
}

export default App;
