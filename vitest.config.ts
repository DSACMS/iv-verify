
import { defineConfig, configDefaults, coverageConfigDefaults } from 'vitest/config'
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
        },
        // excluding a directory where there is no page to test
        exclude: [
            ...configDefaults.exclude,
            'app/[locale]/job/[jobId]/payment/*',
        ]
    }
})