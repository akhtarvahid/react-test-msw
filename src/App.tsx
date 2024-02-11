import { useState } from 'react';
import './App.css';
import HeroTitle from './components/heroText/heroTitle';
import TodoApp from './components/todo-app';

export type FormField = {
  name: string,
  location: string,
  color: string
}

function App() {
  const [favColors, setFavColors] = useState<FormField[]>([]);

  return (
    <div className="App" data-testid="app">
      <HeroTitle title="Todo App" />
      <TodoApp />
    </div>
  );
}

export default App;
