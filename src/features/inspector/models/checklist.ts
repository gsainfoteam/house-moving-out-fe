import * as images from './checklist-images';

import type { ParseKeys } from 'i18next';

export type Section = ParseKeys<'inspector', {}, 'checklist.sections'>;
export type Item = ParseKeys<'inspector', {}, 'checklist.items'>;
type Checklist = Record<Section, ([Item, ...string[]] | null)[]>;
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
  'entrance-solo': '현관',
  'shoe-cabinet-solo': '신발장',
  'shoe-cabinet-cleanliness': '신발장',
  'wardrobe-cleanliness': '옷장',
  'wardrobe-solo': '옷장',
  'aircon-dust': '에어컨',
  'bookshelf-cleanliness': '책꽂이',
  'bookshelf-solo': '책꽂이',
  'desk-cleanliness': '책상',
  'desk-solo': '책상',
  'board-cleanliness': '칠판',
  'drawer-cleanliness': '서랍',
  'drawer-solo': '서랍',
  'bed-gap-space': '침대사이공간',
  'bed-gap-space-solo': '침대사이공간',
  mattress: '매트리스',
  'mattress-solo': '매트리스',
  'bed-frame': '침대 프레임',
  'bed-frame-solo': '침대 프레임',
  'bed-drawer': '침대서랍',
  'bed-drawer-solo': '침대서랍',
  'bed-below': '침대 밑',
  'window-cleanliness': '창문',
  'window-frame-cleanliness': '창틀',
  balcony: '베란다',
  'internal-terrace-cleanliness': '내부 테라스',
  mirror: '거울',
  'mirror-solo': '거울',
  tile: '타일',
  'tile-solo': '타일',
  sink: '세면대',
  'sink-solo': '세면대',
  'soap-stain': '비누걸이',
  toilet: '변기통',
  'toilet-solo': '변기통',
  'bathroom-drawer': '수납장',
  'bathroom-drawer-solo': '수납장',
  drain: '하수구',
  'shower-booth': '샤워부스',
  'shower-booth-solo': '샤워부스',
  floor: '방바닥',
  'room-structure': '방구조',
  power: '전원',
} satisfies Content;

export const itemDescriptions = {
  'door-password-reset': '초기화되어 있어야 함(기본 비밀번호: 0+방호수)',
  'entrance-rack': '어떠한 장식물이나 부착물 따위가 없어야 함',
  'entrance-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'entrance-solo': '퇴사자의 개인 물품이 없어야 함',
  'shoe-cabinet-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'shoe-cabinet-solo': '퇴사자의 개인 물품이 없어야 함',
  'wardrobe-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'wardrobe-solo': '퇴사자의 옷장에 개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'aircon-dust': '에어컨 필터에 먼지가 없어야 함',
  'bookshelf-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'bookshelf-solo': '퇴사자의 책꽂이에 개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'desk-cleanliness': '개인 물품, 쓰레기, 먼지, 낙서, 얼룩 등이 없어야 함',
  'desk-solo': '퇴사자의 책상에 개인 물품, 쓰레기, 먼지, 낙서, 얼룩 등이 없어야 함',
  'board-cleanliness': '낙서가 없어야 함',
  'drawer-cleanliness': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'drawer-solo': '퇴사자의 서랍에 개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'bed-gap-space': '책상과 침대 사이에 쓰레기, 먼지 등이 없어야 함',
  'bed-gap-space-solo': '퇴사자의 책상과 침대 사이에 쓰레기, 먼지 등이 없어야 함',
  mattress: '매트리스에 먼지나 머리카락 등이 없어야 함',
  'mattress-solo': '퇴사자의 매트리스에 먼지나 머리카락 등이 없어야 함',
  'bed-frame': '매트리스와 침대 프레임 사이에 먼지나 머리카락 등이 없어야함',
  'bed-frame-solo': '퇴사자의 매트리스와 침대 프레임 사이에 먼지나 머리카락 등이 없어야 함',
  'bed-drawer': '개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'bed-drawer-solo': '퇴사자의 침대서랍에 개인 물품, 쓰레기, 먼지 등이 없어야 함',
  'bed-below': '침대를 밀었을 때 쓰레기, 먼지, 머리카락 등이 없어야 함',
  'window-cleanliness': '창문이 깨끗해야 하며 창문이 닫혀져 있어야 함',
  'window-frame-cleanliness': '안쪽 창틀에 먼지나 쓰레기가 없어야 함',
  balcony: '개인 물품, 쓰레기가 없어야 함',
  'internal-terrace-cleanliness': '개인 물품, 쓰레기, 먼지, 얼룩 등이 없어야 함',
  mirror: '파손된 부분과 물때 및 물기가 없어야 함',
  'mirror-solo': '파손된 부분과 심각한 정도의 물때가 없어야 함',
  tile: '머리카락과 먼지, 얼룩 등이 없어야 함',
  'tile-solo': '심각한 수준의 오염이 없어야 함',
  sink: '머리카락과 먼지, 얼룩 등이 없어야 함',
  'sink-solo': '심각한 수준의 오염이 없어야 함',
  'soap-stain': '비누걸이가 제자리에 있어야 함',
  toilet: '비데를 들었을 때, 머리카락과 먼지, 얼룩 등이 없어야 함',
  'toilet-solo': '심각한 수준의 오염이 없어야 함',
  'bathroom-drawer': '개인물품, 쓰레기, 먼지 등이 없어야 함',
  'bathroom-drawer-solo': '퇴사자의 개인 물품이 없어야 함',
  drain: '화장실 하수구 커버를 분리하였을 때, 먼지, 머리카락 등이 없어야 함',
  'shower-booth': '샤워부스에 물때 및 물기가 없어야 함',
  'shower-booth-solo': '샤워부스에 심각한 정도의 물때가 없어야 함',
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
] satisfies Section[];

