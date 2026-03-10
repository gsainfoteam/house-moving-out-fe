import { Link, useNavigate, useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button, Loading } from '@/common/components';

import { ArticleLanguage, type CreateArticleRequest } from '../../models';
import { useFindArticle, useUpdateArticle } from '../../viewmodels';
import { ArticleForm } from '../components';

export function EditArticleFrame() {
  const { t } = useTranslation('admin');
  const { uuid } = useParams({ from: '/_auth-required/admin/articles/$uuid/edit' });
  const navigate = useNavigate();
  const { data, isLoading, isNotFound } = useFindArticle(uuid);
  const { mutateAsync: updateArticle, isPending } = useUpdateArticle();

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

    await updateArticle({
      params: { path: { uuid } },
      body: {
        type: values.type,
        isVisible: values.isVisible,
        articles,
      },
    });

    toast.success(t('article.edit.success'));
    await navigate({ to: '/admin/articles' });
  };

  if (isLoading) return <Loading containerClassName="h-full" />;
  if (isNotFound || !data) return <div className="p-4">{t('article.edit.notFound')}</div>;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-title3 text-text-black font-semibold">{t('article.edit.title')}</h1>
        <Button asChild variant="outline">
          <Link to="/admin/articles">{t('article.edit.back')}</Link>
        </Button>
      </div>
      <ArticleForm
        initialValues={data}
        submitLabel={t('article.edit.submit')}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </main>
  );
}
