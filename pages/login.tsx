import { useState } from 'react';
import cookie from 'js-cookie';
import axios from "axios";
import Router from 'next/router'

import { parse } from 'cookie';

function LoginPage() {

    const [email, setEmail] = useState('q');
    const [password, setPassword] = useState('w11');


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await axios.post('/api/login', {email, password})

        if (res.status === 200) {
            cookie.set('token', res.headers['authorization']);
            Router.push('/profile')
        } else {
            console.error('Login failed.'); // todo add toaster
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


export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const token = cookies.token;

    if (token) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        };
    }

    return {
        props: {}
    };
}
