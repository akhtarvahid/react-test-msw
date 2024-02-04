import React, { useEffect, useState } from 'react'

const Listing: React.FC = () => {
    const [users, setUsers] = useState<string[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<null | string>('');

    useEffect(() => {
        setFetching(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                const names = res?.map((r: any) => r.name);
                setUsers(names);
                localStorage.setItem('names', names);
                setFetching(false);
            })
            .catch(() => setError('Something happened'))
    }, [])

    if (fetching) {
        return <h1>Fetching latest posts...</h1>
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {!error ? users && users.map((user: any, i) =>
                    <li style={{ background: 'lightslategray' }} key={i}>{user}</li>
                ): <div>Something happened</div>}
            </ul>
        </div>
    )
}
export default Listing;