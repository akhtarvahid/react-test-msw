import './App.css';
import CrudWithSWR from './components/crud-swr';

function App() {
  return (
    <div className="App" data-testid="app">
       <CrudWithSWR />
    </div>
  );
}

export default App;
