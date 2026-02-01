import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import i18n from './i18n';

dayjs.locale(ko);
dayjs.extend(localizedFormat);

i18n.on('languageChanged', async (lng) => {
  try {
    const loader = {
      ko: () => import('dayjs/locale/ko'),
      en: () => import('dayjs/locale/en'),
    }[lng];
    if (!loader) throw new Error(`Unsupported language: ${lng}`);
    const locale = await loader();
    dayjs.locale(locale);
  } catch {
    dayjs.locale(ko);
  }
});
