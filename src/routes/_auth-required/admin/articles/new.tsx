import { createFileRoute } from '@tanstack/react-router';

import { CreateArticleFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/articles/new')({
  component: CreateArticleFrame,
});
