import {NextRequest, NextResponse} from "next/server";
import { parse } from 'cookie';

export async function middleware(req: NextRequest) {
    const cookie = req.headers.get('cookie')
    const cookies = parse(cookie || '');


    if (cookies.token === undefined || cookies.token === null) {
        const signinUrl = new URL('login', req.url)
        return NextResponse.redirect(signinUrl)
    }


    return NextResponse.next()
}

export const config = {
    matcher: ['/profile/:path*', '/photos/:path*', '/news/:path*'],
}
