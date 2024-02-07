import React, { useEffect, useState } from 'react'


const UsersList: React.FC = () => {
    const [users, setUsers] = useState<object[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<null | string>('');
    const [input, setInput] = useState('');

    useEffect(() => {
        setFetching(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                setUsers(res);
                setFetching(false);
            })
            .catch(() => setError('Something happened'))
    }, [])

    if (fetching) {
        return <h1>Fetching latest posts...</h1>
    }
    console.log('users::', users)

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {!error ? users && users.map((user: any, i) =>
                    <li style={{ background: 'lightslategray' }} key={i}>{user.name}</li>
                ) : <div>Something happened</div>}
            </ul>
            <input type='text' placeholder='Enter something' onChange={(e) => setInput(e.target.value)}/>
            <button onClick={(e) => {
                e.preventDefault();
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(input)
                })
                .then()
            }}>Send</button>
        </div>
    )
}
export default UsersList