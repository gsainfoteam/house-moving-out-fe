import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/schedules/$uuid')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/schedules/$uuid"!</div>;
}
