import React, { useEffect, useState } from 'react'


const UserList = () => {

    const [users, setUsers] = useState<any>({});

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => setUsers(res))
    }, [])

    console.log(users)
    return (
        <div>
            <h1>Users</h1>
            {users?.products?.length > 0 ? <ul>
                {users.products?.map((product: any) =>
                    <li key={product.id}>{product.title}</li>
                )}
            </ul> : <h2>Results not found</h2>}
        </div>
    )
}

export default UserList;