export const a2 = {
  'entrance-shoe-cabinet': [
    ['door-password-reset'],
    ['entrance-rack', images.door],
    ['entrance-cleanliness', images.entranceA],
    ['shoe-cabinet-cleanliness', images.shoeCabinet],
  ],
  'furniture-aircon': [
    ['wardrobe-cleanliness', images.wardrobeA],
    ['aircon-dust', images.airconDust, images.airconDustClean],
    ['bookshelf-cleanliness', images.bookshelfA],
    ['desk-cleanliness', images.bookshelfA],
    ['drawer-cleanliness', images.drawerA],
  ],
  bed: [
    ['bed-gap-space', images.bedGap],
    ['mattress', images.mattress],
    ['bed-frame', images.bedFrame],
    ['bed-drawer', images.bedDrawer],
    ['bed-below', images.bedBelow1, images.bedBelow2, images.bedBelow3, images.bedBelow4],
  ],
  'window-balcony': [
    ['window-cleanliness', images.window],
    ['window-frame-cleanliness', images.windowFrameA],
    ['balcony', images.balcony, images.balconyEmpty],
  ],
  bathroom: [
    ['mirror', images.mirror],
    ['tile'],
    ['sink'],
    ['soap-stain'],
    ['toilet', images.toilet],
    ['bathroom-drawer'],
    ['drain', images.drainA, images.drainLiftA],
    ['shower-booth', images.showerBooth1, images.showerBooth2],
  ],
  floor: [['floor'], ['room-structure']],
  power: [['power']],
  issues: [
    ['extinguisher'],
    ['shoe-cabinet-light'],
    ['chair'],
    ['curtain'],
    ['blind'],
    ['insect-screen'],
    ['ventilation-fan'],
    ['bathroom-light'],
    ['bidet'],
    ['wall'],
    ['hallway-light'],
    ['lan-cable'],
  ],
} satisfies Checklist;

export const a3 = {
  ...a2,
  'window-balcony': [
    ['window-cleanliness', images.window],
    ['window-frame-cleanliness', images.windowFrameA],
    ['internal-terrace-cleanliness'],
  ],
} satisfies Checklist;

export const b = {
  ...a2,
  'entrance-shoe-cabinet': [
    ['door-password-reset'],
    ['entrance-rack', images.door],
    ['entrance-cleanliness', images.entranceB],
    ['shoe-cabinet-cleanliness', images.shoeCabinet],
  ],
  'furniture-aircon': [
    ['wardrobe-cleanliness', images.wardrobeB],
    ['aircon-dust', images.airconDust, images.airconDustClean],
    ['bookshelf-cleanliness', images.bookshelfB],
    ['desk-cleanliness', images.bookshelfB],
    ['board-cleanliness', images.bookshelfB],
    ['drawer-cleanliness', images.drawerB],
  ],
  bathroom: [
    ['mirror', images.mirror],
    ['tile'],
    ['sink'],
    ['soap-stain'],
    ['toilet', images.toilet],
    ['bathroom-drawer'],
    ['drain', images.drainB, images.drainLiftB],
    ['shower-booth', images.showerBooth1, images.showerBooth2],
  ],
  'window-balcony': [
    ['window-cleanliness', images.window],
    ['window-frame-cleanliness', images.windowFrameB],
  ],
  issues: [...a2.issues, ['power-strips']],
} satisfies Checklist;

export const solo = {
  'entrance-shoe-cabinet': [
    null,
    null,
    ['entrance-solo', images.entranceA],
    ['shoe-cabinet-solo', images.shoeCabinet],
  ],
  'furniture-aircon': [
    ['wardrobe-solo', images.wardrobeA],
    null,
    ['bookshelf-solo', images.bookshelfA],
    ['desk-solo', images.bookshelfA],
    ['drawer-solo', images.drawerA],
  ],
  bed: [
    ['bed-gap-space-solo', images.bedGap],
    ['mattress-solo', images.mattress],
    ['bed-frame-solo', images.bedFrame],
    ['bed-drawer-solo', images.bedDrawer],
  ],
  'window-balcony': [],
  bathroom: [
    ['mirror-solo', images.mirror],
    ['tile-solo'],
    ['sink-solo'],
    null,
    ['toilet-solo', images.toilet],
    ['bathroom-drawer-solo'],
    null,
    ['shower-booth-solo', images.showerBooth1, images.showerBooth2],
  ],
  floor: [],
  power: [],
  issues: a2.issues,
} satisfies Checklist;
