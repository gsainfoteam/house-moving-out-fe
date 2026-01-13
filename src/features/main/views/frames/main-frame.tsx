import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDate } from '../../utils';
import { Accordion, StatusCard, Steps, SwitchCase } from '../components';

import ShortLogo from '@/assets/short-logo.svg?react';
import { getLocale } from '@/common/lib';
import { cn } from '@/common/utils';

// FIXME: 모의 유저 정보 제거 후 삭제
const MOCK_USER = {
  name: '00',
  studentId: '20250000',
  room: 'T012',
};

const MOCK_INSPECTION_AT = new Date('2025-01-12T00:00:00');
const MOCK_NEXT_PERIOD_START_AT = new Date('2025-01-01T00:00:00');

function Step0Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation();

  return (
    <StatusCard>
      <StatusCard.Content className="justify-between">
        <Steps steps={steps} activeStepIndex={0} className="w-full" />
      </StatusCard.Content>
      <StatusCard.Footer>
        <StatusCard.Button variant="default" className="w-full">
          {t('main.steps.step0.button')}
        </StatusCard.Button>
      </StatusCard.Footer>
    </StatusCard>
  );
}

function Step1Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation();

  return (
    <StatusCard>
      <StatusCard.Content className="justify-between">
        <Steps steps={steps} activeStepIndex={1} className="w-full" />
      </StatusCard.Content>
      <StatusCard.Footer>
        <StatusCard.Button variant="change" className="w-full">
          {t('main.steps.step1.button')}
        </StatusCard.Button>
      </StatusCard.Footer>
    </StatusCard>
  );
}

function Step2Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation();

  return (
    <StatusCard>
      <StatusCard.Content className="justify-between">
        <Steps steps={steps} activeStepIndex={2} className="w-full" />
      </StatusCard.Content>
      <StatusCard.Footer>
        <StatusCard.Button variant="disabled" className="w-full" disabled>
          {t('main.steps.step2.button')}
        </StatusCard.Button>
      </StatusCard.Footer>
    </StatusCard>
  );
}

function Step3FailedCard() {
  const { t } = useTranslation();
  const failedReasons = useMemo(
    () => [
      t('main.result.failed.reasons.deskDrawer'),
      t('main.result.failed.reasons.bathroom'),
    ],
    [t],
  );

  return (
    <StatusCard>
      <StatusCard.Content>
        <StatusCard.Header>
          <StatusCard.Media>
            <img src="./3d/failed.png" alt="failed" className="h-60" />
          </StatusCard.Media>
          <StatusCard.Text>
            <StatusCard.Title className="text-status-fail">
              {t('main.result.failed.title')}
            </StatusCard.Title>
            <StatusCard.Description>
              {t('main.result.failed.description')}
            </StatusCard.Description>
          </StatusCard.Text>
        </StatusCard.Header>
        <StatusCard.Details>
          <Accordion title={t('main.result.failed.accordionTitle')}>
            <ul className="flex flex-col gap-2">
              {failedReasons.map((reason) => (
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
        </StatusCard.Details>
      </StatusCard.Content>
      <StatusCard.Footer>
        <StatusCard.Button variant="failed" className="w-full">
          {t('main.result.failed.button')}
        </StatusCard.Button>
      </StatusCard.Footer>
    </StatusCard>
  );
}

function Step3NotPeriodCard() {
  const { t } = useTranslation();
  const locale = getLocale();

  const nextApplicationStartDateText = useMemo(
    () => formatDate(MOCK_NEXT_PERIOD_START_AT, locale),
    [locale],
  );

  return (
    <StatusCard>
      <StatusCard.Content>
        <StatusCard.Header>
          <StatusCard.Media>
            <img src="./3d/not-period.png" alt="not-period" className="h-60" />
          </StatusCard.Media>
          <StatusCard.Text>
            <StatusCard.Title className="text-text-black">
              {t('main.result.notPeriod.title')}
            </StatusCard.Title>
            <StatusCard.Description>
              {t('main.result.notPeriod.description', {
                startDate: nextApplicationStartDateText,
              })}
            </StatusCard.Description>
          </StatusCard.Text>
        </StatusCard.Header>
      </StatusCard.Content>
      <StatusCard.Footer>
        <StatusCard.Button variant="change" className="w-full">
          {t('main.result.notPeriod.button')}
        </StatusCard.Button>
      </StatusCard.Footer>
    </StatusCard>
  );
}

function Step3PassedCard() {
  const { t } = useTranslation();

  return (
    <StatusCard>
      <StatusCard.Content>
        <StatusCard.Header>
          <StatusCard.Media>
            <img src="./3d/passed.png" alt="passed" className="h-60" />
          </StatusCard.Media>
          <StatusCard.Text>
            <StatusCard.Title className="text-primary-main">
              {t('main.result.passed.title')}
            </StatusCard.Title>
            <StatusCard.Description>
              {t('main.result.passed.description')}
            </StatusCard.Description>
          </StatusCard.Text>
        </StatusCard.Header>
      </StatusCard.Content>
      <StatusCard.Footer>
        <StatusCard.Button variant="default" className="w-full">
          {t('main.result.passed.button')}
        </StatusCard.Button>
      </StatusCard.Footer>
    </StatusCard>
  );
}

export function MainFrame() {
  const { step, status } = useSearch({ from: '/_auth-required/' });
  const { t } = useTranslation();
  const locale = getLocale();

  const inspectionDateText = useMemo(
    () => formatDate(MOCK_INSPECTION_AT, locale),
    [locale],
  );

  const steps = useMemo(
    () => [
      {
        title: t('main.steps.step0.title'),
        description: t('main.steps.step0.description'),
      },
      {
        title: t('main.steps.step1.title'),
        description: t('main.steps.step1.description', {
          inspectionDate: inspectionDateText,
        }),
      },
      {
        title: t('main.steps.step2.title'),
        description: t('main.steps.step2.description'),
      },
      {
        title: t('main.steps.step3.title'),
        description: undefined,
      },
    ],
    [t, inspectionDateText],
  );

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
              {t('main.header.title', { name: MOCK_USER.name })}
            </h1>
            <h2 className="text-sub text-text-gray">
              {t('main.header.subtitle', {
                studentId: MOCK_USER.studentId,
                room: MOCK_USER.room,
              })}
            </h2>
          </div>
          <ShortLogo />
        </div>

        <SwitchCase
          value={step}
          caseBy={{
            0: <Step0Card steps={steps} />,
            1: <Step1Card steps={steps} />,
            2: <Step2Card steps={steps} />,
            3: (
              <SwitchCase
                value={status!}
                caseBy={{
                  failed: <Step3FailedCard />,
                  'not-period': <Step3NotPeriodCard />,
                  passed: <Step3PassedCard />,
                }}
              />
            ),
          }}
        />
      </div>
    </div>
  );
}
