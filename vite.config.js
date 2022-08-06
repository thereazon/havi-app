/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  return {
    base: './',
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
    server: {
      port: 3000,
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: 'http://34.80.81.194/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    test: {
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
    },
  }
})
