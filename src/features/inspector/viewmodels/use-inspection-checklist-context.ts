import { useCallback, useMemo } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type ChecklistSection = {
  title: string;
  items?: Record<string, string>;
};

export const useInspectionChecklistContext = () => {
  const form = useFormContext();
  const { t } = useTranslation('inspector');

  const sections = t('checklist.sections', {
    returnObjects: true,
  }) as Record<string, ChecklistSection>;

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
