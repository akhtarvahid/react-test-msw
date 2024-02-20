import './App.css';
import Library from './components/library-management';
import NavBar from './components/common/navbar/NavBar';

function App() {
  return (
    <div className="App" data-testid="app">
       <NavBar title="Library" />
       <Library />
    </div>
  );
}

export default App;
