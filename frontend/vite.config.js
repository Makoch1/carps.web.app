import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap')
        }
    },
    plugins: [
        react(),
        TanStackRouterVite(),
    ],
})
