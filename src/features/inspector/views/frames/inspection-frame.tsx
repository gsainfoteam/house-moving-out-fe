import { useParams } from '@tanstack/react-router';

import { useInspectionChecklistContext } from '../../viewmodels';
import { InspectionScreen } from '../screens';

export function InspectionFrame() {
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/' });
  const { form, getSectionProgress, isAllChecked, isNoneChecked, target, isLoading, roomType } =
    useInspectionChecklistContext();

  return (
    <InspectionScreen
      isLoading={isLoading}
      target={target}
      roomType={roomType}
      register={form.register}
      getSectionProgress={getSectionProgress}
      isAllChecked={isAllChecked}
      isNoneChecked={isNoneChecked}
      onNoShowRequest={async () => {
        // TODO: BE 호출 → 1차 노쇼 기록 + 전화번호 반환
        return '';
      }}
      onNoShowConfirm={async () => {
        // TODO: BE 호출 → 최종 노쇼 확정
      }}
      uuid={uuid}
    />
  );
}
