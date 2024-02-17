import './App.css';
import CrudWithSWR from './components/crud-swr';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <div className="App" data-testid="app">
      <NavBar title="Todo with SWR" />
       <CrudWithSWR />
    </div>
  );
}

export default App;
