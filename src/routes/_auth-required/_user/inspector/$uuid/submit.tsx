import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-required/_user/inspector/$uuid/submit')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth-required/_user/inspector/$uuid/submit"!</div>;
}
