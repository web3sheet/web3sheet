import * as path from 'node:path'
import { type Format, defineConfig } from 'tsup'

export default defineConfig([
  {
    clean: true,
    sourcemap: true,
    tsconfig: path.resolve(__dirname, './tsconfig.build.json'),
    entry: ['index.ts', './!(node_modules|dist)/**/*.(ts|tsx)'],
    // bundle false seems to not work for .css files
    // bundle: false,
    format: ['esm' as Format, 'cjs' as Format],
    outDir: 'dist',
    dts: true,
    esbuildOptions(options, _context) {
      options.outbase = './'
      options.jsx = 'automatic'
    },
  },
])
