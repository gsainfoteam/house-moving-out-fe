#set page(margin: (left: 30mm, right: 30mm, top: 20mm + 15mm, bottom: 15mm + 15mm))
#set text(size: 11pt, font: "HCR Batang")

#let gray = rgb("#5D5D5D")
#let lightGray = rgb("#DCDCDC")
#let lightLightGray = rgb("#F7F7F7")
#let outerStroke = 0.4mm + black
#let innerStroke = 0.12mm + gray
#let hline = table.hline(stroke: outerStroke)
#let items = json(bytes(sys.inputs.items))
#let issues = json(bytes(sys.inputs.issues))
#let checkedItems = json(bytes(sys.inputs.checkedItems))
#let inspectionCount = json(bytes(sys.inputs.inspectionCount))
#let hasSignature = json(bytes(sys.inputs.hasSignature))
#let roomType = json(bytes(sys.inputs.roomType))
#let generation = json(bytes(sys.inputs.generation))
#let title = (
  a2: "하우스 퇴사검사 체크리스트 A동(2인실)",
  a3: "하우스 퇴사검사 체크리스트 A동(3인실)",
  b: "하우스 퇴사검사 체크리스트 B동",
  solo: "하우스 1인 잔류 시 퇴사검사 체크리스트",
).at(roomType)
#let date = json(bytes(sys.inputs.date))
#let time = json(bytes(sys.inputs.time))
#let roomNumber = json(bytes(sys.inputs.roomNumber))

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
    table.cell(inset: (x: 24pt), stroke: (right: innerStroke), image("/public/house-full-logo.png")),
    table.cell(inset: 2pt)[*GIST대학 총학생회\ 제 #generation\대 하우스연합회*],
    table.hline(stroke: 0.7mm + gray),
    table.cell(
      inset: 0pt,
      table(
        stroke: (top: innerStroke, left: innerStroke, bottom: innerStroke, right: 0pt),
        columns: (1fr, 1fr),
        rows: (auto, auto),
        [*총괄*], [*검사자*],
        table.hline(stroke: 0.7mm + gray),
        table.cell(fill: white)[\ ],
        table.cell(fill: white, if (hasSignature) {
          place(center + horizon, image("/assets/inspector-signature.png", height: 20pt))
        } else { none }),
      ),
    ),
  ),
  table(
    columns: (1fr, 1fr, 1fr, 1fr),
    align: center,
    stroke: (x, y) => if (x == 0) { (left: 0pt, bottom: innerStroke) } else if (x == 3) {
      (right: 0pt, bottom: innerStroke)
    } else { innerStroke },
    table.hline(stroke: 0.7mm + gray),
    [검사일], [검사 시간], [검사 호실], [피검사자 서명],
    date,
    time,
    roomNumber,
    if (hasSignature) { place(center + horizon, image("/assets/target-signature.png", height: 20pt)) } else { none },
    table.hline(stroke: 0.7mm + gray),
  ),
)

#v(8pt)

#text(size: 15pt, weight: "bold", align(center, title))

#v(8pt)

#text(size: 10pt, table(
  stroke: (x, y) => (
    left: if (x == 0) { outerStroke } else { innerStroke },
    right: outerStroke,
    top: if (y == 0) { outerStroke } else { innerStroke },
    bottom: outerStroke,
  ),
  columns: (14mm, 20mm, 1fr, 13mm),
  align: center + horizon,
  inset: 4pt,
  table.cell(fill: lightGray)[연번],
  table.cell(fill: lightGray)[항목],
  table.cell(fill: lightGray)[상태],
  table.cell(fill: lightGray)[확인],
  hline,
  ..(
    items
      .enumerate(start: 1)
      .map(section => (
        section
          .at(1)
          .enumerate(start: 1)
          .map(item => {
            if (item.at(1) == none) {
              return ()
            } else {
              let key = item.at(1).at(0)
              let title = item.at(1).at(1)
              let description = item.at(1).at(2)
              return (
                [#section.at(0)-#item.at(0)],
                text(size: if (title.len() > 15) { 8pt } else { 10pt }, title),
                text(size: if (description.len() > 90) { 8pt } else { 10pt }, description),
                if (checkedItems.contains(key)) { sym.checkmark } else { none },
              )
            }
          }),
        hline,
      ))
      .flatten()
  ),
  hline,
  table.cell(colspan: 4, inset: 0pt, text(size: 7pt, table(
    stroke: (x, y) => (
      left: if (x == 0) { outerStroke } else { innerStroke },
      right: outerStroke,
      top: if (y == 0) { outerStroke } else { innerStroke },
      bottom: outerStroke,
    ),
    columns: (..(1fr,) * (int((issues.len() + 3) / 2)),),
    inset: 4pt,
    table.cell(rowspan: 2)[이상여부/\ 존재유무 확인],
    ..(
      issues.map(issue => [
        #if (not checkedItems.contains(issue.at(0))) {
          place(
            center + horizon,
            text(
              size: 20pt,
              fill: black.transparentize(60%),
              sym.crossmark,
            ),
          )
        }
        #issue.at(1)
      ])
    ),
  ))),
))

#v(8pt)

#align(right, table(
  columns: 4,
  align: center + horizon,
  inset: 6pt,
  fill: lightLightGray,
  stroke: (x, y) => (
    left: if (x == 0) { 0.4mm + gray } else { innerStroke },
    right: if (x == 3) { 0.4mm + gray } else { innerStroke },
    top: if (y == 0) { 0.4mm + gray } else { innerStroke },
    bottom: innerStroke,
  ),
  [*검사 횟수(체크)*],
  ..range(3).map(index => square(
    stroke: 0pt,
    height: 10pt,
    if (index < inspectionCount) { sym.checkmark } else {},
  )),
))
