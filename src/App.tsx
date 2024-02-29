import './App.css';
import NavBar from './components/common/navbar/NavBar';
import Library from './components/library-management';

function App() {
  return (
    <div className="App" data-testid="app">
       <NavBar title="Library" />
       <Library />
    </div>
  );
}

export default App;
