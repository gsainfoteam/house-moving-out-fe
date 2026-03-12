import { createFileRoute } from '@tanstack/react-router';

import { ConverterFrame } from '@/features/converter';

export const Route = createFileRoute('/converter')({
  component: ConverterFrame,
});
