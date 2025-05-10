import { useEffect, useState, createContext, useContext } from 'react';
import StoreProvider from '@/lib/storeProvider';
import LoginComponent from '@/components/login';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import type { AppProps } from "next/app";
import '../styles/globals.scss';
import Sidebar from '@/components/shared/sidebar';
import Header from '@/components/shared/header';
export default function App({ Component, pageProps }: AppProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const publicRoutes = ['/login', '/register'];

  useEffect(() => {
    const token = Cookies.get('userToken');
    setIsAuthenticated(!!token);
    setIsChecking(false);
  }, []);

  if (isChecking) return null;

  // If the user is not authenticated and trying to access a protected route, show the login page
  if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
    return (
      <StoreProvider>
        <LoginComponent />
      </StoreProvider>
    );
  }

  // For public routes like login and register
  if (publicRoutes.includes(router.pathname)) {
    return (
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }

  return (
    <StoreProvider>
      <div
        className="flex h-screen bg-gray-100 overflow-hidden bg-cover bg-center"
        id="main-app"
        style={{
          backgroundImage: `url(https://images7.alphacoders.com/693/thumb-1920-693172.jpg)`
        }}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-x-auto mt-[64px]">
            <div className="text-white bg-gray-950 p-6 bg-opacity-95 font-bold text-sm">
              Welcome to your project management dashboard.
            </div>
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </StoreProvider>
  );
}
