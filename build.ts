Bun.build({
  entrypoints: ['src/index.ts', 'src/common.ts', 'src/decorators.ts', 'src/useDb.ts', 'src/SchemaTypeGenerator.ts', 'src/mappedTypes.ts'],
  outdir: 'dist',
  target: 'bun',
  format: 'esm',
  splitting: true,
  external: ['reflect-metadata', 'typedi', 'class-validator-jsonschema', 'class-validator', 'class-transformer', 'mongodb'],
  minify: true
});
