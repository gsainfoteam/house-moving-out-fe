import { Link, useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/common/components';

import { ArticleLanguage, type CreateArticleRequest } from '../../viewmodels';
import { useCreateArticle } from '../../viewmodels';
import { ArticleForm } from '../components';

export function CreateArticleFrame() {
  const { t } = useTranslation('admin');
  const { mutateAsync: createArticle, isPending } = useCreateArticle();
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    type: CreateArticleRequest['type'];
    isVisible: boolean;
    titleKo: string;
    titleEn: string;
    contentKo: string;
    contentEn: string;
  }) => {
    const articles: CreateArticleRequest['articles'] = [
      {
        language: ArticleLanguage.KO,
        title: values.titleKo,
        content: values.contentKo,
      },
      {
        language: ArticleLanguage.EN,
        title: values.titleEn,
        content: values.contentEn,
      },
    ];

    await createArticle({
      body: {
        type: values.type,
        isVisible: values.isVisible,
        articles,
      },
    });

    toast.success(t('article.create.success'));
    await navigate({ to: '/admin/articles' });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-title3 text-text-black font-semibold">{t('article.create.title')}</h1>
        <Button asChild variant="outline">
          <Link to="/admin/articles">{t('article.create.back')}</Link>
        </Button>
      </div>
      <ArticleForm
        submitLabel={t('article.create.submit')}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </main>
  );
}
