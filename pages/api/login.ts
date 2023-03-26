import {getUserByEmail} from "../../utils/database";
import { v4 as uuidv4 } from 'uuid';


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

    const authToken = uuidv4();

    res.setHeader('Authorization', authToken);


    return res.status(200).json({ message: 'Login successful!!!' });
}

