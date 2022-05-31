import { fileURLToPath, URL } from "url";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

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
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      loaderOptions: {
        sass: {
          sassOptions: {
            prependData: ``,
          }
        }
      }
    }
  };
});
