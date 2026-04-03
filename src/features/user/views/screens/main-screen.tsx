import { useCallback, useTransition } from 'react';

import { Link } from '@tanstack/react-router';

import { isNotNil } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import ModalBang from '@/assets/modal-bang.svg?react';
import { Accordion, Button, Dialog, LayoutCard, SwitchCase } from '@/common/components';
import { overlay } from '@/common/lib';
import type { checklist } from '@/common/lib';

import { Steps } from '../components';

import type { Dayjs } from 'dayjs';

export type MainScreenStatus =
  | 'not_period'
  | 'not_target'
  | 'cleaning_service'
  | 'application'
  | 'waiting'
  | 'in_progress'
  | 'failed'
  | 'passed'
  | 'no_show';

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
        <LayoutCard.Header className="items-center">
          <LayoutCard.Media>
            <img src="./3d/not-period.png" alt="not-period" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text className="items-center">
            <LayoutCard.Title className="text-text-primary">
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
        <LayoutCard.Header className="items-center">
          <LayoutCard.Media>
            <img src="./3d/not-period.png" alt="not-period" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text className="items-center">
            <LayoutCard.Title className="text-text-primary">
              {t('steps.not_target.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>{t('steps.not_target.description')}</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Center>
      <LayoutCard.Footer>
        <Button variant="outline" className="w-full">
          {t('steps.not_target.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

function CleaningServiceCard() {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Center>
        <LayoutCard.Header className="items-center">
          <LayoutCard.Media>
            <img src="./3d/not-period.png" alt="cleaning-service" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text className="items-center">
            <LayoutCard.Title className="text-text-primary">
              {t('steps.cleaning_service.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>
              {t('steps.cleaning_service.description')}
            </LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Center>
      <LayoutCard.Footer>
        <Button variant="outline" className="w-full">
          {t('steps.cleaning_service.button')}
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

function CancelDialog({
  close,
  cancelInspection,
}: {
  close: () => void;
  cancelInspection: () => Promise<void>;
}) {
  const { t } = useTranslation('user');
  const [loading, startTransition] = useTransition();
  return (
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
          disabled={loading}
          onClick={() =>
            startTransition(async () => {
              await cancelInspection()
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
            })
          }
        >
          {t('steps.waiting.cancel.button.submit')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
}

function WaitingCard({
  inspectionStartTime,
  cancelInspection,
}: {
  inspectionStartTime?: Dayjs;
  cancelInspection: () => Promise<void>;
}) {
  const { t } = useTranslation('user');

  const openCancelDialog = useCallback(() => {
    overlay.open(({ close }) => <CancelDialog close={close} cancelInspection={cancelInspection} />);
  }, [cancelInspection]);

  return (
    <>
      <LayoutCard.Body className="-mx-4 justify-between px-4">
        <StatusSteps activeStepIndex={1} inspectionStartTime={inspectionStartTime} />
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <button
            className="text-text-secondary text-body cursor-pointer underline"
            onClick={openCancelDialog}
          >
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
      <LayoutCard.Body className="-mx-4 justify-between px-4">
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

function FailedCard({
  inspectionCount,
  failedItems,
}: {
  inspectionCount: number;
  failedItems?: checklist.Item[];
}) {
  const { t } = useTranslation('user');
  const remainCount = 3 - inspectionCount;
  const isRetryable = remainCount > 0;

  return (
    <>
      <LayoutCard.Center>
        <LayoutCard.Header className="items-center">
          <LayoutCard.Media>
            <img src="./3d/failed.png" alt="failed" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text className="items-center">
            <LayoutCard.Title className="text-status-fail">
              {isRetryable ? t('steps.failed.title') : t('steps.final_failed.title')}
            </LayoutCard.Title>
            <LayoutCard.Description>
              {failedItems
                ? isRetryable
                  ? t('steps.failed.description')
                  : t('steps.final_failed.description')
                : t('steps.failed.no_show')}
            </LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
        {failedItems && (
          <LayoutCard.Body>
            <Accordion.Root>
              <Accordion.Header>
                <Accordion.Title>{t('steps.failed.accordionTitle')}</Accordion.Title>
              </Accordion.Header>
              <Accordion.Content>
                <ul className="flex flex-col gap-2">
                  {failedItems.map((reason) => (
                    <li
                      key={reason}
                      className="text-body text-text-primary flex items-center gap-2"
                    >
                      <span className="bg-status-fail size-1.5 shrink-0 rounded-full" />
                      <span>{t(reason, { ns: 'checklist' })}</span>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </Accordion.Root>
          </LayoutCard.Body>
        )}
      </LayoutCard.Center>

      {remainCount > 0 && (
        <LayoutCard.Footer>
          <Button
            variant="failed"
            className="w-full"
            onClick={() =>
              overlay.open(({ close }) => (
                <Dialog.Root>
                  <Dialog.Header>
                    <ModalBang className="mb-3" />
                    <Dialog.Title>{t('steps.failed.retry.title')}</Dialog.Title>
                    <Dialog.Description>
                      {t('steps.failed.retry.description', { remainCount })}
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Footer>
                    <Dialog.Close asChild>
                      <Button variant="failed-outline">{t('steps.failed.retry.cancel')}</Button>
                    </Dialog.Close>
                    <Button variant="failed" className="w-full" onClick={close} asChild>
                      <Link to="/application">{t('steps.failed.retry.submit')}</Link>
                    </Button>
                  </Dialog.Footer>
                </Dialog.Root>
              ))
            }
          >
            {t('steps.failed.button')}
          </Button>
        </LayoutCard.Footer>
      )}
    </>
  );
}

function PassedCard() {
  const { t } = useTranslation('user');

  return (
    <>
      <LayoutCard.Center>
        <LayoutCard.Header className="items-center">
          <LayoutCard.Media>
            <img src="./3d/passed.png" alt="passed" className="h-60" />
          </LayoutCard.Media>
          <LayoutCard.Text className="items-center">
            <LayoutCard.Title className="text-primary">{t('steps.passed.title')}</LayoutCard.Title>
            <LayoutCard.Description>{t('steps.passed.description')}</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
      </LayoutCard.Center>
      <LayoutCard.Footer>
        <Button variant="default" className="w-full">
          {t('steps.passed.button')}
        </Button>
      </LayoutCard.Footer>
    </>
  );
}

export function MainScreen({
  status,
  isLoading,
  applicationStartTime,
  inspectionStartTime,
  cancelInspection,
  inspectionCount,
  failedItems,
}: MainScreen.Props) {
  return (
    <LayoutCard.Root isLoading={isLoading}>
      <SwitchCase
        value={status}
        caseBy={{
          not_period: <NotPeriodCard applicationStartTime={applicationStartTime} />,
          not_target: <NotTargetCard />,
          cleaning_service: <CleaningServiceCard />,
          application: <ApplicationCard />,
          waiting: isNotNil(cancelInspection) ? (
            <WaitingCard
              inspectionStartTime={inspectionStartTime}
              cancelInspection={cancelInspection}
            />
          ) : null,
          in_progress: <InProgressCard />,
          failed:
            isNotNil(inspectionCount) && isNotNil(failedItems) ? (
              <FailedCard inspectionCount={inspectionCount} failedItems={failedItems} />
            ) : null,
          passed: <PassedCard />,
          no_show: isNotNil(inspectionCount) && <FailedCard inspectionCount={inspectionCount} />,
        }}
      />
    </LayoutCard.Root>
  );
}

export namespace MainScreen {
  export type Props = {
    status: MainScreenStatus;
    isLoading: boolean;
    applicationStartTime?: Dayjs;
    inspectionStartTime?: Dayjs;
    cancelInspection?: () => Promise<void>;
    inspectionCount?: number;
    failedItems?: checklist.Item[];
  };
}
