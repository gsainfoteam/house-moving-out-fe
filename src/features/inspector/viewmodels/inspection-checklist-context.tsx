import { useMemo, type ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { checklist } from '../models';

const createInspectionChecklistSchema = (items: checklist.Item[]) =>
  z.object({
    items: z.object(Object.fromEntries(items.map((item) => [item, z.boolean()]))),
    note: z.string().optional(),
    inspectorSignature: z.url({ message: '검사자 서명이 필요합니다.' }),
    targetSignature: z.url({ message: '퇴사자 서명이 필요합니다.' }),
  });

export const InspectionChecklistProvider = ({ children }: { children: ReactNode }) => {
  const keys = useMemo(() => Object.values(checklist.a2).flatMap((item) => item), []);
  const schema = useMemo(() => createInspectionChecklistSchema(keys), [keys]);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { items: Object.fromEntries(keys.map((item) => [item, false])), note: '' },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};
