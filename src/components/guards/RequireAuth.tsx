import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useGetAccountQuery } from '@store/api/auth.api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '@store/slices/auth.slice';
import GuardLoader from './GuardLoader';

interface RequireAuthProps {
    children: React.ReactElement;
    requiredRole?: 'admin' | 'user';
}

export default function RequireAuth({ children, requiredRole }: RequireAuthProps) {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const token = useAppSelector((s) => s.auth.accessToken);
    const { data, isLoading, isFetching, isError, error } = useGetAccountQuery(undefined, { skip: !token });

    const redirectTo = useMemo(
        () => `${location.pathname}${location.search}${location.hash}`,
        [location.hash, location.pathname, location.search],
    );

    if (isLoading || isFetching) {
        return <GuardLoader message="Authenticating your session..." />;
    }

    if (!token) {
        const loginPath = requiredRole === 'admin' ? '/admin/auth/login' : '/auth/login';
        return <Navigate to={loginPath} replace state={{ from: redirectTo }} />;
    }

    if (isError) {
        const status = (error as any)?.status;
        if (status === 401) {
            dispatch(logout());
            return <Navigate to={requiredRole === 'admin' ? '/admin/auth/login' : '/auth/login'} replace state={{ from: redirectTo }} />;
        }
        return children;
    }

    if (!data?.data) {
        return <Navigate to={requiredRole === 'admin' ? '/admin/auth/login' : '/auth/login'} replace state={{ from: redirectTo }} />;
    }

     if (requiredRole && data.data.role !== requiredRole) {
        const fallback = requiredRole === 'admin' ? '/dashboard/property-listing' : '/admin';
        return <Navigate to={fallback} replace />;
    }

    return children;
}
