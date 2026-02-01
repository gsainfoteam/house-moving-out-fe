import { useMemo } from 'react';

import { useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import ModalBang from '@/assets/modal-bang.svg?react';
import { Button, Dialog, LayoutCard, SwitchCase } from '@/common/components';
import { useLocale } from '@/common/lib';
import { cn } from '@/common/utils';
import { useAuth } from '@/features/auth';

import { formatDate } from '../../utils';
import { Accordion, Steps } from '../components';

const MOCK_INSPECTION_AT = new Date('2025-01-12T00:00:00');
const MOCK_NEXT_PERIOD_START_AT = new Date('2025-01-01T00:00:00');

function Step0Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation('main');

  return (
    <LayoutCard.Root>
      <LayoutCard.Content className="justify-between">
        <Steps steps={steps} activeStepIndex={0} className="w-full" />
      </LayoutCard.Content>
      <LayoutCard.Footer>
        <LayoutCard.Button variant="default" className="w-full">
          {t('steps.step0.button')}
        </LayoutCard.Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

function Step1Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation('main');

  return (
    <LayoutCard.Root>
      <LayoutCard.Content className="justify-between">
        <Steps steps={steps} activeStepIndex={1} className="w-full" />
      </LayoutCard.Content>
      <LayoutCard.Footer>
        <LayoutCard.Button variant="outline" className="w-full">
          {t('steps.step1.button')}
        </LayoutCard.Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

function Step2Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation('main');

  return (
    <LayoutCard.Root>
      <LayoutCard.Content className="justify-between">
        <Steps steps={steps} activeStepIndex={2} className="w-full" />
      </LayoutCard.Content>
      <LayoutCard.Footer>
        <LayoutCard.Button variant="disabled" className="w-full" disabled>
          {t('steps.step2.button')}
        </LayoutCard.Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

function Step3FailedCard() {
  const { t } = useTranslation('main');
  const failedReasons = useMemo(
    () => [t('result.failed.reasons.deskDrawer'), t('result.failed.reasons.bathroom')],
    [t],
  );

  return (
    <LayoutCard.Root>
      <LayoutCard.Content>
        <LayoutCard.Header>
          <LayoutCard.Media>
            <img src="./3d/failed.png" alt="failed" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text>
            <LayoutCard.Title className="text-status-fail">
              {t('result.failed.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>{t('result.failed.description')}</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
        <LayoutCard.Details>
          <Accordion title={t('result.failed.accordionTitle')}>
            <ul className="flex flex-col gap-2">
              {failedReasons.map((reason) => (
                <li key={reason} className="text-box2 text-text-black flex items-center gap-2">
                  <span className="bg-status-fail size-1.5 shrink-0 rounded-full" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        </LayoutCard.Details>
      </LayoutCard.Content>
      <LayoutCard.Footer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <LayoutCard.Button variant="failed" className="w-full">
              {t('result.failed.button')}
            </LayoutCard.Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <ModalBang className="mb-3" />
              <Dialog.Title>{t('result.failed.retry.title')}</Dialog.Title>
              <Dialog.Description>
                {/* TODO: mock remain count */}
                {t('result.failed.retry.description', { remainCount: 2 })}
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="failed-outline">{t('result.failed.retry.cancel')}</Button>
              </Dialog.Close>
              <Button variant="failed" className="w-full">
                {t('result.failed.retry.submit')}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

function Step3NotPeriodCard() {
  const { t } = useTranslation('main');
  const locale = useLocale();

  const nextApplicationStartDateText = useMemo(
    () => formatDate(MOCK_NEXT_PERIOD_START_AT, locale),
    [locale],
  );

  return (
    <LayoutCard.Root>
      <LayoutCard.Content>
        <LayoutCard.Header>
          <LayoutCard.Media>
            <img src="./3d/not-period.png" alt="not-period" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text>
            <LayoutCard.Title className="text-text-black">
              {t('result.notPeriod.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>
              {t('result.notPeriod.description', {
                startDate: nextApplicationStartDateText,
              })}
            </LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Content>
      <LayoutCard.Footer>
        <LayoutCard.Button variant="outline" className="w-full">
          {t('result.notPeriod.button')}
        </LayoutCard.Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

function Step3PassedCard() {
  const { t } = useTranslation('main');

  return (
    <LayoutCard.Root>
      <LayoutCard.Content>
        <LayoutCard.Header>
          <LayoutCard.Media>
            <img src="./3d/passed.png" alt="passed" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text>
            <LayoutCard.Title className="text-primary-main">
              {t('result.passed.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>{t('result.passed.description')}</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Content>
      <LayoutCard.Footer>
        <LayoutCard.Button variant="default" className="w-full">
          {t('result.passed.button')}
        </LayoutCard.Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

export function MainFrame() {
  const { step, status } = useSearch({ from: '/_auth-required/' });
  const { t } = useTranslation('main');
  const { user } = useAuth();
  const locale = useLocale();
  const inspectionDateText = useMemo(() => formatDate(MOCK_INSPECTION_AT, locale), [locale]);
  const steps = useMemo(
    () => [
      {
        title: t('steps.step0.title'),
        description: t('steps.step0.description'),
      },
      {
        title: t('steps.step1.title'),
        description: t('steps.step1.description', {
          inspectionDate: inspectionDateText,
        }),
      },
      {
        title: t('steps.step2.title'),
        description: t('steps.step2.description'),
      },
      {
        title: t('steps.step3.title'),
        description: undefined,
      },
    ],
    [t, inspectionDateText],
  );

  if (!user) return null;

  return (
    <div
      className={cn(
        status === 'passed' || status === 'not-period' ? 'bg-bg-green' : 'bg-bg-surface',
        'h-dvh px-5 py-6',
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-100 flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-h1 text-text-black font-bold">
              {t('header.title', { name: user.name })}
            </h1>
            <h2 className="text-sub text-text-gray">
              {t('header.subtitle', {
                studentId: user.studentNumber,
                room: 'T207', // TODO: mock user room
              })}
            </h2>
          </div>
          <img src="/house-logo.png" alt="house-logo" className="h-15" />
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
