import {React, useState} from 'react';

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <>
        <div>
            <input type="text" placeholder="Email" value={email}
                onChange={event => setEmail(event.target.value)} />         {/* Set email at state when event onchange occurs */}
                
            <input type="password" placeholder="Password" value={password} 
                onChange={event => setPassword(event.target.value)} />      {/* Set password at state when event onchange occurs */}

            <button>Login</button>
            <button>Registration</button>
        </div>
    </>
}