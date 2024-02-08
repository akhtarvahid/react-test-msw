import { useState } from 'react';
import './App.css';
import CreateForm from './components/createForm/CreateForm';
import HeroTitle from './components/heroText/heroTitle';

export type FormField = {
  name: string,
  location: string,
  color: string
}

function App() {
  const [favColors, setFavColors] = useState<FormField[]>([]);

  return (
    <div className="App" data-testid="app">
      <HeroTitle title="Hero Title" />
      <CreateForm setFavColors={setFavColors} />
    </div>
  );
}

export default App;
