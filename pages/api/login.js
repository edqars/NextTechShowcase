import bcrypt from 'bcrypt';
import {getUserByEmail} from "../../utils/database";

export default async function login(req, res) {
    const { email, password } = req.body;
    const user = getUserByEmail(email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const matchPasswords = password === user.password

    if (!matchPasswords) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate authentication token and set cookie
    const authToken = 'some-auth-token';
    res.setHeader('Set-Cookie', `authToken=${authToken}; HttpOnly`);

    return res.status(200).json({ message: 'Login successful' });
}
