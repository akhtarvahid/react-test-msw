import Todos from './Todos/Todos';
import Create from './Create/create';
import Search from './Search/Search';
import { useState } from 'react';

const TodoApp = () => {
    const [searchText, setSearchedText] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedText(e.target.value);
    }
    return (
        <>
            <Create />

            <Search value={searchText} onChange={handleChange}>
                Search:
            </Search>
            <Todos searchText={searchText} />
        </>
    )
}
export default TodoApp;