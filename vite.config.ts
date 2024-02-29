/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/<REPO>/',
  plugins: [react()],
  test: {
	testDir: 'tests',
	files: ['**/*.test.ts', '**/*.test.tsx'],
	globals: true,
	environment: 'happy-dom'
  }
})
