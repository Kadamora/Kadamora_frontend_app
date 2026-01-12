import { Navigate } from 'react-router-dom';
import { useGetAccountQuery } from '@store/api/auth.api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '@store/slices/auth.slice';
import GuardLoader from './GuardLoader';

interface RedirectIfAuthenticatedProps {
    children: React.ReactElement;
}

export default function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
    const token = useAppSelector((s) => s.auth.accessToken);
    const dispatch = useAppDispatch();

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetAccountQuery(undefined, {
        skip: !token,
    });

    // 🔄 No token → allow page (login/register)
    if (!token) {
        return children;
    }

    // ⏳ Still checking account
    if (isLoading || isFetching) {
        return <GuardLoader message="Checking your account..." />;
    }

    // ❌ Token invalid
    if (isError) {
        if ((error as any)?.status === 401) {
            dispatch(logout());
        }
        return children;
    }

    // ✅ Logged in → redirect
    if (data?.data) {
         const role = data.data.role;
        const dest = role === 'admin' ? '/admin' : '/dashboard';
        return <Navigate to={dest} replace />;
    }

    return children;
}
