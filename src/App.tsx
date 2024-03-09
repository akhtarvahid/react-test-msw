import './App.css';
import NavBar from './components/common/navbar/NavBar';
import Table from './components/table/Index';

function App() {
  return (
    <div className="App" data-testid="app">
       <NavBar title="Table" />
       <Table />
    </div>
  );
}

export default App;
