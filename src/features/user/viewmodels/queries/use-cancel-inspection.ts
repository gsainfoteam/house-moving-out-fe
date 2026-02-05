import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useApplicationStore } from '../stores';
import { useFindMyInspection } from './use-find-my-inspection';

// TEST: onCancelled 시 취소되었습니다 다이얼로그
// TEST: onNoShow 시 노쇼 다이얼로그
export const useCancelInspection = ({
  onCancelled,
  onNoShow,
}: {
  onCancelled?: () => void;
  onNoShow?: () => void;
}) => {
  const { setApplicationUuid } = useApplicationStore();
  const { inspectionStartTime } = useFindMyInspection(true);
  const { t } = useTranslation('user');

  return $api.useMutation('delete', ApiPaths.MoveOutController_cancelInspection, {
    onSuccess: () => {
      setApplicationUuid(null);
      if (inspectionStartTime != null && inspectionStartTime.diff(dayjs(), 'hour', true) <= 1) {
        onNoShow?.();
      } else {
        onCancelled?.();
      }
    },
    onError: (error) => {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 403) {
        toast.error(t('application.error.ownerCanCancel'));
      } else if (error?.statusCode === 404) {
        toast.error(t('application.error.invalidUuid'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
