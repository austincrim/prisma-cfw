import esbuild from 'esbuild'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import alias from 'esbuild-plugin-alias'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

async function build() {
  let isProd = process.env.NODE_ENV === 'production'

  await esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/worker.js',
    format: 'esm',
    watch: !isProd,
    minify: isProd,
    sourcemap: isProd,
    define: {
      process: JSON.stringify({
        env: {
          NODE_ENV: isProd ? 'production' : 'development',
          DATABASE_URL: process.env.DATABASE_URL
        }
      })
    },
    plugins: [
      NodeModulesPolyfillPlugin(),
      alias({
        '@prisma/client': require.resolve('@prisma/client')
      })
    ]
  })
  process.exit(0)
}

build().catch(console.error)
