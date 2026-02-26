import { useCallback, useMemo, useState } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import ModalBang from '@/assets/modal-bang.svg?react';
import { Accordion, Button, Dialog, LayoutCard, SwitchCase } from '@/common/components';
import { overlay } from '@/common/lib';
import { useAuth } from '@/features/auth';

import {
  useCancelInspection,
  useFindActiveMoveOutScheduleWithSlots,
  useFindMyInspection,
} from '../../viewmodels';
import { Steps } from '../components';

import type { Dayjs } from 'dayjs';

function StatusSteps({
  activeStepIndex,
  inspectionStartTime,
}: {
  activeStepIndex: number;
  inspectionStartTime?: Dayjs;
}) {
  const { t } = useTranslation('user');

  return (
    <Steps activeStepIndex={activeStepIndex} className="w-full">
      <Steps.Item
        title={t('steps.application.title')}
        description={t('steps.application.description')}
      />
      <Steps.Item
        title={t('steps.waiting.title')}
        description={t('steps.waiting.description', {
          inspectionDate: inspectionStartTime?.format('MM/DD(ddd) A hh:mm'),
        })}
      />
      <Steps.Item
        title={t('steps.in_progress.title')}
        description={t('steps.in_progress.description')}
      />
      <Steps.Item title={t('steps.results.title')} />
    </Steps>
  );
}

