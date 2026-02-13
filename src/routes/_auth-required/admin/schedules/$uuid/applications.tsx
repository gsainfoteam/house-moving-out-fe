import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/applications')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/schedules/$uuid/applications"!</div>;
}
