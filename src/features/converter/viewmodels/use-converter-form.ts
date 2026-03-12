import { useCallback, useMemo, useState } from 'react';

import { parseData } from './make-2d-sheet';

export const useConverterForm = () => {
  const [file, setFile] = useState<ArrayBuffer>();
  const onChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const buffer = await file.arrayBuffer();
      setFile(buffer);
    }
  }, []);

  const data = useMemo(() => (file ? parseData(file) : undefined), [file]);

  const download = useCallback(async () => {
    if (!data) return;
  }, [data]);

  return { onChange, data, download };
};
