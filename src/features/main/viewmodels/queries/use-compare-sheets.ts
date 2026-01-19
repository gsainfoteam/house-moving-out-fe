import { useMutation } from '@tanstack/react-query';

import type { ApiHttpError } from '@/common/lib';

import { moveOutApi } from '../../models';
import type {
  CompareSheetsArgs,
  CreateInspectionTargetsResDto,
} from '../../models';

export const useCompareSheets = () => {
  return useMutation<
    CreateInspectionTargetsResDto,
    ApiHttpError,
    CompareSheetsArgs
  >({
    mutationFn: (args) => moveOutApi.compareSheets(args),
  });
};
