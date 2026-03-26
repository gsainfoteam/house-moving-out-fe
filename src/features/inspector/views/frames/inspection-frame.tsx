import { useNavigate, useParams } from '@tanstack/react-router';

import { NoShowStatus, useInspectionChecklistContext, useRecordNoShow } from '../../viewmodels';
import { InspectionScreen } from '../screens';

export function InspectionFrame() {
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/' });
  const {
    form,
    getSectionProgress,
    checkSection,
    isAllChecked,
    isNoneChecked,
    target,
    isLoading,
    roomType,
  } = useInspectionChecklistContext();
  const { recordNoShow } = useRecordNoShow();
  const navigate = useNavigate();

  return (
    <InspectionScreen
      isLoading={isLoading}
      target={target}
      roomType={roomType}
      register={form.register}
      getSectionProgress={getSectionProgress}
      checkSection={checkSection}
      isAllChecked={isAllChecked}
      isNoneChecked={isNoneChecked}
      onNoShowRequest={async () => {
        const result = await recordNoShow(uuid, NoShowStatus.PENDING_NO_SHOW);
        return result?.targetPhoneNumber;
      }}
      onNoShowConfirm={async () => {
        await recordNoShow(uuid, NoShowStatus.NO_SHOW);
        navigate({ to: '/inspector' });
      }}
      uuid={uuid}
    />
  );
}
