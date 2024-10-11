import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: { 
        exportType: "default", 
        ref: true, 
        titleProp: true },
      include: "**/*.svg",
      svgo: true, // Habilita optimización SVG
      svgoConfig: {
        plugins: [
          {
            removeViewBox: false, // No eliminar el viewBox
          },
        ],
      },
    }),
    tailwindcss(),
    compression({
      // Opciones de configuración del compresor para build
      verbose: true,
      algorithm: 'gzip',
      threshold: 10240,
      deleteOriginalAssets: false,
    }),

    visualizer({
      open: true, // Abre automáticamente el reporte en tu navegador
      gzipSize: true, // Muestra el tamaño después de la compresión gzip
      brotliSize: true, // Muestra el tamaño después de la compresión Brotli
      filename: 'bundle-analysis.html', // Nombre del archivo de reporte
    }),
  ],
})
