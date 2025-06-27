import {React, useContext, useState} from 'react';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

export default observer(function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)

    return <>
        <div>
            <input type="text" placeholder="Email" value={email}
                onChange={event => setEmail(event.target.value)} />         {/* Set email at state when event onchange occurs */}
                
            <input type="password" placeholder="Password" value={password} 
                onChange={event => setPassword(event.target.value)} />      {/* Set password at state when event onchange occurs */}

            {
                store.isAuth ? 
                <button onClick={() => store.logout()}>Logout</button> :
                <button onClick={() => store.login(email, password)}>Login</button>   
            }
            
            <button onClick={() => store.registration(email, password)}>Registration</button>
        </div>
    </>
})