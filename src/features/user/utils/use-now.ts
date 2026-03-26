import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

export const useNow = (interval = 1e3) => {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return now;
};
