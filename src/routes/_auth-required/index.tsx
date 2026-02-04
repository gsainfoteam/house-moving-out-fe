import { createFileRoute } from '@tanstack/react-router';

import { MainFrame } from '@/features/user';

export const Route = createFileRoute('/_auth-required/')({
  component: MainFrame,
});
