import { useState } from 'react';
import './App.css';
import CreateForm from './components/createForm/CreateForm';
import HeroTitle from './components/heroText/heroTitle';
import Listing from './components/listing/Listing';
import UsersList from './components/userLists/UsersList';

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
      {/* <Listing /> */}
      <UsersList />
      <div data-testid="lists">
        {favColors.map((color, i) =>
          <div key={`${color.name}: ${i}`}>{color.name}</div>
        )}
      </div>
    </div>
  );
}

export default App;
