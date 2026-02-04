import { createFileRoute } from '@tanstack/react-router';

import { ApplicationFrame } from '@/features/user';

export const Route = createFileRoute('/_auth-required/application')({
  component: ApplicationFrame,
});
