import { Button } from '@/common/components/ui/button';
import { cn } from '@/common/utils';

function StatusCardRoot({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-bg-white flex h-full flex-col gap-6 rounded-3xl p-6 shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatusCardContent({
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

function StatusCardHeader({
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

function StatusCardMedia({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function StatusCardTitle({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <h1 className={cn('text-h1 text-center', className)}>{children}</h1>;
}

function StatusCardDescription({
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

function StatusCardText({
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

function StatusCardDetails({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('w-full', className)}>{children}</div>;
}

function StatusCardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('w-full', className)}>{children}</div>;
}

/**
 * StatusCard 컴포넌트
 *
 * 상태 표시용 카드 컴포넌트입니다. 단계별 상태나 결과 상태를 표시하는 데 사용됩니다.
 *
 * @example
 * ```tsx
 * <StatusCard>
 *   <StatusCard.Content>
 *     <StatusCard.Header>
 *       <StatusCard.Media>
 *         <Icon className="h-auto w-full" />
 *       </StatusCard.Media>
 *       <StatusCard.Text>
 *         <StatusCard.Title className="text-status-fail">
 *           제목
 *         </StatusCard.Title>
 *         <StatusCard.Description>
 *           설명
 *         </StatusCard.Description>
 *       </StatusCard.Text>
 *     </StatusCard.Header>
 *     <StatusCard.Details>
 *       <Accordion title="추가 정보">...</Accordion>
 *     </StatusCard.Details>
 *   </StatusCard.Content>
 *   <StatusCard.Footer>
 *     <Button variant="default" className="w-full">
 *       버튼
 *     </Button>
 *   </StatusCard.Footer>
 * </StatusCard>
 * ```
 */
export const StatusCard = Object.assign(StatusCardRoot, {
  Content: StatusCardContent,
  Header: StatusCardHeader,
  Media: StatusCardMedia,
  Text: StatusCardText,
  Title: StatusCardTitle,
  Description: StatusCardDescription,
  Details: StatusCardDetails,
  Footer: StatusCardFooter,
  Button,
});
