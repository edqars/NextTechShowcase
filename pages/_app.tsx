import '@component/styles/globals.scss'
import type { AppProps } from 'next/app'
import {useRouter} from "next/router";
import Cookies from 'js-cookie';
import {useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {

  // Only use the useRouter hook on the client-side of the app
  // const router = typeof window !== 'undefined' ? useRouter() : null;
  //
  // // Check if the authToken cookie exists
  // const authToken = Cookies.get('token');
  // const isLoginPage = router?.pathname === '/login';
  //
  // // If the authToken cookie does not exist and the user is not on the login page,
  // // redirect them to the login page
  // if (!authToken && !isLoginPage && router) {
  //   router.push('/login');
  // }


  // const router = useRouter();
  // useEffect(() => {
  //   const authToken = Cookies.get('token');
  //
  //   if (!authToken && router.pathname !== '/login') {
  //     router.push('/login');
  //   }
  // }, [router.pathname]);


  return <Component {...pageProps} />
}

// changes to create Pull Request!
