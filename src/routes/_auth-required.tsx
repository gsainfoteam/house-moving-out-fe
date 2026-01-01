import {
  createFileRoute,
  Navigate,
  Outlet,
  useRouter,
} from '@tanstack/react-router';

import { useToken } from '@/common/viewmodels';

export const Route = createFileRoute('/_auth-required')({
  component: AuthRequiredLayout,
});

function AuthRequiredLayout() {
  const { token } = useToken();
  const router = useRouter();

  const redirect = router.history.location.href;

  if (token == null) {
    return <Navigate to="/auth/login" search={{ redirect }} replace />;
  }
  return <Outlet />;
}
