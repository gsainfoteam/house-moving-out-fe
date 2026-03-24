import { createFileRoute } from '@tanstack/react-router';

import { LayoutCard } from '@/common/components';

export const Route = createFileRoute('/_auth-required/_user/mypage')({
  component: () => <LayoutCard.Root />,
});
