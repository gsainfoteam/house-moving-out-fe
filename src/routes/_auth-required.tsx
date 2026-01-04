import {
  createFileRoute,
  Navigate,
  Outlet,
  useRouter,
} from '@tanstack/react-router';

import { useToken } from '@/common/viewmodels';
import { useConsent } from '@/features/auth';

export const Route = createFileRoute('/_auth-required')({
  component: AuthRequiredLayout,
});

function AuthRequiredLayout() {
  const { token } = useToken();
  const { isAllAgreed } = useConsent();
  const router = useRouter();

  const redirect =
    router.state.location.pathname + router.state.location.searchStr;

  if (!token) {
    return <Navigate to="/auth/login" search={{ redirect }} replace />;
  }

  if (!isAllAgreed()) {
    return <Navigate to="/auth/consent" search={{ redirect }} replace />;
  }

  return <Outlet />;
}
