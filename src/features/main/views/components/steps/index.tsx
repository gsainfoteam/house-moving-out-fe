import { Check } from 'lucide-react';
import type { VariantProps } from 'tailwind-variants';

import { cn, cv } from '@/common/utils';

function StepIcon({
  status,
  stepIndex,
}: {
  status: Steps.StepStatus;
  stepIndex: number;
}) {
  return (
    <div className={Steps.indicatorStyles({ status })}>
      {status === 'completed' ? (
        <Check size={24} strokeWidth={3} className="text-text-white" />
      ) : (
        <span className="text-text-white text-button">{stepIndex}</span>
      )}
    </div>
  );
}

// TODO: dashed line 추가
function StepLine({ status }: { status: Steps.LineStatus }) {
  return <div className={Steps.lineStyles({ status })} />;
}

export function Steps({ steps, activeStepIndex, className }: Steps.Props) {
  const getStepStatus = (index: number): Steps.StepStatus => {
    if (index < activeStepIndex) return 'completed';
    if (index === activeStepIndex) return 'active';
    return 'inactive';
  };

  const getLineStatus = (index: number): Steps.LineStatus => {
    // 다음 step의 상태에 따라 결정
    const nextStepStatus = getStepStatus(index + 1);
    return nextStepStatus === 'inactive' ? 'inactive' : 'active';
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className={cn('flex min-h-30 gap-4', isLast && 'min-h-0')}
          >
            <div className="flex flex-col items-center">
              <StepIcon status={status} stepIndex={index + 1} />
              {!isLast && <StepLine status={getLineStatus(index)} />}
            </div>

            <div className={cn('flex-1')}>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-0.5">
                  <div className="text-sub text-text-gray">
                    Step {index + 1}
                  </div>
                  <div
                    className={Steps.titleStyles({
                      status,
                      className: 'leading-tight', // FIXME: typography leading 추가 후 지우기
                    })}
                  >
                    {step.title}
                  </div>
                </div>
                {status === 'active' && step.description && (
                  <div className="text-sub text-text-gray whitespace-pre-line">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export namespace Steps {
  export type Step = {
    title: string;
    description?: string;
  };

  export type Props = {
    steps: Step[];
    activeStepIndex: number;
    className?: string;
  };

  export const indicatorStyles = cv({
    base: ['flex size-10 items-center justify-center rounded-full'],
    variants: {
      status: {
        inactive: ['bg-icon-gray'],
        active: [
          'bg-primary-main drop-shadow-[0_0_12px_var(--color-primary-main)]',
        ],
        completed: ['bg-primary-main'],
      },
    },
  });

  export const lineStyles = cv({
    base: ['w-1 flex-1'],
    variants: {
      status: {
        active: ['bg-primary-main'],
        inactive: ['bg-icon-gray'],
      },
    },
  });

  export type StepStatus = NonNullable<
    VariantProps<typeof indicatorStyles>['status']
  >;

  export type LineStatus = NonNullable<
    VariantProps<typeof lineStyles>['status']
  >;

  export const titleStyles = cv({
    base: [],
    variants: {
      status: {
        inactive: ['text-text-gray text-waiting'],
        active: ['text-text-black text-in-progress'],
        completed: ['text-text-black text-in-progress'],
      },
    },
  });
}
