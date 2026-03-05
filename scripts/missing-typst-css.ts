async function main() {
  const css = await fetch(
    'https://raw.githubusercontent.com/Myriad-Dreamin/typst.ts/refs/tags/v0.7.0-rc2/packages/typst.react/src/lib/typst.css',
  );
  const cssText = await css.text();
  const cssFile = Bun.file('node_modules/@myriaddreamin/typst.react/dist/typst.css');
  await cssFile.write(cssText);
}
main();