function NotPeriodCard({ applicationStartTime }: { applicationStartTime?: Dayjs }) {
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
              {t('steps.not_period.title')}
            </LayoutCard.Title>
            {applicationStartTime && (
              <LayoutCard.Description>
                {t('steps.not_period.description', {
                  startTime: applicationStartTime.format('MM/DD'),
                })}
              </LayoutCard.Description>
            )}
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Center>
      <LayoutCard.Footer>
        <Button variant="outline" className="w-full">
          {/* TODO: 버튼 기능 추가 */}
          {t('steps.not_period.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function NotTargetCard() {
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
              {t('steps.not_target.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>{t('steps.not_target.description')}</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Center>
      <LayoutCard.Footer>
        <Button variant="outline" className="w-full">
          {/* TODO: 버튼 기능 추가 */}
          {t('steps.not_target.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function ApplicationCard() {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Body className="justify-between">
        <StatusSteps activeStepIndex={0} />
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <Button variant="default" className="w-full" asChild>
          <Link to="/application">{t('steps.application.button')}</Link>
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function WaitingCard({
  onClick,
  inspectionStartTime,
}: {
  onClick: () => void;
  inspectionStartTime?: Dayjs;
}) {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Body className="justify-between">
        <StatusSteps activeStepIndex={1} inspectionStartTime={inspectionStartTime} />
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <button className="text-text-gray text-sub2 cursor-pointer underline" onClick={onClick}>
            {t('steps.waiting.cancel_button')}
          </button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/application">{t('steps.waiting.change_button')}</Link>
          </Button>
        </div>
      </LayoutCard.Footer>
    </>
  );
}

function InProgressCard() {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Body className="justify-between">
        <StatusSteps activeStepIndex={2} />
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <Button variant="disabled" className="w-full" disabled>
          {t('steps.in_progress.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function FailedCard() {
  const { t } = useTranslation('user');

  // TODO: mock failed reasons
  const failedReasons = useMemo(
    () => [t('steps.failed.reasons.deskDrawer'), t('steps.failed.reasons.bathroom')],
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
              {t('steps.failed.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>{t('steps.failed.description')}</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
        <LayoutCard.Body>
          <Accordion.Root>
            <Accordion.Header>
              <Accordion.Title>{t('steps.failed.accordionTitle')}</Accordion.Title>
            </Accordion.Header>
            <Accordion.Content>
              <ul className="flex flex-col gap-2">
                {failedReasons.map((reason) => (
                  <li key={reason} className="text-box2 text-text-black flex items-center gap-2">
                    <span className="bg-status-fail size-1.5 shrink-0 rounded-full" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion.Root>
        </LayoutCard.Body>
      </LayoutCard.Center>

      <LayoutCard.Footer>
        <Button
          variant="failed"
          className="w-full"
          onClick={() =>
            overlay.open(() => (
              <Dialog.Root>
                <Dialog.Header>
                  <ModalBang className="mb-3" />
                  <Dialog.Title>{t('steps.failed.retry.title')}</Dialog.Title>
                  <Dialog.Description>
                    {/* TODO: mock remain count */}
                    {t('steps.failed.retry.description', { remainCount: 2 })}
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button variant="failed-outline">{t('steps.failed.retry.cancel')}</Button>
                  </Dialog.Close>
                  {/* TODO: retry submit */}
                  <Button variant="failed" className="w-full">
                    {t('steps.failed.retry.submit')}
                  </Button>
                </Dialog.Footer>
              </Dialog.Root>
            ))
          }
        >
          {t('steps.failed.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function PassedCard() {
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
              {t('steps.passed.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>{t('steps.passed.description')}</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Center>
      <LayoutCard.Footer>
        {/* TODO: 버튼 기능 추가 */}
        <Button variant="default" className="w-full">
          {t('steps.passed.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

type Status =
  | 'not_period'
  | 'not_target'
  | 'application'
  | 'waiting'
  | 'in_progress'
  | 'failed'
  | 'passed';

export function MainFrame() {
  const { t } = useTranslation('user');
  const { user } = useAuth();
  const [status, setStatus] = useState<Status>('not_period');

  const {
    isLoading: isLoadingSchedule,
    applicationStartTime,
    isSuccess,
  } = useFindActiveMoveOutScheduleWithSlots({
    onNotTarget: useCallback(() => setStatus('not_target'), []),
    onNotPeriod: useCallback(() => setStatus('not_period'), []),
    onSuccess: useCallback(() => setStatus('application'), []),
  });

  const {
    isLoading: isLoadingInspection,
    inspectionStartTime,
    applicationUuid,
  } = useFindMyInspection(isSuccess, {
    onNotFound: useCallback(() => setStatus('application'), []),
    onFoundWaiting: useCallback(() => setStatus('waiting'), []),
    onFoundInProgress: useCallback(() => setStatus('in_progress'), []),
    onFailed: useCallback(() => setStatus('failed'), []),
    onPassed: useCallback(() => setStatus('passed'), []),
  });

  const { mutateAsync: cancelInspection } = useCancelInspection();

  const openCancelDialog = useCallback(() => {
    overlay.open(({ close }) => (
      <Dialog.Root>
        <Dialog.Header>
          <ModalBang className="mb-3" />
          <Dialog.Title>{t('steps.waiting.cancel.title')}</Dialog.Title>
          <Dialog.Description>{t('steps.waiting.cancel.description')}</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="failed-outline" className="w-full">
              {t('steps.waiting.cancel.button.cancel')}
            </Button>
          </Dialog.Close>
          <Button
            variant="failed"
            className="w-full"
            onClick={async () => {
              if (applicationUuid == null) return;
              await cancelInspection({ params: { path: { uuid: applicationUuid } } })
                .then(() => {
                  close();
                  overlay.open(() => (
                    <Dialog.Root>
                      <Dialog.Header>
                        <ModalBang className="mb-3" />
                        <Dialog.Title>{t('steps.waiting.cancelled.title')}</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Footer>
                        <Dialog.Close asChild>
                          <Button variant="failed" className="w-full">
                            {t('steps.waiting.cancelled.button')}
                          </Button>
                        </Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Root>
                  ));
                })
                .catch(() => {});
            }}
          >
            {t('steps.waiting.cancel.button.submit')}
          </Button>
        </Dialog.Footer>
      </Dialog.Root>
    ));
  }, [cancelInspection, applicationUuid, t]);

  if (!user) return null;

  return (
    <LayoutCard.Root isLoading={isLoadingSchedule || isLoadingInspection}>
      <SwitchCase
        value={status}
        caseBy={{
          not_period: <NotPeriodCard applicationStartTime={applicationStartTime} />,
          not_target: <NotTargetCard />,
          application: <ApplicationCard />,
          waiting: (
            <WaitingCard inspectionStartTime={inspectionStartTime} onClick={openCancelDialog} />
          ),
          in_progress: <InProgressCard />,
          failed: <FailedCard />,
          passed: <PassedCard />,
        }}
      />
    </LayoutCard.Root>
  );
}
