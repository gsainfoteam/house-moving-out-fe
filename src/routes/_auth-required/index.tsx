import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { MainFrame } from '@/features/main';

export const Route = createFileRoute('/_auth-required/')({
  validateSearch: z
    .object({
      step: z.literal([0, 1, 2, 3]).default(0),
      status: z.enum(['passed', 'failed', 'not-period']).optional(),
    })
    .refine((data) => (data.step === 3 ? data.status !== undefined : true), {
      error: 'Step 3 requires a status',
      path: ['status'],
    }),
  component: MainFrame,
});
