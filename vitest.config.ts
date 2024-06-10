
import { defineConfig, coverageConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        coverage: {
            exclude: [ 'scripts/**', ...coverageConfigDefaults.exclude ],
            reporter: [
                ['text'], 
                ['html'],
                ['json', { 'file': 'coverage.json' }]
            ]
        }
    }
})