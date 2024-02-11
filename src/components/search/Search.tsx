import React, { ChangeEvent } from 'react'

type User = {
    id: string,
    name: string;
}

const getUser = () => {
    return Promise.resolve({ id: '1', name: 'Robin' });
};
const SearchRoot = () => {
    const [search, setSearch] = React.useState('');
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const loadUser = async () => {
            const user = await getUser();
            setUser(user);
        };

        loadUser();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    return (
        <div>
            {user ? <p>Signed in as {user.name}</p> : null}

            <Search value={search} onChange={handleChange}>
                Search:
            </Search>

            <p>Searches for {search ? search : '...'}</p>
        </div>
    );
}

interface SearchType {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    children: React.ReactNode
}
function Search({ value, onChange, children }: SearchType) {
    return (
        <div>
            <label htmlFor="search">{children}</label>
            <input
                id="search"
                type="text"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchRoot;