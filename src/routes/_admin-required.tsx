import {
  createFileRoute,
  Navigate,
  Outlet,
  useRouter,
} from '@tanstack/react-router';

import { useToken } from '@/common/viewmodels';

export const Route = createFileRoute('/_admin-required')({
  component: AdminRequiredLayout,
});

function AdminRequiredLayout() {
  const { token } = useToken();
  const router = useRouter();

  const redirect =
    router.state.location.pathname + router.state.location.searchStr;

  if (!token) {
    return <Navigate to="/admin/login" search={{ redirect }} replace />;
  }

  return <Outlet />;
}

