import { useState } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

function UsersApp() {
  const [users, setUsers] = useState<any>([]);

  const onUserAdd = (user: any) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users} />
    </div>
  );
}

export default UsersApp;
