import { useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            cookie.set('token', data.token);
            router.push('/');
        } else {
            console.error('Login failed.');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="text" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Get me in</button>
            </form>
        </div>
    );
}

export default LoginPage;
