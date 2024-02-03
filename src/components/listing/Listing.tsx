import React, { useEffect, useState } from 'react'

const Listing: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => setUsers(res?.map((r: any) => r.name)))
            .catch(err => setError(err))
    }, [])


    return (
        <div>
            <h1>Users</h1>
            <div>
                {!error && users && users.map((user: any, i) =>
                    <p style={{ background: 'lightslategray' }} key={i}>{user}</p>
                )}
            </div>
        </div>
    )
}
export default Listing;