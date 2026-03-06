import { checklist } from '.';

import type dayjs from 'dayjs';

const template = String.raw`
#set page(margin: (left: 30mm, right: 30mm, top: 20mm + 15mm, bottom: 15mm + 15mm))
#set text(size: 11pt)

#let gray = rgb("#5D5D5D")
#let lightGray = rgb("#DCDCDC")
#let lightLightGray = rgb("#F7F7F7")

#table(
  inset: 0pt,
  stroke: 0pt,
  table(
    columns: (4fr, 5fr, 4fr),
    align: center + horizon,
    stroke: 0pt,
    inset: 8pt,
    fill: lightGray,
    table.hline(stroke: 0.7mm + gray),
    table.cell(inset: (x: 24pt), stroke: (right: 0.12mm + gray), image("/assets/house-full-logo.png")),
    table.cell(inset: 2pt)[*GIST대학 총학생회\ 제 {{GENERATION}}대 하우스연합회*],
    table.hline(stroke: 0.7mm + gray),
    table.cell(
      inset: 0pt,
      table(
        stroke: (top: 0.12mm + gray, left: 0.12mm + gray, bottom: 0.12mm + gray, right: 0pt),
        columns: (1fr, 1fr),
        rows: (auto, auto),
        [총괄], [검사자],
        table.hline(stroke: 0.7mm + gray),
        table.cell(fill: white)[\ ],
        table.cell(fill: white)[\ ],
      ),
    ),
  ),
  table(
    columns: (1fr, 1fr, 1fr, 1fr),
    align: center,
    stroke: (x, y) => if (x == 0) { (left: 0pt, bottom: 0.12mm + gray) } else if (x == 3) {
      (right: 0pt, bottom: 0.12mm + gray)
    } else { 0.12mm + gray },
    table.hline(stroke: 0.7mm + gray),
    [검사일], [검사 시간], [검사 호실], [피검사자 서명],
    [{{DATE}}], [{{TIME}}], [{{ROOM_NUMBER}}], [],
    table.hline(stroke: 0.7mm + gray),
  ),
)

#v(8pt)

#text(size: 15pt, align(center)[*하우스 퇴사검사 체크리스트 {{ROOM_TYPE}}*])

#v(8pt)

#box(
  stroke: 0.4mm + black,
  text(size: 10pt, table(
    stroke: 0.12mm + gray,
    columns: (14mm, 20mm, 1fr, 13mm),
    align: center + horizon,
    inset: 4pt,
    table.hline(stroke: 0.4mm + black),
    table.cell(fill: lightGray, stroke: (left: 0.4mm + black))[연번],
    table.cell(fill: lightGray)[항목],
    table.cell(fill: lightGray)[상태],
    table.cell(fill: lightGray, stroke: (right: 0.4mm + black))[확인],
    table.hline(stroke: 0.4mm + black),
    {{CHECKLIST_ITEMS}}
    table.hline(stroke: 0.4mm + black),
    table.cell(colspan: 4, inset: 0pt, text(size: 7pt, table(
      stroke: 0.12mm + gray,
      columns: (1fr, 1fr, 1fr, 1fr, 1fr, 1fr, 1fr),
      inset: 3pt,
      table.cell(rowspan: 2, text(size: 7pt)[이상여부/\ 존재유무 확인]),
      [소화기], [신발장\ 형광등], [의자], [커튼], [블라인드], [방충망],
      [환풍기], [화장실 전구], [비데], [벽], [호실 형광등], [랜선],
    ))),
  )),
)

#v(8pt)

#align(right, table(
  columns: 4,
  align: center + horizon,
  inset: 6pt,
  fill: lightLightGray,
  stroke: (x, y) => (
    left: if (x == 0) { 0.4mm + gray } else { 0.12mm + gray },
    right: if (x == 3) { 0.4mm + gray } else { 0.12mm + gray },
    top: if (y == 0) { 0.4mm + gray } else { 0.12mm + gray },
    bottom: 0.12mm + gray,
  ),
  [*검사 횟수(체크)*],
  square(stroke: 0pt, height: 10pt)[{{CHECK_COUNT_1}}],
  square(stroke: 0pt, height: 10pt)[{{CHECK_COUNT_2}}],
  square(stroke: 0pt, height: 10pt)[{{CHECK_COUNT_3}}],
))
`;

export const generateChecklistFile = ({
  generation,
  inspectedAt,
  roomNumber,
  roomType,
  inspectionCount,
}: {
  generation: number;
  inspectedAt: dayjs.Dayjs;
  roomNumber: string;
  roomType: 'a2' | 'a3' | 'b';
  inspectionCount: number;
}) => {
  const checklistItems = `${checklist.sections
    .flatMap((section, sectionIndex) => [
      ...checklist[roomType][section].map((item, itemIndex) => {
        const title = checklist.itemTitles[item];
        const description = checklist.itemDescriptions[item];
        return [
          `[${sectionIndex + 1}-${itemIndex + 1}], `,
          `text(size: ${title.length > 5 ? 8 : 10}pt)[${title}], `,
          `text(size: ${description.length > 30 ? 8 : 10}pt)[${description}], `,
          `[#sym.checkmark], `,
        ].join('');
      }),
      'table.hline(stroke: 0.4mm + black),',
    ])
    .join('\n')}`;
  return template
    .replace('{{GENERATION}}', generation.toString())
    .replace('{{DATE}}', inspectedAt.format('MM월 DD일'))
    .replace('{{TIME}}', inspectedAt.format('HH시 mm분'))
    .replace('{{ROOM_NUMBER}}', roomNumber)
    .replace(
      '{{ROOM_TYPE}}',
      roomType === 'a2' ? 'A동(2인실)' : roomType === 'a3' ? 'A동(3인실)' : 'B동',
    )
    .replace('{{CHECK_COUNT_1}}', inspectionCount > 0 ? '#sym.checkmark' : '')
    .replace('{{CHECK_COUNT_2}}', inspectionCount > 1 ? '#sym.checkmark' : '')
    .replace('{{CHECK_COUNT_3}}', inspectionCount > 2 ? '#sym.checkmark' : '')
    .replace('{{CHECKLIST_ITEMS}}', checklistItems);
};
