import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   resolve: {
        alias: {
            // Platform-level aliases
            '@app':        '/src/app',
            '@modules':    '/src/modules',
            '@shared':     '/src/shared',
            '@store':      '/src/store',

            // Legacy aliases — redirected to new shared paths
            // These keep existing imports working during + after the refactor
            '@components': '/src/shared/components',
            '@hooks':      '/src/shared/hooks',
            '@utils':      '/src/shared',
            // NOTE: @pages is intentionally removed — all page imports
            // are updated to use @modules/real-estate/... directly
        },
    },
})
