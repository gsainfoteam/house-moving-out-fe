import dayjs from 'dayjs';

import { LayoutCard } from '@/common/components';

import { ScheduleStatus } from '../../models';
import { InspectionScheduleCard } from '../components';

const baseTime = dayjs().startOf('day').hour(10);

export function InspectionListFrame() {
  return (
    <LayoutCard.Root>
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title>퇴사검사 일정</LayoutCard.Title>
          <LayoutCard.Description>
            우측의 검사 버튼을 눌러 검사를 시작하세요.
          </LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body className="gap-3">
        {/* TODO: 실제 일정 데이터 연동 */}
        <InspectionScheduleCard
          time={baseTime}
          roomLabel="T012호"
          residentName="홍길동"
          status={ScheduleStatus.DRAFT}
        />
        <InspectionScheduleCard
          time={baseTime.add(30, 'minute')}
          roomLabel="T012호"
          residentName="홍길동"
          status={ScheduleStatus.ACTIVE}
        />
        <InspectionScheduleCard
          time={baseTime.add(1, 'hour')}
          roomLabel="T012호"
          residentName="홍길동"
          status={ScheduleStatus.COMPLETED}
        />
        <InspectionScheduleCard
          time={baseTime.add(2, 'hour').add(30, 'minute')}
          roomLabel="T012호"
          residentName="홍길동"
          status={ScheduleStatus.CANCELED}
        />
      </LayoutCard.Body>
    </LayoutCard.Root>
  );
}
