import { groupBy } from 'es-toolkit';
import xlsx from 'xlsx';

// prettier-ignore
const header = [
  'building', 'room', 'capacity', 'G/I/S/T',
  'p1', 'p2', 'p3', 'p4', 'prohibited',
] as const;

type RawData = Record<(typeof header)[number], string>;

const parsePerson = (person: string) => {
  const name = person.split('(')[0].trim();
  const studentId = person.split('(')[1].trim().split(')')[0].trim();
  const admissionYear = Number.parseInt(studentId.slice(2, 4));
  return { name, studentId, admissionYear };
};

const parseFloorTag = (row: RawData) => {
  const prefix = row['G/I/S/T'] ? `${row['G/I/S/T']}하우스-` : '';
  const floorNumber = Number.parseInt(row.room.replace(/[GIST]/, '').slice(0, 1));
  const floor = `${row.building} ${floorNumber}층`;
  const suffix = row['G/I/S/T'] ? (floorNumber < 5 ? '(남)' : '(여)') : '';
  return `${prefix}${floor}${suffix}`;
};

export const parseData = (buffer: ArrayBuffer) => {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json<RawData>(sheet, { header: [...header] }).slice(1);
  const clean = data.map((row) => ({
    room: row.room.replace('호', ''),
    capacity: row.capacity,
    floorTag: parseFloorTag(row),
    residents: [row.p1, row.p2, row.p3, row.p4].filter(Boolean).map(parsePerson),
    prohibited: row.prohibited,
  }));
  const taggedFloors = Object.entries(groupBy(clean, (r) => r.floorTag))
    .filter(([, v]) => v.some((r) => r.prohibited === '사용가능'))
    .map(([tag, rooms]) => ({ tag, rooms }));
  const buildings = Object.entries(groupBy(taggedFloors, (t) => t.tag[0])).map(
    ([building, floors]) => {
      if (building === 'S') {
        return { building, floors: [{ tag: '주차대', rooms: [] }, ...floors] };
      }
      return { building, floors };
    },
  );
  return buildings;
};

const makeSheet = () => {
  const workbook = xlsx.utils.book_new();
  // const sheet = xlsx.utils.
  return workbook;
};
