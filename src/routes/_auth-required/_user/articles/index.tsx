import { createFileRoute } from '@tanstack/react-router';

import { ArticleListFrame } from '@/features/user';

export const Route = createFileRoute('/_auth-required/_user/articles/')({
  component: ArticleListFrame,
});
