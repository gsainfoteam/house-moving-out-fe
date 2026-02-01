import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import i18n, { type Language } from './i18n';

dayjs.locale(ko);
dayjs.extend(localizedFormat);

const loaderMap: Record<Language, () => Promise<ILocale>> = {
  ko: () => import('dayjs/locale/ko'),
  en: () => import('dayjs/locale/en'),
};

i18n.on('languageChanged', async (lng: Language) => {
  try {
    const loader = loaderMap[lng];
    if (!loader) throw new Error(`Unsupported language: ${lng}`);
    const locale = await loader();
    dayjs.locale(locale);
  } catch {
    dayjs.locale(ko);
  }
});
