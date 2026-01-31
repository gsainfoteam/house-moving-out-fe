import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale(ko);
dayjs.extend(localizedFormat);
