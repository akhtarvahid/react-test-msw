import React, { useEffect, useState } from 'react'


const UserList = () => {

    const [users, setUsers] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                setUsers(res);
                setIsLoading(false);
            })
    }, [])

    if(isLoading && users?.length === 0) {
        return <h1>Loading...</h1>
    }
    console.log(users)
    return (
        <div>
            <h1>Users</h1>
            {users?.length > 0 ? <ul>
                {users?.map((product: any) =>
                    <li key={product.id}>{product.name}</li>
                )}
            </ul> : <h2>Results not found</h2>}
        </div>
    )
}

export default UserList;