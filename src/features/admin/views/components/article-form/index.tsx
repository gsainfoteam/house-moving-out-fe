import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button, Input } from '@/common/components';
import { cn } from '@/common/utils';
import {
  useArticleForm,
  type ArticleInitialValues,
  type ArticleFormValues,
} from '@/features/admin/viewmodels';

import { ArticleType } from '../../../viewmodels';

export function ArticleForm({
  initialValues,
  submitLabel,
  onSubmit,
  isPending = false,
}: {
  initialValues?: ArticleInitialValues;
  submitLabel: string;
  onSubmit: (values: ArticleFormValues) => Promise<void>;
  isPending?: boolean;
}) {
  const { t } = useTranslation('admin');
  const { handleSubmit, setValue, type, register, isVisible, errors, isSubmitting } =
    useArticleForm({ initialValues });

  return (
    <form
      className="flex flex-1 flex-col gap-4"
      onSubmit={handleSubmit(onSubmit, () => {
        toast.error(t('article.form.error.formError'));
      })}
    >
      <div>
        <div className="text-body text-text-primary mb-2">{t('article.form.type.label')}</div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={type === ArticleType.NOTICE ? 'default' : 'outline'}
            onClick={() => setValue('type', ArticleType.NOTICE)}
          >
            {t('article.list.notice')}
          </Button>
          <Button
            type="button"
            variant={type === ArticleType.FAQ ? 'default' : 'outline'}
            onClick={() => setValue('type', ArticleType.FAQ)}
          >
            {t('article.list.faq')}
          </Button>
        </div>
      </div>

      <div>
        <div className="text-body text-text-primary mb-2">{t('article.form.visibility.label')}</div>
        <Button
          type="button"
          variant={isVisible ? 'default' : 'outline'}
          onClick={() => setValue('isVisible', !isVisible)}
        >
          {isVisible ? t('article.list.visible') : t('article.list.hidden')}
        </Button>
      </div>

      <div>
        <label className="text-body text-text-primary">{t('article.form.titleKo.label')}</label>
        <Input
          error={errors.titleKo?.message && t('article.form.error.required')}
          placeholder={t('article.form.titleKo.placeholder')}
          {...register('titleKo')}
        />
      </div>

      <div>
        <label className="text-body text-text-primary">{t('article.form.titleEn.label')}</label>
        <Input
          error={errors.titleEn?.message && t('article.form.error.required')}
          placeholder={t('article.form.titleEn.placeholder')}
          {...register('titleEn')}
        />
      </div>

      <div>
        <label className="text-body text-text-primary">{t('article.form.contentKo.label')}</label>
        <textarea
          className={cn(
            'bg-bg w-full rounded-lg border-[1.5px] px-4 py-3',
            'text-body-lg text-text-primary placeholder:text-text-secondary',
            'focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
            errors.contentKo ? 'border-status-fail' : 'border-icon',
          )}
          rows={8}
          placeholder={t('article.form.contentKo.placeholder')}
          {...register('contentKo')}
        />
        {errors.contentKo && (
          <span className="text-status-fail mt-1 text-sm">{t('article.form.error.required')}</span>
        )}
      </div>

      <div>
        <label className="text-body text-text-primary">{t('article.form.contentEn.label')}</label>
        <textarea
          className={cn(
            'bg-bg w-full rounded-lg border-[1.5px] px-4 py-3',
            'text-body-lg text-text-primary placeholder:text-text-secondary',
            'focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
            errors.contentEn ? 'border-status-fail' : 'border-icon',
          )}
          rows={8}
          placeholder={t('article.form.contentEn.placeholder')}
          {...register('contentEn')}
        />
        {errors.contentEn && (
          <span className="text-status-fail mt-1 text-sm">{t('article.form.error.required')}</span>
        )}
      </div>

      <Button className="mt-auto" disabled={isSubmitting || isPending}>
        {submitLabel}
      </Button>
    </form>
  );
}
