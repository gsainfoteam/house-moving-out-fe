import { Button } from '@/common/components/ui/button';
import { cn } from '@/common/utils';

function ResultCardRoot({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex h-full flex-col gap-6', className)}>
      {children}
    </div>
  );
}

function ResultCardMain({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

function ResultCardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 text-center',
        className,
      )}
    >
      {children}
    </div>
  );
}

function ResultCardMedia({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function ResultCardTitle({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <h1 className={cn('text-h1 text-center', className)}>{children}</h1>;
}

function ResultCardDescription({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={cn('text-sub2 text-text-gray text-center', className)}>
      {children}
    </div>
  );
}

function ResultCardText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2 text-center', className)}>
      {children}
    </div>
  );
}

function ResultCardDetails({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('w-full', className)}>{children}</div>;
}

/**
 * ResultCard 컴포넌트
 *
 * @example
 * ```tsx
 * <ResultCard>
 *   <ResultCard.Main>
 *     <ResultCard.Header>
 *       <ResultCard.Media>
 *         <Icon className="h-auto w-full" />
 *       </ResultCard.Media>
 *       <ResultCard.Text>
 *         <ResultCard.Title className="text-status-fail">
 *           제목
 *         </ResultCard.Title>
 *         <ResultCard.Description>
 *           설명
 *         </ResultCard.Description>
 *       </ResultCard.Text>
 *     </ResultCard.Header>
 *     <ResultCard.Details>
 *       <Accordion title="추가 정보">...</Accordion>
 *     </ResultCard.Details>
 *   </ResultCard.Main>
 *   <ResultCard.Button variant="default" className="w-full">
 *     버튼
 *   </ResultCard.Button>
 * </ResultCard>
 * ```
 */
export const ResultCard = Object.assign(ResultCardRoot, {
  Main: ResultCardMain,
  Header: ResultCardHeader,
  Media: ResultCardMedia,
  Text: ResultCardText,
  Title: ResultCardTitle,
  Description: ResultCardDescription,
  Details: ResultCardDetails,
  Button,
});
