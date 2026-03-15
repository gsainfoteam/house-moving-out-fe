import { createFileRoute } from '@tanstack/react-router';

import { ArticleDetailFrame } from '@/features/user';

export const Route = createFileRoute('/_auth-required/_user/articles/$uuid')({
  component: ArticleDetailFrame,
});
