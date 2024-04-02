async function getExternalsFromPackageJson(): Promise<string[]> {
  const file = Bun.file('./package.json');
  const packageJson = await file.json();

  const sections = ['devDependencies'],
    externals: Set<string> = new Set();

  for (const section of sections) if (packageJson[section]) Object.keys(packageJson[section]).forEach((_) => externals.add(_));
  return Array.from(externals);
}

await Bun.build({
  entrypoints: ['src/index.ts', 'src/common.ts', 'src/decorators.ts', 'src/useDb.ts', 'src/SchemaTypeGenerator.ts', 'src/mappedTypes.ts'],
  outdir: './',
  target: 'bun',
  format: 'esm',
  external: await getExternalsFromPackageJson(),
  minify: true
});
