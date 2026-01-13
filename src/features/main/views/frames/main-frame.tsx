import { useSearch } from '@tanstack/react-router';

import { Accordion, ResultCard, Steps } from '../components';

import Failed3d from '@/assets/3d/failed.svg?react';
import NotPeriod3d from '@/assets/3d/not_period.svg?react';
import Passed3d from '@/assets/3d/passed.svg?react';
import ShortLogo from '@/assets/short-logo.svg?react';
import { Button } from '@/common/components/ui/button';
import { cn } from '@/common/utils';

const MOCK_USER = {
  name: '00',
  studentId: '20250000',
  room: 'T012',
};

// TODO: 얘도 추후 구조 수정 필요
const STEP_ITEMS = [
  {
    title: '검사 신청',
    description: '하단의 버튼을 통해\n퇴사 검사를 신청해주세요.',
  },
  {
    title: '검사 대기',
    description: '퇴사 검사가 01/12(월) 00시에\n예정되어 있습니다.',
  },
  {
    title: '검사 중',
    description:
      '퇴사 검사 진행 중입니다.\n잠시 뒤에 검사 결과를 확인해주세요.',
  },
  {
    title: '검사 결과',
    description: undefined,
  },
];

const BUTTON_CONFIG = [
  { text: '퇴사 검사 신청하기', variant: 'default' as const, disabled: false },
  { text: '검사 일정 변경하기', variant: 'change' as const, disabled: false },
  { text: '검사 결과 대기 중', variant: 'disabled' as const, disabled: true },
];

const FAILED_REASONS = ['책상 서랍 정리 미흡', '화장실 청소 미흡'];

function FailedStatusCard() {
  return (
    <ResultCard>
      <ResultCard.Main>
        <ResultCard.Header>
          <ResultCard.Media>
            <Failed3d className="h-70" />
          </ResultCard.Media>
          <ResultCard.Text>
            <ResultCard.Title className="text-status-fail">
              재검사가 필요합니다.
            </ResultCard.Title>
            <ResultCard.Description>
              아래 사유를 확인하고 다시 신청해주세요.
            </ResultCard.Description>
          </ResultCard.Text>
        </ResultCard.Header>
        <ResultCard.Details>
          <Accordion title="불통과 사유 확인하기">
            <ul className="flex flex-col gap-2">
              {FAILED_REASONS.map((reason) => (
                <li
                  key={reason}
                  className="text-box2 text-text-black flex items-center gap-2"
                >
                  <span className="bg-status-fail size-1.5 shrink-0 rounded-full" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        </ResultCard.Details>
      </ResultCard.Main>
      <ResultCard.Button variant="failed" className="w-full">
        재검사 신청하기
      </ResultCard.Button>
    </ResultCard>
  );
}

function NotPeriodStatusCard() {
  return (
    <ResultCard>
      <ResultCard.Main>
        <ResultCard.Header>
          <ResultCard.Media>
            <NotPeriod3d className="h-auto w-full" />
          </ResultCard.Media>
          <ResultCard.Text>
            <ResultCard.Title className="text-text-black">
              지금은 퇴사 검사 기간이 아닙니다.
            </ResultCard.Title>
            <ResultCard.Description>
              다음 검사 신청은 00월 00일부터 시작됩니다.
            </ResultCard.Description>
          </ResultCard.Text>
        </ResultCard.Header>
      </ResultCard.Main>
      <ResultCard.Button variant="change" className="w-full">
        퇴사 검사 기준 미리보기
      </ResultCard.Button>
    </ResultCard>
  );
}

function PassedStatusCard() {
  return (
    <ResultCard>
      <ResultCard.Main>
        <ResultCard.Header>
          <ResultCard.Media>
            <Passed3d className="h-auto w-full" />
          </ResultCard.Media>
          <ResultCard.Text>
            <ResultCard.Title className="text-primary-main">
              퇴사 검사가 통과되었습니다.
            </ResultCard.Title>
            <ResultCard.Description>
              모든 절차가 완료되었습니다. 협조해주셔서 감사합니다.
            </ResultCard.Description>
          </ResultCard.Text>
        </ResultCard.Header>
      </ResultCard.Main>
      <ResultCard.Button variant="default" className="w-full">
        홈으로
      </ResultCard.Button>
    </ResultCard>
  );
}

export function MainFrame() {
  const { step, status } = useSearch({ from: '/_auth-required/' });

  return (
    <div
      className={cn(
        status === 'passed' || status === 'not-period'
          ? 'bg-bg-green'
          : 'bg-bg-surface',
        'h-dvh px-5 py-6',
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-100 flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-h1 text-text-black font-bold">
              {MOCK_USER.name}님의 퇴사 검사 현황
            </h1>
            <h2 className="text-sub text-text-gray">
              학번: {MOCK_USER.studentId} | 호실: {MOCK_USER.room}
            </h2>
          </div>
          <ShortLogo />
        </div>
        <div className="bg-bg-white flex flex-1 flex-col gap-6 rounded-3xl p-6 shadow-lg">
          {step === 3 ? (
            status === 'failed' ? (
              <FailedStatusCard />
            ) : status === 'not-period' ? (
              <NotPeriodStatusCard />
            ) : (
              <PassedStatusCard />
            )
          ) : (
            <div className="flex h-full flex-col justify-between">
              <Steps steps={STEP_ITEMS} activeStepIndex={step} />
              <Button
                className="w-full"
                variant={BUTTON_CONFIG[step].variant}
                disabled={BUTTON_CONFIG[step].disabled}
              >
                {BUTTON_CONFIG[step].text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
