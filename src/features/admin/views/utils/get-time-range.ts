import { range } from 'es-toolkit';

import type dayjs from 'dayjs';

type Range = { start: dayjs.Dayjs; end: dayjs.Dayjs };
export const getTimeRange = (list: Range[]): Range[] => {
  if (list.length === 0) return [];

  const unseen = new Set(range(list.length));
  let nextIndex: number | null = 0;

  const result: Range[] = [];

  for (;;) {
    if (nextIndex === null) return result;
    unseen.delete(nextIndex);
    const currentBlock = { ...list[nextIndex] };
    nextIndex = null;

    for (;;) {
      const nextBlock = [...unseen].find((i) => list[i].start.isSame(currentBlock.end));
      const previousBlock = [...unseen].find((i) => list[i].end.isSame(currentBlock.start));
      if (nextBlock !== undefined) {
        currentBlock.end = list[nextBlock].end;
        unseen.delete(nextBlock);
      } else if (previousBlock !== undefined) {
        currentBlock.start = list[previousBlock].start;
        unseen.delete(previousBlock);
      } else {
        result.push(currentBlock);
        const v = unseen.keys().next().value;
        if (v === undefined) {
          return result;
        } else {
          nextIndex = v;
          break;
        }
      }
    }
  }
};
