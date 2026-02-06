import type dayjs from 'dayjs';

type Range = { start: dayjs.Dayjs; end: dayjs.Dayjs };
export const getTimeRange = (list: Range[]): Range[] => {
  if (list.length === 0) return [];

  const unseen = new Set([...Array(list.length)].map((_, i) => i));
  const queue = [0];

  const result: Range[] = [];

  for (;;) {
    const idx = queue.pop();
    if (idx === undefined) return result;
    unseen.delete(idx);
    const currentBlock = list[idx];

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
          queue.push(v);
          break;
        }
      }
    }
  }
};
