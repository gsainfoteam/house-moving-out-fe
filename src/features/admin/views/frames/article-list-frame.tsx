import { useMemo, useState } from 'react';

import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import {
  ArticleType,
  useChangeArticleVisibility,
  useDeleteArticle,
  useFindArticles,
} from '../../viewmodels';

export function ArticleListFrame() {
  const { t } = useTranslation('admin');
  const [type, setType] = useState<ArticleType>(ArticleType.NOTICE);
  const { mutate: changeVisibility, isPending: isChangingVisibility } = useChangeArticleVisibility();
  const { mutate: deleteArticle, isPending: isDeletingArticle } = useDeleteArticle();
  const { data: notices, isLoading: isNoticesLoading } = useFindArticles({
    type: ArticleType.NOTICE,
    offset: 0,
    limit: 100,
  });
  const { data: faq, isLoading: isFaqLoading } = useFindArticles({
    type: ArticleType.FAQ,
    offset: 0,
    limit: 100,
  });

  const rows = useMemo(() => {
    const source = type === ArticleType.NOTICE ? notices : faq;
    return [...source].sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf());
  }, [faq, notices, type]);

  const isLoading = isNoticesLoading || isFaqLoading;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-title3 text-text-primary font-semibold">{t('article.list.title')}</h1>
        <Button asChild>
          <Link to="/admin/articles/new">{t('article.list.create')}</Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={type === ArticleType.NOTICE ? 'default' : 'outline'}
          onClick={() => setType(ArticleType.NOTICE)}
        >
          {t('article.list.notice')}
        </Button>
        <Button
          variant={type === ArticleType.FAQ ? 'default' : 'outline'}
          onClick={() => setType(ArticleType.FAQ)}
        >
          {t('article.list.faq')}
        </Button>
      </div>

      {isLoading ? (
        <Loading containerClassName="h-full" />
      ) : rows.length === 0 ? (
        <div className="text-body text-text-secondary">{t('article.list.empty')}</div>
      ) : (
        <div className="bg-bg border-border overflow-hidden rounded-xl border">
          <table className="[&_td,&_th]:border-border w-full text-center [&_td,&_th]:border [&_td,&_th]:px-3 [&_td,&_th]:py-2">
            <thead>
              <tr className="bg-bg-surface/80 [&_th]:text-text-primary [&_th]:font-medium">
                <th>{t('article.list.columns.title')}</th>
                <th>{t('article.list.columns.updatedAt')}</th>
                <th>{t('article.list.columns.visibility')}</th>
                <th>{t('article.list.columns.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((article) => (
                <tr key={article.uuid}>
                  <td className="max-w-[380px] truncate text-left">{article.titleKo}</td>
                  <td>{dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
                  <td>
                    {article.isVisible ? t('article.list.visible') : t('article.list.hidden')}
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <Button asChild variant="outline">
                        <Link to="/admin/articles/$uuid/edit" params={{ uuid: article.uuid }}>
                          {t('article.list.actions.edit')}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        disabled={isChangingVisibility || isDeletingArticle}
                        onClick={() =>
                          changeVisibility({
                            params: { path: { uuid: article.uuid } },
                            body: { isVisible: !article.isVisible },
                          })
                        }
                      >
                        {article.isVisible
                          ? t('article.list.actions.hide')
                          : t('article.list.actions.show')}
                      </Button>
                      <Button
                        variant="failed"
                        disabled={isChangingVisibility || isDeletingArticle}
                        onClick={() => {
                          if (!window.confirm(t('article.list.actions.deleteConfirm'))) return;
                          deleteArticle({
                            params: { path: { uuid: article.uuid } },
                          });
                        }}
                      >
                        {t('article.list.actions.delete')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
