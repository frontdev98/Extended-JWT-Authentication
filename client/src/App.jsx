import { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './main'
import {observer} from 'mobx-react-lite'
import UserService from './services/UserService'

function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState([])

  useEffect( () => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data.users)

    } catch(e) {
      console.log(e)
    }
  }

  return (
    <>
      <div>
        <h1>{store.isAuth ? `Welcome, ${store.user.email}` : 'Login or register'}</h1>
        <LoginForm />
      </div>

      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      
      {
        users.map(user =>
          <div key={user.email}>{user.email}</div>
        )
      }
    </>
  )
}

export default observer(App)