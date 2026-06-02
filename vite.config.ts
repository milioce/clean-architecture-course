import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node', // Cambia a 'jsdom' si vas a testear lógica que use el DOM del navegador
    include: ['src/**/*.spec.ts'], // Especifica dónde están tus archivos de test
    globals: true,       // Te permite usar 'describe', 'test', 'expect' sin importarlos en cada archivo
  },
})
