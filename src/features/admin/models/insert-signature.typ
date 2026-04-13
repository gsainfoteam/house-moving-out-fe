#import "@preview/based:0.1.0": base64
#set page(margin: 0pt)

#let pdfData = json(bytes(sys.inputs.pdfData))
#let pages = json(bytes(sys.inputs.pdfPages))
#let rawImage = base64.decode(pdfData)

#for page in range(1, pages + 1) {
  place(image(rawImage, format: "pdf", page: page))
  place(center, dx: 10.4em, dy: 10.6em, box(height: 20pt, width: 66pt, image(
    "/assets/signature.png",
    height: 20pt,
  )))
  if page < pages {
    pagebreak()
  }
}
