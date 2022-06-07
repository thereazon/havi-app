import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      loaderOptions: {
        sass: {
          sassOptions: {
            prependData: ``,
          },
        },
      },
    },
    proxy: {
      '/api': 'http://localhost:3002',
    },
  }
})
