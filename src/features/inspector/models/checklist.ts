import type { ParseKeys } from 'i18next';

type Category = ParseKeys<'inspector', {}, 'checklist.sections'>;
type Item = ParseKeys<'inspector', {}, 'checklist.items'>;
type Checklist = Record<Category, Item[]>;
type IssueItem =
  | 'bathroom-light'
  | 'bidet'
  | 'blind'
  | 'chair'
  | 'curtain'
  | 'extinguisher'
  | 'hallway-light'
  | 'insect-screen'
  | 'lan-cable'
  | 'shoe-cabinet-light'
  | 'ventilation-fan'
  | 'wall'
  | 'power-strips';
type Content = Record<Exclude<Item, IssueItem>, string>;
type Status = Record<Item, string>;

export const itemTitles = {
  'door-password-reset': '도어락',
  'entrance-rack': '현관문',
  'entrance-cleanliness': '현관',
  'shoe-cabinet-cleanliness': '신발장',
  'wardrobe-cleanliness': '옷장',
  'aircon-dust': '에어컨',
  'bookshelf-cleanliness': '책꽂이',
  'desk-cleanliness': '책상',
  'board-cleanliness': '칠판',
  'drawer-cleanliness': '서랍',
  'bed-gap-space': '침대사이공간',
  mattress: '매트리스',
  'bed-frame': '침대 프레임',
  'bed-drawer': '침대서랍',
  'bed-below': '침대 밑',
  'window-cleanliness': '창문',
  'window-frame-cleanliness': '창틀',
  balcony: '베란다',
  'internal-terrace-cleanliness': '내부 테라스',
  mirror: '거울',
  tile: '타일',
  sink: '세면대',
  'soap-stain': '비누걸이',
  toilet: '변기통',
  drawer: '수납장',
  drain: '하수구',
  'shower-booth': '샤워부스',
  floor: '방바닥',
  'room-structure': '방구조',
  power: '전원',
} satisfies Content;

export const itemDescriptions = {
  'door-password-reset': '초기화되어 있어야 함(기본 비밀번호: 0+방호수)',
  'entrance-rack': '어떠한 장식물이나 부착물 따위가 없어야 함',
  'entrance-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'shoe-cabinet-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'wardrobe-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'aircon-dust': '에어컨 필터에 먼지가 없어야 함',
  'bookshelf-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'desk-cleanliness': '개인 물품, 쓰레기, 먼지, 낙서, 얼룩 등이 없어야 함',
  'board-cleanliness': '낙서가 없어야 함',
  'drawer-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'bed-gap-space': '책상과 침대 사이에 쓰레기, 먼지 등이 없어야 함',
  mattress: '매트리스에 먼지나 머리카락 등이 없어야 함',
  'bed-frame': '매트리스와 침대 프레임 사이에 먼지나 머리카락 등이 없어야함',
  'bed-drawer': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'bed-below': '침대를 밀었을 때 쓰레기, 먼지, 머리카락 등이 없어야 함',
  'window-cleanliness': '창문이 깨끗해야 하며 창문이 닫혀져 있어야 함',
  'window-frame-cleanliness': '안쪽 창틀에 먼지나 쓰레기가 없어야 함',
  balcony: '개인 물품, 쓰레기가 없어야 함',
  'internal-terrace-cleanliness': '개인 물품, 쓰레기, 먼지, 얼룩 등이 없어야 함',
  mirror: '파손된 부분과 물때 및 물기가 없어야 함',
  tile: '머리카락과 먼지, 얼룩 등이 없어야 함',
  sink: '머리카락과 먼지, 얼룩 등이 없어야 함',
  'soap-stain': '비누걸이가 제자리에 있어야 함',
  toilet: '비데를 들었을 때, 머리카락과 먼지, 얼룩 등이 없어야 함',
  drawer: '개인물품, 쓰레기, 먼지 등이 없어야 함',
  drain: '화장실 하수구 커버를 분리하였을 때, 먼지, 머리카락 등이 없어야 함',
  'shower-booth': '샤워부스에 물때 및 물기가 없어야 함',
  floor: '쓰레기, 먼지, 머리카락, 얼룩 등이 없어야 함',
  'room-structure': '책상, 침대 등 방 구조물의 위치가 변경되어 있지 않아야 함',
  power: '전등, 난방, 에어컨 등 모든 전원이 꺼져있음',

  extinguisher: '소화기',
  'shoe-cabinet-light': '신발장\n형광등',
  chair: '의자',
  curtain: '커튼',
  blind: '블라인드',
  'insect-screen': '방충망',
  'ventilation-fan': '환풍기',
  'bathroom-light': '화장실 전구',
  bidet: '비데',
  wall: '벽',
  'hallway-light': '호실 형광등',
  'lan-cable': '랜선',
  'power-strips': '멀티탭',
} satisfies Status;

export const sections = [
  'entrance-shoe-cabinet',
  'furniture-aircon',
  'bed',
  'window-balcony',
  'bathroom',
  'floor',
  'power',
] satisfies Category[];

export const a2 = {
  'entrance-shoe-cabinet': [
    'door-password-reset',
    'entrance-rack',
    'entrance-cleanliness',
    'shoe-cabinet-cleanliness',
  ],
  'furniture-aircon': [
    'wardrobe-cleanliness',
    'aircon-dust',
    'bookshelf-cleanliness',
    'desk-cleanliness',
    'drawer-cleanliness',
  ],
  bed: ['bed-gap-space', 'mattress', 'bed-frame', 'bed-drawer', 'bed-below'],
  'window-balcony': ['window-cleanliness', 'window-frame-cleanliness', 'balcony'],
  bathroom: ['mirror', 'tile', 'sink', 'soap-stain', 'toilet', 'drawer', 'drain', 'shower-booth'],
  floor: ['floor', 'room-structure'],
  power: ['power'],
  issues: [
    'extinguisher',
    'shoe-cabinet-light',
    'chair',
    'curtain',
    'blind',
    'insect-screen',
    'ventilation-fan',
    'bathroom-light',
    'bidet',
    'wall',
    'hallway-light',
    'lan-cable',
  ],
} satisfies Checklist;

export const a3 = {
  ...a2,
  'window-balcony': [
    'window-cleanliness',
    'window-frame-cleanliness',
    'internal-terrace-cleanliness',
  ],
} satisfies Checklist;

export const b = {
  ...a2,
  'furniture-aircon': [
    'wardrobe-cleanliness',
    'aircon-dust',
    'bookshelf-cleanliness',
    'desk-cleanliness',
    'board-cleanliness',
    'drawer-cleanliness',
  ],
  'window-balcony': ['window-cleanliness', 'window-frame-cleanliness'],
  issues: [...a2.issues, 'power-strips'],
} satisfies Checklist;
