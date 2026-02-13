import { useCallback, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';

type ChecklistSection = {
  title: string;
  items?: Record<string, string>;
};

const createInspectionChecklistSchema = (sections: Record<string, ChecklistSection>) =>
  z.object(
    Object.fromEntries(
      Object.entries(sections).map(([sectionKey, section]) => [
        sectionKey,
        z.object(
          Object.fromEntries(
            Object.keys(section.items ?? {}).map((itemKey) => [itemKey, z.boolean()]),
          ),
        ),
      ]),
    ),
  );

export const useInspectionChecklistForm = () => {
  const { t } = useTranslation('inspector');

  const sections = t('checklist.sections', {
    returnObjects: true,
  }) as Record<string, ChecklistSection>;

  const schema = useMemo(() => createInspectionChecklistSchema(sections), [sections]);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const values = useWatch({
    control: form.control,
  });

  const getSectionProgress = useCallback(
    (sectionKey: string) => {
      const sectionValues = values?.[sectionKey] ?? {};
      const totalCount = Object.keys(sectionValues).length;
      const completedCount = Object.values(sectionValues).filter(Boolean).length;
      const isCompleted = totalCount > 0 && completedCount === totalCount;

      return {
        totalCount,
        completedCount,
        isCompleted,
      };
    },
    [values],
  );

  const isAllChecked = useMemo(() => {
    const sectionKeys = Object.keys(sections);
    if (sectionKeys.length === 0) return false;

    return sectionKeys.every((sectionKey) => getSectionProgress(sectionKey).isCompleted);
  }, [sections, getSectionProgress]);

  const getItemSlug = useCallback((sectionKey: string, itemKey: string) => {
    return `${sectionKey}-${itemKey}`;
  }, []);

  const getItems = useCallback(() => {
    const items: { slug: string; label: string; isChecked: boolean }[] = [];

    Object.entries(sections).forEach(([sectionKey, section]) => {
      const sectionValues = values?.[sectionKey] ?? {};
      Object.entries(section.items ?? {}).forEach(([itemKey, label]) => {
        const slug = getItemSlug(sectionKey, itemKey);
        const isChecked = sectionValues[itemKey] ?? false;
        items.push({ slug, label, isChecked });
      });
    });

    return items;
  }, [getItemSlug, sections, values]);

  return {
    form,
    sections,
    getSectionProgress,
    isAllChecked,
    getItems,
    getItemSlug,
  };
};
