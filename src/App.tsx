import './App.css';
import HeroTitle from './components/heroText/heroTitle';
import TodoApp from './components/todo-app';
import RtltApp from './components/rtlt/RtltApp';

function App() {
  return (
    <div className="App" data-testid="app">
      <HeroTitle title="Todo App" />
      <TodoApp />
      <RtltApp />
    </div>
  );
}

export default App;
