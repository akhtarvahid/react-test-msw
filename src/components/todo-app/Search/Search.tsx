

interface SearchType {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    children: React.ReactNode
}
const Search = ({ value, onChange, children }: SearchType) => {
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
export default Search;