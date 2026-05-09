import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueMeteoWidget',
      fileName: (format) => `vue-meteo-widget.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', '@iconify/vue'],
      output: {
        globals: {
          vue: 'Vue',
          '@iconify/vue': 'Iconify',
        },
      },
    },
  },
})
