import { cn } from '@/common/utils';

export function Pagination({ page, pageSize, totalCount, onChange, className }: Pagination.Props) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex w-full items-center justify-center gap-4', className)}>
      <button
        type="button"
        className="text-body2 text-text-gray disabled:text-icon-gray"
        disabled={isFirst}
        onClick={() => !isFirst && onChange(page - 1)}
      >
        이전
      </button>
      <span className="text-body2 text-text-black">
        {page} / {totalPages}
      </span>
      <button
        type="button"
        className="text-body2 text-text-gray disabled:text-icon-gray"
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

