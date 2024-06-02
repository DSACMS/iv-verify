
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
/*
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
    },
    resolve: {
        alias: [
            {
                find: "react-redux/es/exports",
                replacement: resolve(__dirname, "./node_modules/react-redux/lib/exports")
            }
        ]
    }
})*/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom'
    }
})