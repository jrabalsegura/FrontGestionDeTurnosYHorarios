import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment';

delete process.env['CommonProgramFiles(x86)'];
delete process.env['ProgramFiles(x86)'];
delete process.env['IntelliJ IDEA Community Edition'];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin(
    'all'
  )],
})
