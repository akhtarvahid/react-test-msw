import './App.css';
import NavBar from './components/common/navbar/NavBar';
import UsersApp from './components/users-app/Index';

function App() {
  return (
    <div className="App" data-testid="app">
       <NavBar title="Users App" />
       <UsersApp />
    </div>
  );
}

export default App;
