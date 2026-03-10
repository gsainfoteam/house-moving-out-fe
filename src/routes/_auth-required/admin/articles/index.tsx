import { createFileRoute } from '@tanstack/react-router';

import { ArticleListFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/articles/')({
  component: ArticleListFrame,
});
