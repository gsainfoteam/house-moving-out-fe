import { useCallback } from 'react';

import { make2DSheet } from './make-2d-sheet';

export const useConverterForm = () => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      make2DSheet(file);
    }
  }, []);

  return { onChange };
};
