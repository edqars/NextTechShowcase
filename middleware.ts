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



// Here you can specify all the paths for which this middleware function should run
// Supports both a single string value or an array of matchers
export const config = {
    matcher: ['/profile/:path*', '/photos/:path*', '/news/:path*'],
}
