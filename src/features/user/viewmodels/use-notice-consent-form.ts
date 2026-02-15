import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import z from 'zod';

const noticeConsentSchema = z
  .record(z.string(), z.boolean())
  .refine((record) => Object.values(record).every(Boolean));

export function useNoticeConsentForm(items: string[]) {
  const { control, register, formState } = useForm({
    resolver: zodResolver(noticeConsentSchema),
    defaultValues: Object.fromEntries(items.map((_, i) => [String(i), false])),
    mode: 'onChange',
  });

  const values = useWatch({ control }) ?? {};

  const valuesByIndex = items.map((_, i) => values[String(i)] === true);
  const isValid = formState.isValid;

  return {
    register,
    control,
    isValid,
    valuesByIndex,
  };
}
