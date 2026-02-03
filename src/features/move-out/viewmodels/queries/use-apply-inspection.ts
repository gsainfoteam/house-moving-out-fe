import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useApplyInspection = () => {
  const { t } = useTranslation('move-out');
  const queryClient = useQueryClient();

  return $api.useMutation('post', ApiPaths.MoveOutController_applyInspection, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findActiveMoveOutScheduleWithSlots],
      });
    },
    onError: (error) => {
      if (error?.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error?.statusCode == 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode == 403) {
        toast.error(t('application.error.notStartedOrEnded'));
      } else if (error?.statusCode == 404) {
        // 퇴사 검사 신청 대상이 아닌 경우 -> view에서 처리
      } else if (error?.statusCode === 409) {
        toast.error(t('application.error.alreadyExistsOrFull'));
        // 검사 신청이 이미 존재하거나 슬롯이 가득찬 경우 -> 다이얼로그
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
