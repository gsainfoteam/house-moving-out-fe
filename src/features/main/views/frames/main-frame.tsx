import { useSearch } from '@tanstack/react-router';

import { Steps } from '../components';

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

const STEP_ITEMS = [
  {
    title: '검사 신청',
    description: '하단의 버튼을 통해 퇴사 검사를 신청해주세요.',
  },
  {
    title: '검사 대기',
    description: undefined,
  },
  {
    title: '검사 중',
    description: undefined,
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

export function MainFrame() {
  const { step, status } = useSearch({ from: '/_auth-required/' });

  const renderStep4Card = () => {
    switch (status) {
      case 'failed':
        return (
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              <div className="mx-auto w-64">
                <Failed3d className="h-auto w-full" />
              </div>
              <div className="flex flex-col gap-3 text-center">
                <div className="text-h1 text-status-fail font-semibold">
                  재검사가 필요합니다.
                </div>
                <div className="text-sub text-text-gray">
                  아래 사유를 확인하고 다시 신청해주세요.
                </div>
                <div className="border-status-fail/80 rounded-xl border px-4 py-3 text-left">
                  <div className="text-sub text-status-fail mb-2 font-semibold">
                    불통과 사유 확인하기
                  </div>
                  <ul className="text-sub text-text-black flex list-disc flex-col gap-1 pl-4">
                    {FAILED_REASONS.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <Button variant="failed" className="w-full">
              재검사 신청하기
            </Button>
          </div>
        );
      case 'not-period':
        return (
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              <div className="mx-auto w-64">
                <NotPeriod3d className="h-auto w-full" />
              </div>
              <div className="flex flex-col gap-3 text-center">
                <div className="text-h1 text-text-black font-semibold">
                  지금은 퇴사 검사 기간이 아닙니다.
                </div>
                <div className="text-sub text-text-gray">
                  다음 검사 신청은 00월 00일부터 시작됩니다.
                </div>
              </div>
            </div>
            <Button variant="change" className="w-full">
              퇴사 검사 기준 미리보기
            </Button>
          </div>
        );
      case 'passed':
      default:
        return (
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              <div className="mx-auto w-64">
                <Passed3d className="h-auto w-full" />
              </div>
              <div className="flex flex-col gap-3 text-center">
                <div className="text-h1 text-text-black font-semibold">
                  퇴사 검사가 통과되었습니다.
                </div>
                <div className="text-sub text-text-black">
                  모든 절차가 완료되었습니다. 협조해주셔서 감사합니다.
                </div>
              </div>
            </div>
            <Button variant="default" className="w-full">
              홈으로
            </Button>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        status === 'passed' || status === 'not-period'
          ? 'bg-bg-green'
          : 'bg-bg-surface',
        'min-h-screen px-4 py-6',
      )}
    >
      <div className="mx-auto flex h-screen w-full max-w-100 flex-col gap-6">
        <div className="relative">
          <div className="flex flex-col gap-1">
            <h1 className="text-h1 text-text-black font-bold">
              {MOCK_USER.name}님의 퇴사 검사 현황
            </h1>
            <div className="text-sub text-text-gray">
              학번: {MOCK_USER.studentId} | 호실: {MOCK_USER.room}
            </div>
          </div>
          <ShortLogo className="absolute top-0 right-0 h-10 w-auto" />
        </div>
        <div className="bg-bg-white flex flex-1 flex-col gap-6 rounded-3xl p-6 shadow-lg">
          {step === 3 ? (
            renderStep4Card()
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
