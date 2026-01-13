import type { Language } from '@/common/lib';

export function formatDate(date: Date, language: Language) {
  const locale = language === 'ko' ? 'ko-KR' : 'en-US';

  return date.toLocaleString(locale, {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
