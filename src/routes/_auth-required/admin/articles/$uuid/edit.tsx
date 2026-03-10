import { createFileRoute } from '@tanstack/react-router';

import { EditArticleFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/articles/$uuid/edit')({
  component: EditArticleFrame,
});
