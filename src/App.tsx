import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from '@app/router/index';
import ScrollToTop from '@shared/components/ScrollToTop/ScrollToTop';
import './styles/index.css';
import Preloader from '@shared/components/Preloader/Preloader';
import { Toaster } from 'react-hot-toast';
import { useGetAccountQuery } from '@shared/api/auth.api';
import { useAppSelector } from '@store/hooks';

export default function App() {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    /**
     * Fetch account ONLY if user is authenticated
     * This keeps the session alive after refresh
     */
    useGetAccountQuery(undefined, {
        skip: !isAuthenticated,
    });

    /**
     * Handle first app load + preloader
     */
    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('app-loaded');

        if (hasLoaded) {
            setIsFirstLoad(false);
            setIsAppLoading(false);
        } else {
            sessionStorage.setItem('app-loaded', 'true');
        }
    }, []);

    const handleLoadingComplete = () => {
        setIsAppLoading(false);
    };

    /**
     * Show preloader ONLY on first visit
     */
    if (isAppLoading && isFirstLoad) {
        return (
            <Preloader
                onLoadingComplete={handleLoadingComplete}
                minLoadingTime={1500}
            />
        );
    }

    return (
        <HelmetProvider>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
            </BrowserRouter>
        </HelmetProvider>
    );
}
