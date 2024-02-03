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
  const colorSetter = (fields: FormField) => {
     setFavColors((colors: any) => ([fields, ...colors]))
  }

  console.log(favColors)
  return (
    <div className="App" data-testid="app">
      <HeroTitle title="Hero Title" />
      <CreateForm colorSetter={colorSetter} />
    </div>
  );
}

export default App;
