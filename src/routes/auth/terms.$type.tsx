import { createFileRoute } from '@tanstack/react-router';

import { TermsDetailFrame } from '@/features/auth';

export const Route = createFileRoute('/auth/terms/$type')({
  component: TermsDetailFrame,
});
