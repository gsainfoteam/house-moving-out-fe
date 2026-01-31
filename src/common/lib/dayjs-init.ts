import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import i18n from './i18n';

dayjs.locale(ko);
dayjs.extend(localizedFormat);

i18n.on('languageChanged', async (lng) => {
  try {
    const locale = await import(`dayjs/locale/${lng}`);
    dayjs.locale(locale);
  } catch {
    dayjs.locale(ko);
  }
});
