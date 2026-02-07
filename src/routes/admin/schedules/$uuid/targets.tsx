import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/schedules/$uuid/targets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/schedules/$uuid/targets"!</div>
}
