import { useMemo, type ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { checklist } from '../models';

const createInspectionChecklistSchema = (items: checklist.Item[]) =>
  z.object(Object.fromEntries(items.map((item) => [item, z.boolean()])));

export const InspectionChecklistProvider = ({ children }: { children: ReactNode }) => {
  const keys = useMemo(() => Object.values(checklist.a2).flatMap((item) => item), []);
  const schema = useMemo(() => createInspectionChecklistSchema(keys), [keys]);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: Object.fromEntries(keys.map((item) => [item, false])),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};
