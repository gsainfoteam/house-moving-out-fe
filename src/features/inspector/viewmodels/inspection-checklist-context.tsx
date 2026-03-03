import { useMemo, type ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
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

export const InspectionChecklistProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation('inspector');

  const sections = t('checklist.sections', {
    returnObjects: true,
  }) as Record<string, ChecklistSection>;

  const schema = useMemo(() => createInspectionChecklistSchema(sections), [sections]);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: Object.fromEntries(
      Object.entries(sections).map(([sectionKey, section]) => [
        sectionKey,
        Object.fromEntries(Object.keys(section.items ?? {}).map((itemKey) => [itemKey, false])),
      ]),
    ),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};
