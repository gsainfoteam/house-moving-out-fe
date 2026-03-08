import * as checklist from './checklist';

import type dayjs from 'dayjs';

const template = String.raw`
#set page(margin: (left: 30mm, right: 30mm, top: 20mm + 15mm, bottom: 15mm + 15mm))
#set text(size: 11pt)

#let gray = rgb("#5D5D5D")
#let lightGray = rgb("#DCDCDC")
#let lightLightGray = rgb("#F7F7F7")
#let items = json(bytes({{ITEMS}}))
#let issues = json(bytes({{ISSUES}}))
#let checkedItems = json(bytes({{CHECKED_ITEMS}}))
#let inspectionCount = {{INSPECTION_COUNT}}
#let hasSignature = {{HAS_SIGNATURE}}
#let title = (
  a2: "하우스 퇴사검사 체크리스트 A동(2인실)",
  a3: "하우스 퇴사검사 체크리스트 A동(3인실)",
  b: "하우스 퇴사검사 체크리스트 B동",
  solo: "하우스 1인 잔류 시 퇴사검사 체크리스트",
).{{ROOM_TYPE}}

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
        [*총괄*], [*검사자*],
        table.hline(stroke: 0.7mm + gray),
        table.cell(fill: white)[\ ],
        table.cell(fill: white, if (hasSignature) { place(center + horizon, image("/assets/inspector-signature.png", height: 20pt)) } else { none }),
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
    [{{DATE}}],
    [{{TIME}}],
    [{{ROOM_NUMBER}}],
    if (hasSignature) { place(center + horizon, image("/assets/target-signature.png", height: 20pt)) } else { none },
    table.hline(stroke: 0.7mm + gray),
  ),
)

#v(8pt)

#text(size: 15pt, weight: "bold", align(center, title))

#v(8pt)


#box(stroke: 0.4mm + black, text(size: 10pt, table(
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
  ..(
    items
      .enumerate(start: 1)
      .map(section => (
        section
          .at(1)
          .enumerate(start: 1)
          .map(item => {
            if (item.at(1) == none) {
              return ();
            } else {
              let key = item.at(1).at(0);
              let title = item.at(1).at(1);
              let description = item.at(1).at(2);
              return (
                [#section.at(0)-#item.at(0)],
                text(size: if (title.len() > 5) { 8pt } else { 10pt }, title),
                text(size: if (description.len() > 30) { 8pt } else { 10pt }, description),
                if (checkedItems.contains(key)) { sym.checkmark } else { none },
              );
            }
          }),
        table.hline(stroke: 0.4mm + black),
      ))
      .flatten()
  ),
  table.hline(stroke: 0.4mm + black),
  table.cell(colspan: 4, inset: 0pt, text(size: 7pt, table(
    stroke: 0.12mm + gray,
    columns: (..(1fr,) * (int((issues.len() + 3) / 2)),),
    inset: 3pt,
    table.cell(rowspan: 2)[이상여부/\ 존재유무 확인],
    ..(
      issues.map(issue => [
        #place(
          center + horizon,
          ellipse(
            width: 100%,
            height: 10pt,
            stroke: if (checkedItems.contains(issue.at(0))) { gray } else { none },
          ),
        )
        #issue.at(1)
      ])
    ),
  ))),
)))

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
  ..range(3).map(index => square(
    stroke: 0pt,
    height: 10pt,
    if (index < inspectionCount) { sym.checkmark } else {},
  )),
))
`;

export const generateChecklistFile = ({
  generation,
  inspectedAt,
  roomNumber,
  roomType,
  inspectionCount,
  checkedItems,
  hasSignature,
}: {
  generation: number;
  inspectedAt: dayjs.Dayjs;
  roomNumber: string;
  roomType: 'a2' | 'a3' | 'b' | 'solo';
  inspectionCount: number;
  checkedItems: checklist.Item[];
  hasSignature: boolean;
}) => {
  return template
    .replace('{{GENERATION}}', generation.toString())
    .replace('{{DATE}}', inspectedAt.format('MM월 DD일'))
    .replace('{{TIME}}', inspectedAt.format('HH시 mm분'))
    .replace('{{ROOM_NUMBER}}', roomNumber)
    .replace('{{ROOM_TYPE}}', roomType)
    .replace('{{INSPECTION_COUNT}}', inspectionCount.toString())
    .replace(
      '{{ITEMS}}',
      JSON.stringify(
        JSON.stringify(
          checklist.sections.map((section) =>
            checklist[roomType][section].map((item) =>
              item ? [item, checklist.itemTitles[item], checklist.itemDescriptions[item]] : null,
            ),
          ),
        ),
      ),
    )
    .replace(
      '{{ISSUES}}',
      JSON.stringify(
        JSON.stringify(
          checklist[roomType].issues.map((issue) => [issue, checklist.itemDescriptions[issue]]),
        ),
      ),
    )
    .replace('{{CHECKED_ITEMS}}', JSON.stringify(JSON.stringify(checkedItems)))
    .replace('{{HAS_SIGNATURE}}', hasSignature.toString());
};
