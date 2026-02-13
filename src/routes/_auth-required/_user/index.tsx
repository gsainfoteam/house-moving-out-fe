import { createFileRoute } from '@tanstack/react-router';

import { MainFrame } from '@/features/user';

export const Route = createFileRoute('/_auth-required/_user/')({
  component: UserEntry,
});

function UserEntry() {
  return <MainFrame />;
}
