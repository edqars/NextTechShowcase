export function getUserByEmail(email) {
    const userEmail = process.env.USER_EMAIL;
    const hashedPassword = process.env.USER_PASSWORD;

    if (email === userEmail) {
        return {
            email: userEmail,
            password: hashedPassword
        };
    } else {
        return null;
    }
}
