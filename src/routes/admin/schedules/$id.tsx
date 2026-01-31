import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/schedules/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/schedules/$id"!</div>;
}
