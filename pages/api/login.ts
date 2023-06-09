import { Users } from '../../utils/data/users';

export default function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'only POST requests are allowed' });
      return;
    }
    const body = JSON.parse(JSON.stringify(req.body));
    const user = Users.find(
      (user) =>
        user.email === body.email && user.password === parseInt(body.password)
    );
    if (!user) {
      res.status(404).send({ message: 'User not fount!' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(405).send({ message: '{error.message}' });
  }
}
