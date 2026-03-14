import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  const { t } = useTranslation('user');

  return $api.useMutation('delete', ApiPaths.ArticleController_deleteArticle, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.ArticleController_findArticles],
      });
    },
    onError: (error) => {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 403) {
        toast.error(t('error.forbidden', { ns: 'common' }));
      } else if (error?.statusCode === 404) {
        toast.error(t('error.notFound', { ns: 'common' }));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
}
