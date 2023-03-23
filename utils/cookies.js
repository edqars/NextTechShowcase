// тестовое прикручивание кукиз. в процессе, оставил как есть


import cookie from 'cookie';

export const setCookie = (key, value, maxAge) => {
    const cookieValue = cookie.serialize(key, value, {
        maxAge,
        expires: new Date(Date.now() + maxAge * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    document.cookie = cookieValue;
};



export const getCookie = (key) => {
    const cookies = cookie.parse(document.cookie);

    return cookies[key];
};
