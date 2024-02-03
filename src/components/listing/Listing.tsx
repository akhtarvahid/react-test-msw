import React, { useEffect, useState } from 'react'

const Listing: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => setUsers(res))
            .catch(err => setError(err))
    }, [])

    console.log(users)

    return (
        <div>
            <h1>Users</h1>
            <div>
                {!error && users && users.map((user: any) =>
                    <p style={{ background: 'lightslategray' }} key={user.id}>{user.name}</p>
                )}
            </div>
        </div>
    )
}
export default Listing;