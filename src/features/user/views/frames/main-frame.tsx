import { useMemo, useState } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import ModalBang from '@/assets/modal-bang.svg?react';
import { Button, Dialog, LayoutCard, SwitchCase } from '@/common/components';
import { cn } from '@/common/utils';
import { useAuth } from '@/features/auth';

import { useFindMyInspection } from '../../viewmodels';
import { Accordion, Steps } from '../components';

function Step0Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Body className="justify-between">
        <Steps steps={steps} activeStepIndex={0} className="w-full" />
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <Button variant="default" className="w-full" asChild>
          <Link to="/application">{t('steps.step0.button')}</Link>
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function Step1Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Body className="justify-between">
        <Steps steps={steps} activeStepIndex={1} className="w-full" />
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <Button variant="outline" className="w-full">
          {t('steps.step1.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function Step2Card({ steps }: { steps: Steps.Step[] }) {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Body className="justify-between">
        <Steps steps={steps} activeStepIndex={2} className="w-full" />
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <Button variant="disabled" className="w-full" disabled>
          {t('steps.step2.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function Step3FailedCard() {
  const { t } = useTranslation('user');
  const failedReasons = useMemo(
    () => [t('result.failed.reasons.deskDrawer'), t('result.failed.reasons.bathroom')],
    [t],
  );

  return (
    <>
      <LayoutCard.Center>
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
        <LayoutCard.Body>
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
        </LayoutCard.Body>
      </LayoutCard.Center>

      <LayoutCard.Footer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="failed" className="w-full">
              {t('result.failed.button')}
            </Button>
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
              {/* TODO: retry submit */}
              <Button variant="failed" className="w-full">
                {t('result.failed.retry.submit')}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </LayoutCard.Footer>
    </>
  );
}

function Step3NotTargetCard() {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Center>
        <LayoutCard.Header>
          <LayoutCard.Media>
            <img src="./3d/not-period.png" alt="not-period" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text>
            <LayoutCard.Title className="text-text-black">
              {t('result.notTarget.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>{t('result.notTarget.description')}</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Center>
      <LayoutCard.Footer>
        <Button variant="outline" className="w-full">
          {t('result.notTarget.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function Step3PassedCard() {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Center>
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
      </LayoutCard.Center>
      <LayoutCard.Footer>
        <Button variant="default" className="w-full">
          {t('result.passed.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

export function MainFrame() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'passed' | 'failed' | 'notTarget' | undefined>(undefined);

  const { isLoading, inspectionStartTime } = useFindMyInspection({
    onSuccess: () => {
      setStep(1);
    },
    onFailed: () => {
      setStep(0);
    },
  });

  const { t } = useTranslation('user');
  const { user } = useAuth();

  const steps = useMemo(
    () => [
      {
        title: t('steps.step0.title'),
        description: t('steps.step0.description'),
      },
      {
        title: t('steps.step1.title'),
        description: t('steps.step1.description', {
          inspectionDate: inspectionStartTime?.format('MM/DD(ddd) A hh:mm'),
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
    [inspectionStartTime, t],
  );

  if (!user) return null;

  return (
    <div className={cn(status === 'passed' ? 'bg-bg-green' : 'bg-bg-surface', 'h-dvh px-5 py-6')}>
      <div className="mx-auto flex h-full w-full max-w-100 flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-h1 text-text-black font-bold">
              {t('header.title', { ns: 'common', name: user.name })}
            </h1>
            <h2 className="text-sub text-text-gray">
              {user.roomNumber
                ? t('header.subtitle.room', {
                    ns: 'common',
                    studentId: user.studentNumber,
                    room: user.roomNumber,
                  })
                : t('header.subtitle.noRoom', { ns: 'common', studentId: user.studentNumber })}
            </h2>
          </div>
          <img src="/house-logo.png" alt="house-logo" className="h-15" />
        </div>

        <LayoutCard.Root isLoading={isLoading}>
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
                    notTarget: <Step3NotTargetCard />,
                    passed: <Step3PassedCard />,
                  }}
                />
              ),
            }}
          />
        </LayoutCard.Root>
      </div>
    </div>
  );
}
