import { cn } from '@/common/utils';

export function Pagination({ page, pageSize, totalCount, onChange, className }: Pagination.Props) {
  const safePageSize = pageSize > 0 ? pageSize : 1;
  const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex w-full items-center justify-center gap-4', className)}>
      <button
        type="button"
        className="text-body text-text-secondary disabled:text-icon"
        disabled={isFirst}
        onClick={() => !isFirst && onChange(page - 1)}
      >
        이전
      </button>
      <span className="text-body text-text-primary">
        {page} / {totalPages}
      </span>
      <button
        type="button"
        className="text-body text-text-secondary disabled:text-icon"
        disabled={isLast}
        onClick={() => !isLast && onChange(page + 1)}
      >
        다음
      </button>
    </div>
  );
}

export namespace Pagination {
  export type Props = {
    page: number;
    pageSize: number;
    totalCount: number;
    onChange: (page: number) => void;
    className?: string;
  };
}
