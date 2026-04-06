import { useCallback, useMemo, useState, type RefObject } from 'react';

import { downloadSheet, parseData } from './make-2d-sheet';

export const useConverterForm = () => {
  const [buffer, setFile] = useState<ArrayBuffer>();
  const onChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const buffer = await file.arrayBuffer();
      setFile(buffer);
    }
  }, []);

  const data = useMemo(() => (buffer ? parseData(buffer) : undefined), [buffer]);

  const download = useCallback((ref: RefObject<HTMLTableElement | null>, wide: boolean) => {
    if (!ref.current) return;
    downloadSheet(ref.current, wide);
  }, []);

  return { onChange, data, download };
};
